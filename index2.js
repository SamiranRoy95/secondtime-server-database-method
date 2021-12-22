const express=require("express")
const { MongoClient } = require('mongodb');
const ObjectId=require("mongodb").ObjectId;
const cors=require("cors");
const app =express()
const port =5000
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://mydbuser1:2cKuKzwaTjiLcbcl@cluster0.5d0ua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//async function 

 async function run(){
try{
    await client.connect()
    const database=client.db("toys");
    const toysCollection=database.collection("toyscollection")

    // const users={
    //     name:"Ruman",thinker:"ajoya"

    // }

    //Now we use variour kinds of method like POST ,DELETE,PUT,GET

    app.get("/users",async(req,res)=>{
        const cursor=toysCollection.find({})
        const users=await cursor.toArray()
        res.send(users)
    })

    app.get("/users/:id",async(req,res)=>{
const id =req.params.id;
const query={_id:Object(id)}
const user=await toysCollection.findOne(query)
console.log(id)
res.send(user)

})
//This is Post method
app.post("/users",async(req,res)=>{
const newUser=req.body;
console.log(newUser )
const result = await toysCollection.insertOne(newUser)
console.log(result)
res.json(result)

})

//This is PUt methiod 

app.put("/users/:id",async(req,res)=>{
const id=req.params.id;
const query={_id:ObjectId(id)}
const options = { upsert: true };
const updateDoc = {
    $set: {
      name:user.name,
      email:user.email
    },
  };

  const result = await movies.updateOne(filter, updateDoc, options);
  console.log("updating user",id)
  res.json(result)

})

//this Delete api

app.delete("/users/:id",async(req,res)=>{

    const id=req.params.id;
const query={_id:ObjectId(id)};
const user= await collection.findOne(query)
console.log("deleting user",user)
res.json(user)
})



    // toysCollection.insertOne(users)
    // console.log("hitting the database")

}
finally{
    // await client.close()
}

}
run().catch(console.dir)


app.get("/",(req,res)=>{

res.send("This is first execution through server")

})


app.listen(port,(req,res)=>{

    console.log("This is listening Port",port)
})