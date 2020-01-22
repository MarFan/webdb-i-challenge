const router = require('express').Router();

const db = require('../data/dbConfig');

router.get('/', (req, res) => {
    
    db("accounts").select()
    .limit(req.query.limit)
    .orderBy(req.query.sortby, req.query.sortdir)
        .then(accounts => res.status(200).json(accounts))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "Error retrieving accounts" })
        })
        
})

router.post('/', (req, res) => {
    const payload = {
        name: req.body.name,
        budget: req.body.budget
    };
    db("accounts").insert(payload)
    .then(account => res.status(200).json(db("accounts").where("id", account.id).first()))
    .catch(err => {console.log(err); res.status(500).json({ error: "Error adding account"})});
 })

router.put('/:id', (req, res) => { 
    const payload = {
        name: req.body.name,
        budget: req.body.budget
    };
    db("accounts").where('id', req.params.id).update(payload)
    .then(account => {console.log(account); res.status(200).json(db("accounts").where("id", req.params.id).first())})
    .catch(err => { console.log(err); res.status(500).json({ error: "Error updating account" })})
})

router.delete('/:id', (req, res) => {
    db("accounts").where('id', req.params.id).del()
    .then(account => res.status(204).end())
    .catch(err => res.status(500).json({ error: "Error deleting account." }))
 })

module.exports = router;