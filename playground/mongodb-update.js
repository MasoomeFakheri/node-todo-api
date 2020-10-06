const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
    if(err){
        return console.log("Unable connect to MongoDB")
    }
    console.log("Connected to MongoDB")

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5b87b728af721ab2a20c4bf1")
    // },{
    //     $set:{
    //         completed: false
    //     }
    // }, {
    //     returnOriginal : false
    // }).then((result)=>{
    //     console.log(result)
    // })
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5b87b834af721ab2a20c4c38")
    },{
        $inc: {
            age: 2
        }
    }, {
        returnOriginal: false
    }).then((result)=>{
        console.log(JSON.stringify(result, undefined, 2))
    })

    client.close();
})