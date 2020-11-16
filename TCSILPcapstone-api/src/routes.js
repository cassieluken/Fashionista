const express = require('express');
const cors = require('cors'); //ip address communication
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');

module.exports = (app)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use(cors());
    
    app.use('/api/users', userRoutes);
    app.use('/api/admin', adminRoutes);
    //run http://localhost:3000/api/users/
    //run http://localhost:3000/api/admin/

}
//first file hit 

