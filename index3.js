const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');
const cors =require("cors")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://mydbuser1:2cKuKzwaTjiLcbcl@cluster0.5d0ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


 async function run(){
try{
    await client.connect()
    const database =client.db("database");
    const collection=database.collection("coll")


    app.get("/users",async(req,res)=>{
        const cursor=collection.find({})
        const users= await   cursor.toArray()
        res.send(users)

    })

    app.get("/users/:id" ,async(req,res)=>{
        const id =req.params.id;
        const objectId={_id:ObjectId(id)}
      const result= await collection.insertOne(objectId)
      console.log(id)
      res.send(result)
    })
    //to send data to Server
app.post("/users",async(req,res)=>{
    const newUser=req.body;
    console.log(newUser)
   const result = await collection.insertOne(newUser)
   console.log(result);
   res.json(result)

})

// This is Put Method 
app.put("users/:id",async(req,res)=>{
    const id =req.params.id
    const user=req.body;
    const filter={_id:ObjectId(id)}
    const options = { upsert: true };
    const updateDoc = {
        $set: {
          name:user.name,
          email:user.email
        },
      };
     const result = await movies.updateOne(filter, updateDoc, options);
     res.send(result)
     console.log(result)

})

//This id Delete method
app.delete("/users/:id",async(req,res)=>{
    const id=req.params.id;
    const objectId={_id:ObjectId(id)}
    const result= await collection.deleteOne(objectId)
     console.log("deleteing id",id)
     res.json(result)

})

    // const doc={
    //     name:"Samiran",age:27
    // }



    //  collection.insertOne(doc)
    //  console.log("hitting the database")

}
finally{
    await client.close()
}
}
run().catch(console.dir)







app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})