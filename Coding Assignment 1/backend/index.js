const express = require('express');
const app = express()
const port = 3000

app.set('view-engine','ejs');

app.get('/',(req, res)=>{
    // res.sendFile("index.html", {
    //     root: './webFiles/'
    // })
    res.render('webFiles/index')
});

app.post('/heartbeat', (req,res)=>{
   return res.render('index',{msg: "msg"})
})

app.listen(port, ()=>console.log(`listening on ${port}`));