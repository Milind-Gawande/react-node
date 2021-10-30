var express = require('express');
var cors = require('cors');
var app = express();
let num = 0;
var sql = require("mssql");
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
//var path = require('path');

app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

 var config ={
   user:'sa',
   password:'modular',
   server:'VAIO\\SQLEXPRESS',
   database:'myDB',
   port:1433,
   options:{
		encrypt:true
   }
};

var executeQuery = function (req, res,query) {
	// config for your database  
	sql.close();
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query(query, function (err, rec) {
            
            if (err) console.log(err)
			else{
            // send records as a response
				//console.log(rec);
				return res.json({data:rec});
				//res.send(recordset);
            }
        });
    });
};


app.get('/',function(req,res){
	
	var select="select * from topics";
	executeQuery(req,res,select);
});

app.get('/api/:id',function(req,res){
	//console.log(req.query.name);
	//console.log(req.query.des);
	//console.log(req.params.id);
	//console.log(req.query);
	//console.log(req.body);
	//console.log(req.params.id);
	var select=`select * from topics where id='${req.params.id}'`;
	executeQuery(req,res,select);
});

app.delete('/topic/api/:id',function(req,res){
	var select=`delete from topics where id='${req.params.id}'`;
	executeQuery(req,res,select);
});

app.post('/topic/add',function(req,res){
	//console.log(res.statusCode);
	var json=req.body;
	console.log(json.name+' '+json.description);
	var select=`insert into topics values('${json.id}','${json.name}','${json.description}')`;
	executeQuery(req,res,select);
});

app.put('/topic/update/:id',function(req,res){
	//console.log(res.statusCode);
	var json=req.body;
	console.log(json.name+' '+json.description);
	var select=`update topics set name='${json.name}',description='${json.description}' where id='${req.params.id}'`;
	executeQuery(req,res,select);
});


var server = app.listen(5000, function () {
    console.log('Server is running..');
});
