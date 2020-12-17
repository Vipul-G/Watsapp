const express = require('express'); 
const Chat = require('./models/chat.model.js'); 
const User = require('./models/user.model.js');

const route = express.Router();

//get all recipients of a user
route.get('/:userEmail/recipients', async (req, res, next) => {
    const { userEmail } = req.params;
    try {
        const recipients = await User.find({ email: { $ne: userEmail} });
        res.status(200).json(recipients);
    } catch (err) {
        next(err);
    }
});

// get all chats of a user
route.get('/users/:userEmail/chat', (req, res, next) => {
    const {userEmail} = req.params;
    if(!userEmail) {
       return res.status(400).send('Unable to fetch messages');
    }
    Chat.aggregate([
        {
            $match: {
                $or: [{from: userEmail}, {to: userEmail}]
            }
        },
        {
            $project: {
                "k": {$cond: {
                      if: { $eq: ["$from", userEmail] },
                      then: "$to",
                      else: "$from"
                    }},
                "v": "$$ROOT",
                "_id": 0 
            }
        },
        {
            $group: {
                _id: "$k",
                v: {
                  $push: "$v" 
                }
            }
        },
        {
            $project: { 
                "k": "$_id", 
                "v": 1,
                "_id": 0,
            }
        },
        {
            $group: {
                _id: {$not: null},
                chats: {
                  $push: "$$ROOT"
                }
            }
        },
        {
            $replaceRoot: {
                newRoot: {$arrayToObject: "$chats"}
            }
        }

    ])
    .then(response => res.json(response)).catch(err => next(err));
})

route.post('/chats', (req, res, next) => {
    const chat = req.body;
    Chat.create(chat)
    .then((data) => res.status(201).send(`new chat created: ${data}`))
    .catch(err => next(err));
})

// save user in db
route.post('/users', (req, res, next) => {
    const user = req.body;

    User.updateOne({email: user.email}, user, {upsert: true})
    .then((data) => res.status(201).send(`new user created: ${data}`))
    .catch((err) => next(err));
});

route.delete('/chats', (req, res, next) => {
    Chat.deleteMany({})
    .then((response) => {res.send('deleted successfully')})
    .catch((err) => next(err));
})


module.exports = route;