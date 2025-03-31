var Clubs = require('../models/clubs.model')


const list = async (req, res)=>{ 
    //console.log("list:");    
    result = await Clubs.findAll()       
    res.json({status:200,items:result});    
      
} 


module.exports = { list }