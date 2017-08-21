
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


//app.get('/', function (req, res) {
//
//    res.sendFile(path.join(__dirname, '/load_file.html'));
//
//});

app.get('/', function (req, res) {

    var data =JSON.parse(fs.readFileSync("/home/ianagez/IdeaProjects/chat/testInfoTable.json"));

    var fname = path.join(__dirname, '/out.xlsx');

    fs.open(fname, 'w', function (err) {
        if (err){
            console.log("err=", err);
            res.end(); /////
            return;
        }
        var wb = XLSX.readFile(fname);
        wb.SheetNames=[];
        var ws;
        for (var i in data) {
            var jsonObj = data[i];
            ws = XLSX.utils.json_to_sheet(jsonObj.data, jsonObj.headers);
            wb.SheetNames.push(jsonObj.id);
            wb.Sheets[jsonObj.id] = ws;
        }
        XLSX.writeFile(wb, fname);
        var options = {
            headers: {
                'Content-Disposition': 'attachment; filename =out.xlsx'
            }
        };
        res.sendFile(fname, options, function(err){
            if(err){
                console.log("err=",err);
                res.end(); /////
                return;
            }
            fs.unlinkSync(fname); console.log("fname unlinkSync=", fname);
        });
    });
});


app.listen(8086, function (err) {
});
