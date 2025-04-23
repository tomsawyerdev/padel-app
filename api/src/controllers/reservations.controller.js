
//var Players = require('../models/players.model')
//const { Op } = require('sequelize');
const db = require('../db/sequelize');
const { QueryTypes } = require("sequelize");

const reservationService = require('../services/reservation.service') 

//console.log("typeof:",typeof(players),Object.keys(players));


//https://sequelize.org/docs/v6/core-concepts/raw-queries/

//http://localhost:3000/reservations/list
/*

sin asignar, en busqueda, asignado
*/

const list = async (req, res)=>{ 
    
   
    let userid = req.auth && req.auth.userid ? req.auth.userid : 0;
    console.log(" list by user:",userid);

    const sql=`SELECT row_to_json(r) reservation FROM (
        SELECT id,day,        
                (SELECT concat(to_char(slot_start,'HH24:MI:SS'),'-',to_char(slot_end,'HH24:MI:SS')) FROM schedules where  res.schedule_id = schedules.id ) schedule_slot,              
                (SELECT name FROM clubs where  res.club_id = clubs.id ) club_name, 
                (SELECT name FROM courts where  res.court_id = courts.id ) court_name,                
                (SELECT concat(firstname,' ',lastname) FROM users where  res.opponent_id = users.id ) opponent_name,
                CASE WHEN res.opponent_id is null THEN 'No asignado'
                WHEN res.opponent_id=-1 THEN 'En busqueda'                
                ELSE 'Asignado'
                END
                AS opponent_state,
                res.opponent_id                 
                 FROM reservations res where user_id=$userid ORDER BY  day,schedule_slot,club_name,court_name) r ;`

    result =  await db.query(sql, {
            bind: { userid },
            type: QueryTypes.SELECT,
          });

    res.json({status:200,items:result});

}

//localhost:3000/reservations/search?club=1&day=2025-03-11
const search = async (req, res)=>{ 
    //console.log(" search reservations:");
        
    const { club, day } = req.query;
    if (!club || !day || isNaN(new Date(day))){
        //400 (Bad Request)
        //422 (Unprocessable Entity) 
        console.log("reservations/search:  missing parameters");
        res.status(422).json({status:422,items:[]});
        return
    }

     
    const day_value = day?day:'1999-01-01';
    const club_value = club?club:1;
    var bind={day_value,club_value};

    console.log("reservations search:",day_value,club_value)

    const sql=`
    SELECT  json_build_object(
        'slot_id', schedules.id,
        'slot_start',slot_start,
        'slot_end',slot_end,
        'day',  $day_value::varchar,
        'free_courts', ARRAY(SELECT row_to_json(r)
                        FROM (SELECT courts.id court_id,courts.name court_name,courts.club_id                     
                                  FROM  courts
                                  WHERE courts.club_id = $club_value AND courts.id NOT IN (SELECT res.court_id FROM reservations res WHERE res.club_id =$club_value AND res.day=TO_DATE($day_value,'YYYY-MM-DD') AND res.schedule_id = schedules.id  )) r )) 
        as slot FROM schedules
        WHERE schedules.club_id=$club_value; `

        result =  await db.query(sql, {
            bind,
            type: QueryTypes.SELECT,
          });

    
        res.json({status:200,items:result});
                   
} 
 
const create = async (req, res)=>{ 
    
      let user_id = req.auth.userid

      try {
       
        const { schedule_id,day,court_id,club_id } = req.body;
        const reservation = { schedule_id, day,user_id,court_id,club_id};
        console.log(" create reservations:",reservation);

        const newRes = await reservationService.createReservation(reservation);
        return res
          .status(200)
          .json({status:200, message: "create reservation successful", data: newRes });
      } catch (error) {
        res.status(400).json({ error });
      }


}
// Export of all methods as object 
module.exports = { 
    list,
    search,
    create
}


