const express = require('express');
require('./db/dbconnect');
const app = express();

require('./routes')(app); //const routes = require('./routes'); routes(app)

app.listen(3000,()=>{
    console.log('listening...');
})
//to run npm run dev
