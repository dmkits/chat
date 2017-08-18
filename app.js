
var fs = require('fs'), tempfile = require('tempfile');
var  tempy = require('tempy');
tempy.root="./";
var express = require('express');
var app = express();
//var port=8081;
var path=require ('path');
var bodyParser = require('body-parser');
var XLSX=require('xlsx');


//app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/',express.static('public'));

var ConfigurationError, DBConnectError;


app.get('/', function (req, res) {

  //  var fname = tempfile('.xlsx');


    var wb=getWorkBook(JSON.parse(fs.readFileSync("/home/ianagez/IdeaProjects/chat/testInfoTable.json")));
    function getWorkBook(data){
        //var fname = tempfile('.xlsx');
       var fname= path.join(__dirname,'/out.xlsx');

        fs.openSync(fname, 'w');

       // fs.writeFileSync(fname,"");
       // var wb = XLSX.readFile('/home/ianagez/IdeaProjects/chat/out.xlsx');
       // var fname= tempy.file({extension: 'xlsx'});

        var wb = XLSX.readFile(fname);
        var ws;
        for (var i in data){
                  var jsonObj=data[i];
            ws = XLSX.utils.json_to_sheet(jsonObj.data, jsonObj.headers );
            wb.SheetNames.push(jsonObj.id);
            wb.Sheets[jsonObj.id] = ws;
        }
       // return
        XLSX.writeFile(wb, fname);
       // res.end();

        res.sendFile(fname);
        fs.unlinkSync(fname);
    }

});

//function process_RS(stream/*:ReadStream*/,cb/*:(wb:Workbook)=>void*/)/*:void*/{
//    var buffers = [];
//    stream.on('data', function(data) { buffers.push(data); });
//    stream.on('end', function() {
//        var buffer = Buffer.concat(buffers);
//        var workbook = XLSX.read(buffer, {type:"buffer"});
//
//        /* DO SOMETHING WITH workbook IN THE CALLBACK */
//
//
//        cb(workbook);
//    });
//}

app.listen(8086, function (err) {
});
