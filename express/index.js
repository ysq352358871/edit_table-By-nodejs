var express=require("express");
var path=require("path");
var ejs=require("ejs");
var mysql=require("mysql");

var bodyParser=require('body-parser');

var app=express();
app.listen(8888);

/*连接数据库*/
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'test'
});
connection.connect(function (err) {
    if(err){
        console.log("cuowu");
    }else {
        console.log("yes");
    }
})


app.use(express.static(path.join(__dirname,"static")))//设置静态文件

app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

app.set('views', path.join(__dirname,'./template'));
app.set('view engine',"ejs");


app.get("/",function (req,res) {
    res.sendFile(path.join(__dirname,"./1.html"));
})

/*获取数据*/
app.get("/list/(:id)?",function (req,res) { //正则（）？可有可无
    // var id=req.params.id;
    connection.query("select * from student",function (err,results,fildes) {
        if(err){
            console.log("不对");
            return false;
        }
        res.render("list",{result:results});
    })


})
app.get("/index/(:id)?",function (req,res) {
    res.render("index",{name:req.query.name});
})
app.post("/index/(:id)?",function (req,res) {
    res.render("index",{name:req.body.name});
})


/*添加数据*/
app.post("/addTable/(:id)?",function (req,res) {
    var sql="insert into student (num,name,sex,age) values('','','','')";
    connection.query(sql,function (err,results,fildes) {
        console.log(results.insertId);
        var newId={
            id:results.insertId
        }
        res.send(newId);//输出插入数据的id
    })

})


/*删除数据*/
app.post("/del/(:id)?",function (req,res) {
    var sql="delete from student where id="+req.body.id;
    connection.query(sql,function (error,results) {
        if(error){
            res.send("no");
        }else{
            res.send("yes");
        }
    })
    
})

/*更新数据*/
app.post("/update/(:id)?",function (req,res) {
    console.log(req.body);
    var sql=`update student set ${req.body.attr}='${req.body.value}' where id=`+req.body.id;
    connection.query(sql,function (error,results) {
        if(error){
            throw error;
        }else {
            console.log(2);
        }
    })
})



