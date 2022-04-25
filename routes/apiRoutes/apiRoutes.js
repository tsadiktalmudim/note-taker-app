const router = require('express').Router();
const db = require('../../db/db.json');
const uniqid = require('uniqid');
const fs = require('fs')
const path = require('path')

router.get('/notes', (req, res) => {
    let results = db
    res.json(results);
});

router.post('/notes', (req, res) => {
    let note = req.body;
    note.id = uniqid();
    let dbJoin = path.join(__dirname, '../../db/db.json');

    if (!note) {
        res.send(400);
        db = []
        return;
    }

    db.push(note)

    fs.writeFile(dbJoin, JSON.stringify(db) , (err) => {
        if (err) {
            console.log (err)
        }
        console.log('success')
    })

    return res.json(note)
});

router.delete('/notes/:id', (req, res) => {
    let params = req.params.id;
    let dbJoin = path.join(__dirname, '../../db/db.json');

    for (let i = 0; i < db.length; i++) {
        if (db[i].id === params) {
            db.splice(i, 1);
            break;
        }
    }

    fs.writeFile(dbJoin, JSON.stringify(db), (err) => {
        if (err) {
            console.log (err)
        }
        console.log('deleted')
    });
    return res.json(db);
});

module.exports = router;