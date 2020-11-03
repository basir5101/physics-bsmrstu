const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;


const uri = `mongodb+srv://physics5101:h6DigQWVJXpOJLOu@cluster0.jo990.mongodb.net/bsmrstu?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const noteCollection = client.db("bsmrstu").collection("classNote");
  const noticeCollection = client.db("bsmrstu").collection("classNotice");
  
  //post note into server
  app.post('/addNote', (req, res) =>{
      const note = req.body;
      noteCollection.insertOne(note)
      .then(result =>{
          res.send(result.insertedCount > 0)
      })
  })

  //get notes from server
  app.get('/notes', (req, res) =>{
        noteCollection.find({})
        .toArray((err, documents) =>{
            res.send(documents)
        })
  })

    //post notice into server
    app.post('/addNotice', (req, res) =>{
        const note = req.body;
        noticeCollection.insertOne(note)
        .then(result =>{
            res.send(result.insertedCount > 0)
        })
    })
  
    //get notice from server
    app.get('/notice', (req, res) =>{
        noticeCollection.find({})
          .toArray((err, documents) =>{
              res.send(documents)
          })
    })
  


  console.log('connected')
});

app.get('/', (req, res) =>{
    res.send('I am working')
})

app.listen(process.env.PORT || port)

