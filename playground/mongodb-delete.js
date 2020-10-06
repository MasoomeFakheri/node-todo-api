const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
    if(err){
        return console.log("Unable connect to MongoDB")
    }
    console.log("Connected to MongoDB")

    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result)=>{
    //     console.log(result);
    // })
    
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result)=>{
    //     console.log(result);
    // }) 

    // db.collection('Todos').findOneAndDelete({completed: false}).then((result)=>{
    //     console.log(result);
    // }) 

    // db.collection('Users').deleteMany({name: "Masoud"}).then((result)=>{
    //     console.log(result);
    // }) 

    db.collection('Users').findOneAndDelete({_id : new ObjectID("5b87b82caf721ab2a20c4c36")})
    .then((result)=>{
        console.log(result);
    }) 
    client.close();
})