const express = require("express")
const db = require("../data/dbConfig")
const router = express.Router()

router.get("/", (req, res) => {
    db("accounts")
        .then(accounts => res.status(200).json(accounts))
        .catch(() => res.status(400).json({ message: "There was an error retrieving accounts." }))
})

router.get("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .first()
            .then(count => {
                if (count > 0) {
                    res.status(200).json({ message: "record deleted successfully" });
                  } else {
                    res.status(404).json({ message: "Post not found" });
                  }
                })
            .catch(() => res.status(500).json({ message: "There wan error retrieving the account with the specified ID." }))
})

router.post("/", (req, res) => {
    db("accounts")
        .insert(req.body)
            .then(() => res.status(201).json({ message: "Added successfully!" }))
            .catch(() => res.status(400).json({ message: "There was an error creating the account." }))
})

router.put("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .update(req.body)
        .then(() => {
            db("accounts")
                .where({ id: req.params.id })
                    .then(account => res.status(201).json(account))
                    .catch(() => res.status(500).json({ message: "Error updating." }))
        .catch(() => res.status(500).json({ message: "Error updating" }))            
        })
})

router.delete("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .del()
            .then(count => {
                if (count > 0) {
                res.status(200).json({ message: "record deleted successfully" });
              } else {
                res.status(404).json({ message: "Post not found" });
              }
            })
            .catch(() => res.status(500).json({ message: "There was an error delet." }))
})

module.exports = router