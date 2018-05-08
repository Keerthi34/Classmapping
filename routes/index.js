var express = require('express');
var router = express.Router();
var winston = require('winston');
var Class= require('../models/class');


winston.add(
  winston.transports.File,{
    filename: 'teacher.log',
    level: 'info',
    json: 'true',
    eol: 'rn',
    timestamp: true
  }
)



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/*Get all classes details*/
router.get('/fetch', function(req, res, next) {
  winston.log('info',"Info: Get all class records")
  console.log("info");
  Class.find({},function(err,data){
      if(err)
      res.status(500).send(err);
      else {
        res.status(200).json(data);
      }
  })
});


router.get('/class/:Teacher_Id',function(req,res,next){
  winston.log('info',"Info: Get teachers from particular school")
  Class.find({Teacher_Id: req.params.Teacher_Id},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})


/*Get particular class details*/
router.get('/getclass/:Class',function(req,res,next){
  winston.log('info',"Info: Get class details")
  Class.find({Class: req.params.Class},function(err,data){
    if(err)
    res.status(500).send(err);
    else {
      res.status(200).json(data);
    }
  })
})



/*Create class*/
router.post('/add',function(req,res,next){
  winston.log('info',"Info level")
  var t=new Class({
    School_Id:req.body.School_Id,
    Teacher_Id:req.body.Teacher_Id,
    Class: req.body.Class,
    Subject: req.body.Subject,
    Timings: req.body.Timings,
    TeacherType: req.body.TeacherType
  })
  t.save(function(err,suc){
    if(err)
    res.status(500).json(err)
    else {

    res.status(201).json({"Message":"Created", type:"internal"})
}

})
    //  res.send(suc)
})


/*Update class*/
router.put('/update/:_id', function(req,res,next){
  winston.log('info',"Info level")
var query={_id: req.params._id};
      Class.update(query, req.body, function(err,data){
                   if(err) res.status(404).json(err);
                   else {
                     res.status(202).json(data)
                   }
  })
})



/*Delete class*/
router.get('/delete/:_id',function(req,res){
  winston.log('info',"Info: Delete particular class")
  Class.remove({_id: req.params._id},function(err,data){
    console.log('deleted');
    if(err)
    res.status(404).send(err);
    else
    res.status(201).json({"Message":"deleted successfully"});
  })
})



module.exports = router;
