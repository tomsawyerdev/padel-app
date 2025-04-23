
//var Players = require('../models/players.model')
//const { Op } = require('sequelize');
const db = require('../db/sequelize');
const { QueryTypes } = require("sequelize");

var {Reservations} = require('../models')



// Lista los juegos donde soy oponente, user_opponent_id=$userid
const list = async (req, res)=>{ 
    
   
    let userid = req.auth && req.auth.userid ? req.auth.userid : 0;

    console.log(" list by user:",userid);

    const sql=`SELECT row_to_json(r) game FROM (
        SELECT  id,day,
                (SELECT concat(firstname,' ',lastname) FROM users where  res.user_id = users.id ) user_name, 
                (SELECT concat(to_char(slot_start,'HH24:MI:SS'),'-',to_char(slot_end,'HH24:MI:SS')) FROM schedules where  res.schedule_id = schedules.id ) schedule_slot,              
                (SELECT name FROM clubs where  res.club_id = clubs.id ) club_name, 
                (SELECT name FROM courts where  res.court_id = courts.id ) court_name                               
                 FROM reservations res WHERE opponent_id=$userid ORDER BY  day,schedule_slot,club_name,court_name) r ;`

                 

    result =  await db.query(sql, {
            bind: { userid },
            type: QueryTypes.SELECT,
          });

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
 // Para crear una oferta
 // cambia el oponente de null a -1
 /// https://sequelize.org/docs/v6/core-concepts/model-instances/
 //
 // curl -X POST http://localhost:3000/games/create -H 'Content-Type: application/json'  -d '{"reservation_id":1}'

 // Sin uso
const create_search = async (req, res)=>{ 


      const id = req.body.reservation_id
      console.log("create_search:",id);
      var reservation = await Reservations.findByPk( id )

      console.log("create_search:",reservation);
    
      if (reservation==null){
          //console.log("result: null");
           res.status(404).json({status:404, message: 'No found' });       
      }
      else
      { 
        reservation.opponent_id = -1 
           ack = await reservation.save({ fields: ['opponent_id'] });
           res.json({status:200,player:ack,  message:"Object was updated"});            
      }

}

// Setea el  opponent_id en una reserva
const update_opponent= async (req, res)=>{ 

  const id = req.body.reservation_id  
  var opponent_id = req.body.opponent_id 
  console.log("update_opponent:",opponent_id);
  //if (req.body.opponent_id !=null && req.body.opponent_id != -1){

  if (req.body.opponent_id==0){
  opponent_id = req.auth && req.auth.userid ? req.auth.userid : 0;
 }

 
  var reservation = await Reservations.findByPk( id )

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
    create_search,
    update_opponent
}


