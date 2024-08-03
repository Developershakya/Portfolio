const express = require('express');
const  mysql = require('mysql2');
const bodyParser = require("body-parser");
const path = require('path');
const app =express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine','ejs');
app.set('views', path.join(__dirname ,'views'));
app.use(express.static(path.join(__dirname, 'public')));



const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'Contacts',
    password:'1234'

});
app.get('/', (req,res) => {
    res.render('./index.ejs');
});
app.post('/',(req,res) =>{
    const q ='INSERT INTO contact (name,email,description) VALUES (?,?,?)' ;
    const { name,email,description} = req.body;
  

 console.log(req.body);
    console.log(`Received data: name=${name}, email=${email}, description=${description}`);

    try {
        connection.query(q ,[name,email,description] , (err,result) => {
     if (err ,result) {
       res.render('thanks.ejs')
         console.log(req.body);          
        }
        
    });
} catch (err){
    console.log(err);
}

});


app.listen( 3000 ,() =>{
    console.log('working');
})