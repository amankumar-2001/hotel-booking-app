const express = require("express");
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');

router.post("/bookroom", async (req, res) => {
    const { room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays
    } = req.body


    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays
        })

        const booking = await newbooking.save()

        res.send('Payment Successful , your Room is Booked')
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/getbookingsbyuserid", async (req,res)=>{
    
    const userid = req.body.userid;

    try {
        const bookings = await Booking.find({userid : userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({error});
    }
});



router.post("/cancelbooking", async (req, res) => {
    const { bookingid, roomid } = req.body;

    try {
        const bookingItem = await Booking.findOne({ _id: bookingid });
        bookingItem.status = "cancelled";
        await bookingItem.save();

        const room = await Room.findOne({ _id: roomid });
        const bookings = room.currentbookings;

        const temp = bookings.filter(
            (booking) => booking.bookingid.toString() !== bookingid
        );
        room.currentbookings = temp;

        await room.save();

        res.send("Your booking cancelled succesfully");
    } catch (error) {
        return res.status(400).json({ error });
    }
});


router.get("/getallbookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router; 