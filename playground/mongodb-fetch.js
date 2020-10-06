const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
    if(err){
        return console.log("Unable connect to MongoDB")
    }
    console.log("Connected to MongoDB")

    const db = client.db('TodoApp');

    // db.collection('Todos').find({_id: new ObjectID('5b879b6a966ea145c0fc8230')}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err)
    // })

    // db.collection('Users').find().count().then((count)=>{
    //     console.log(`Users Count ${count}`);
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err)
    // })

    db.collection('Users').find({name: 'Masoud'}).toArray().then((docs)=>{
        console.log('Users')
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err)=>{
        console.log('Unable to fetch users', err)
    })
        
    client.close();
})