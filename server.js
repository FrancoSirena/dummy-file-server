var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 2997);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
})

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});

var upload = multer({ //multer settings
  storage: storage
  }).single('filedata');


app.post('/api/upload/nodes/:id/children', function (req, res, next) {
    upload(req,res,function(err){
      console.log(req.file)
      if(err){
        res.json({error_code:1,err_desc:err});
        return;
      }
      res.json({error_code:0,err_desc:null});
    });
    }
  );


server.listen(app.get('port'), function() {
    console.log('Listening port 2997')
});