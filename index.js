require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { connectToMongoDB } = require('./services/mongodb');
const { Routes } = require('./routes/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(Routes);

connectToMongoDB().catch(console.error);

app.listen(3000, () => console.log('listening to port', 3000))