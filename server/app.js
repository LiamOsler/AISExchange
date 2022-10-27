const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const { credentials, clusterURL } = require('./credentials');
const dbURI = `mongodb+srv://${credentials.username}:${credentials.password}@${clusterURL}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("DB Connected"); app.listen(3000); console.log("Listening on port 3000")})
    .catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log("server is running on port", server.address().port);
});

app.get('/', (req, res) => {
    res.send({express: 'Hello From Express'});
});

app.post('/', function(request, response){
  console.log(request.body);      // your JSON
  console.log(request.body.coords);      // your JSON

  response.send(request.body);    // echo the result back
});