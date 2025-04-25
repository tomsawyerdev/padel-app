
//var Players = require('../models/players.model')
//const { Op } = require('sequelize');
const db = require('../db/sequelize');
const { QueryTypes } = require("sequelize");

var {Reservations} = require('../models')
var {Opponents} = require('../models')
var {Users} = require('../models')



// Lista los juegos donde soy oponente, user_opponent_id=$userid
const list = async (req, res)=>{ 
    
   
    let userid = req.auth && req.auth.userid ? req.auth.userid : 0;

    console.log(" list by user:",userid);


    const sql=`SELECT row_to_json(r) game FROM (
        SELECT   day,
                (SELECT concat(firstname,' ',lastname) FROM users where  users.id = res.user_id ) user_name, 
                (SELECT concat(to_char(slot_start,'HH24:MI:SS'),'-',to_char(slot_end,'HH24:MI:SS')) FROM schedules where  schedules.id = res.schedule_id ) schedule_slot,              
                (SELECT name FROM clubs where  clubs.id = res.club_id   ) club_name, 
                (SELECT name FROM courts where courts.id = res.court_id  ) court_name,
                 status
                 FROM opponents opp, reservations res WHERE res.id=opp.reservation_id AND opp.user_id=$userid ORDER BY  day,schedule_slot,club_name,court_name) r ;`                 

    result =  await db.query(sql, {
            bind: { userid },
            type: QueryTypes.SELECT,
          });

    //console.log("items:",result);
    res.json({status:200,items:result});

}


//localhost:3000/games/search
// POST
// curl -X POST http://localhost:3000/games/search -H 'Content-Type: application/json'  -d '{"club":1,"days":[4,5]}'
const search = async (req, res)=>{ 
    //console.log(" search games:");

    let user_id = req.auth && req.auth.userid ? req.auth.userid : 0;

        
    const { club, days } = req.body;
    
     
    const days_value = days?days:[1,2,3,4,5,6,7]; //Day of week
    const club_value = club?club:1;
    var replacements={club_value, days_value,user_id};

    console.log("game search:",days_value,club_value)

    //https://sequelize.org/docs/v6/core-concepts/raw-queries/
    const sql=`SELECT row_to_json(r) game FROM (
        SELECT  id,day,
                (SELECT concat(firstname,' ',lastname) FROM users where  res.user_id = users.id ) user_name, 
                (SELECT concat(to_char(slot_start,'HH24:MI:SS'),'-',to_char(slot_end,'HH24:MI:SS')) FROM schedules where  res.schedule_id = schedules.id ) schedule_slot,              
                (SELECT name FROM clubs where  res.club_id = clubs.id ) club_name, 
                (SELECT name FROM courts where  res.court_id = courts.id ) court_name                               
                 FROM reservations res 
                 WHERE res.club_id=:club_value 
                   AND EXTRACT(DOW FROM day) IN(:days_value) 
                   AND res.opponent_id =-1 
                   AND user_id != :user_id                    
                  ORDER BY  day,schedule_slot,club_name,court_name) r ;`

                  /* AND user_id != :user_id   */
                  /*AND day >= CURRENT_DATE  AND EXTRACT(DOW FROM day) IN(:days_value)*/

        result =  await db.query(sql, {
          replacements,
            type: QueryTypes.SELECT,
          });
        //bind  

        console.log("game search items:",result.length);
        
        res.json({status:200,items:result});
                   
} 
 // Para cargar un oponente en un juego
 // curl -X POST http://localhost:3000/games/create -H 'Content-Type: application/json'  -d '{"reservation_id":1}'

//sin usp
const new_opponent = async (req, res)=>{ 


     // Habria que verificar que no exista, para evitar duplicados


      const reservation_id = req.body.reservation_id
      let user_id = req.auth.userid     
      var user = await Users.findByPk( user_id )
      
      let user_name= user.firstname+' '+user.lastname;

      console.log("new_opponent:",{reservation_id,user_id,user_name});
    try {
      await Opponents.create({reservation_id,user_id,user_name,status:"Pendiente"});  
      res.json({status:200,  message:"Object was created"});    

    } catch (error) {
      res.status(400).json({ error });
    }

      
      

}

// Setea el  opponent_id en una reserva 
// y setea "Confirmado" en la tabla opponentes
// 
const update_opponent= async (req, res)=>{ 

  const reservation_id = req.body.reservation_id  
  var opponent_id = req.body.opponent_id 
  console.log("update_opponent to:",opponent_id);

   // Actualizo el status en la tabla oponente 
   if (opponent_id>0){
    // Setear el status de todos en "Pendiente"
    await Opponents.update(
      { status: 'Pendiente' },
      { where: { reservation_id }, },
    );

    // Setear el elegido en "Confirmado"
    var opponent = await Opponents.findOne({ where: { reservation_id, user_id: opponent_id } }); 
    //console.log("opponent:",opponent)
    opponent.status = "Confirmado"
    await opponent.save({ fields: ['status'] });
  

  }

  // Actualizo la reserva
  var reservation = await Reservations.findByPk( reservation_id )
   // console.log("update_opponent:",reservation);

  if (reservation==null){
      //console.log("result: null");
       res.status(404).json({status:404, message: 'No found' });       
  }
  else
  { 
    reservation.opponent_id = opponent_id 
    console.log("update_opponent: opponent_id:",opponent_id);
       ack = await reservation.save({ fields: ['opponent_id'] });
       res.json({status:200,player:ack,  message:"Object was updated"});            
  }

}
// Para setear en null o -1
// Si es null Debe permitir cancelar los confirmados pasarlos a -->pendiente
const update_reservation= async (req, res)=>{ 

  const reservation_id = req.body.reservation_id  
  var opponent_id = req.body.opponent_id 
    
  // Actualizo la reserva
  var reservation = await Reservations.findByPk( reservation_id )
   // console.log("update_opponent:",reservation);

  if (reservation==null){
      //console.log("result: null");
       res.status(404).json({status:404, message: 'No found' });       
  }
  else
  { 
    reservation.opponent_id = opponent_id 
    console.log("update_opponent: opponent_id:",opponent_id);
       ack = await reservation.save({ fields: ['opponent_id'] });
       res.json({status:200,player:ack,  message:"Object was updated"});            
  }

}
// Export of all methods as object 
module.exports = { 
    list,
    search,
    new_opponent,
    update_opponent,    
    update_reservation
}


