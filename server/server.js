var express = require('express')
var bodyParser = require('body-parser')
const _ = require('lodash')

var {mongoose} = require('./db/mongoose')
var {ObjectID} = require('mongodb')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var {authenticate} = require('./middleware/authenticate')
var app = express();

app.use(bodyParser.json())

app.post('/todos', (req, res)=>{
   var todo = new Todo({
       text: req.body.text
   });
   todo.save().then((doc)=>{
       res.send(doc);
   }, (e)=>{
       res.status(400).send(e)
   })
})


app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (e)=>{
        res.status(400).send(e)
    })
})

// http://yoursite.com/1asdadqweqwesasd

app.get('/todos/:id', (req, res)=>{
    var id = req.params.id

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo})
    }).catch((e)=>{
        res.status(404).send();
    })
})

app.delete('/todos/:id', (req, res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findOneAndDelete({_id: new ObjectID(id)}).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }

        res.send(todo);
    }).catch((e)=>{
        res.status(404).send();
    })
})

app.patch('/todos/:id', (req, res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed'])

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({_id: new ObjectID(id)}, {$set: body}, {new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo)
    }).catch((e)=>{
        res.status(404).send();
    })
})


// User Profile
app.get('/user/me', authenticate, (req, res)=>{
    res.send(req.user)
})

// Login Route

app.post('/users/login', (req, res)=>{
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth', token).send(user)
        })
    }).catch((err)=>{
        res.status(400).send()
    })
})

// Logout Route
app.delete('/users/me/token', authenticate, (req, res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }).catch((err)=>{
        res.status(400).send();
    })
})

// POST /users

app.post('/users', (req, res)=>{
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(user)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})


app.listen(3000, ()=>{
    console.log('Started on port 3000')
})

module.exports = {app}