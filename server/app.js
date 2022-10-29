
const mongoose = require('mongoose');
const { credentials, clusterURL } = require('./credentials');
const dbURI = `mongodb+srv://${credentials.username}:${credentials.password}@${clusterURL}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("DB Connected"); app.listen(3000); console.log("Listening on port 3000")})
    .catch(err => console.log(err));

const express = require('express');
const router = express.Router();
const authRoutes = require('./routes/authRoutes');

const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.json())

app.get('/', (req, res) => {
    res.send({express: 'Hello From Express'});
});

app.post('/', function(req, res){
  // console.log(req.body);      // your JSON
  // console.log(req.body.coords);      // your JSON

  // response.send(req.body);    // echo the result back
});
app.use(authRoutes);
