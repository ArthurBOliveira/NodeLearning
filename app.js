//const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(bodyParser.json())

var db

MongoClient.connect('mongodb://user:123123@ds023540.mlab.com:23540/nodestart', (err, database) => {
    if (err) return console.log('Deu Ruim' + err)

    db = database

    app.listen(3000, () => {
        console.log('Let the Magic begins!!!')
    })
})


app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', { quotes: result })
    })
})

app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Saved')
        res.redirect('/')
    })
})

app.put('/quotes', (req, res) => {
    var id = req.body.id.trim();

    db.collection('quotes')
        .updateOne({ _id: ObjectID(id) }, {
            $set: {
                quote: req.body.quote
            }
        }, {
            sort: { _id: -1 },
            upsert: false
        }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        })
})

app.delete('/quotes', (req, res) => {
    var id = req.body.id.trim();

    db.collection('quotes').remove({ _id: ObjectID(id) },
        (err, result) => {
            if (err) return res.send(500, err)
            res.send({ message: 'Deleted' })
        })
})