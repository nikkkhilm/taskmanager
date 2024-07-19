const express=require('express');
const conn = require('./connection/conn');
const app=express();
const cors=require('cors');
const auth=require('./routes/auth');//auth is an instance of the routes created 
const list=require('./routes/list');

c//onst path = require('path');//this is for running frontend on backend server only for deploying

app.use(express.json());//this is used as we are sending and recieving json data to parse it

app.use(cors());

app.use('/api/v1',auth);
app.use('/api/v2',list)


// app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
// });


// this is invoking the conn ->connecting to DB function then only invoking server
conn().then(()=>{
app.listen(1000,()=>console.log("server is running on port 1000"));
}).catch((error)=>{
    console.error("failed to start server because of database connection");
})
