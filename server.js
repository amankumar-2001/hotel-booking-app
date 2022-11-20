const express = require('express');

const app = express();

const dbConfig = require('./db');
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')
const bookingsRoute =require('./routes/bookingsRoute')
app.use(express.json())

app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute) 



if(process.env.NODE_ENV=='production'){
    const path = require('path')

    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname, 'client', 'build')))
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is started with nodemon')
});
