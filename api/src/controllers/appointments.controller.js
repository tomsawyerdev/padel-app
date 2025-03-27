
//var Players = require('../models/players.model')
const { Op } = require('sequelize');
const db = require('../db/sequelize');
const { QueryTypes } = require("sequelize");

//console.log("typeof:",typeof(players),Object.keys(players));


//https://sequelize.org/docs/v6/core-concepts/raw-queries/

//http://localhost:3000/appointments/list

const list = async (req, res)=>{ 
    let userid = req.auth && req.auth.userid ? req.auth.userid : 1;
    console.log(" list by user:",userid);

    const sql=`select json_build_object(
        'id', ap.id,
        'day', ap.day,
        'schedule_id', ap.schedule_id,
        'schedule_slot',(SELECT concat(to_char(slot_start,'HH24:MM:SS'),'-',to_char(slot_end,'HH24:MM:SS')) FROM schedules where ap.schedule_id = schedules.id ),
        'court_id', ap.court_id,        
        'court_name', (SELECT name FROM courts where ap.court_id = courts.id ),
        'club_id', ap.club_id,
        'club_name', (SELECT name FROM clubs where ap.club_id = clubs.id )
        )
        as appointment FROM appointments ap where user_id=$userid ORDER BY ap.day;`

    result =  await db.query(sql, {
            bind: { userid },
            type: QueryTypes.SELECT,
          });

    res.json({status:200,items:result});

}

//localhost:3000/appointments/search?club=1&day=20250311
const search = async (req, res)=>{ 
    //console.log(" search appointments:");
        
    const { club, day } = req.query;
    
     
    const day_value = day?day:'19990101';
    const club_value = club?club:1;
    var bind={day_value,club_value};

    const sql=`
    SELECT  json_build_object(
        'id', schedules.id,
        'slot_start',slot_start,
        'slot_end',slot_end,
        'free_courts', ARRAY(SELECT row_to_json(r)
                      FROM (SELECT courts.id,courts.name
                                  FROM  courts
                                  WHERE courts.club_id = $club_value AND courts.club_id NOT IN (SELECT club_id FROM appointments app WHERE app.day=TO_DATE($day_value,'YYYYMMDD') AND app.schedule_id = schedules.id)) r )) 
        as slot FROM schedules
        WHERE schedules.club_id=$club_value; `

        result =  await db.query(sql, {
            bind,
            type: QueryTypes.SELECT,
          });

    
        res.json({status:200,items:result});
                   
} 
 
 


// Export of all methods as object 
module.exports = { 
    list,
    search
}