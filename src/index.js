require("dotenv").config();

import socket from './socket';
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://caiogallo:forthehorde2401@cluster0-evtam.mongodb.net/allchatdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

//Start application
socket()