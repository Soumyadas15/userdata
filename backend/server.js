const express = require('express');
const port = 5000 || process.env.PORT
const mongoose = require('./database/db');
const bodyparser = require('body-parser');
const UserModel = require('./schemas/userSchema');
const cors = require('cors');

const app = express()
app.use(bodyparser.json({limit: '100mb'}));
app.use(cors());

app.get('/', (req, res) => {
    res.send("API running")
})

app.post('/users', async (req, res) => {
    try {
      const { users } = req.body; 
      const newUsers = await UserModel.insertMany(users);
      res.json(newUsers); 
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
});

app.get('/users', async (req, res) => {
    try {
      const users = await UserModel.find(); 
      res.json(users); 
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });


app.listen(port, () => {
    console.log(`Server listening on ${port}`)
}) 