const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', authRoutes);

mongoose.connect('mongodb://localhost:27017/db_auth');

mongoose.connection.once('open',function(){
    console.log('Database connected Successfully');
}).on('error',function(err){
    console.log('Error', err);
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

