const express = require("express");

const app = express();

const dbConfig = require("./db");
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

const port = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.send(`I'm ON`);
});

app.listen(port, () => {
  console.log("Server is started with nodemon on:", port);
});
