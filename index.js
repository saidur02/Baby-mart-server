const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aj4jua7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  const dbConnect = async () => {
    try {
         client.connect();
        console.log("Database Connected successfully ✅");
    } catch (error) {
        console.log(error.name, error.message);
    }
}
dbConnect();
const toyCollection = client.db('toysDB').collection('toys');

app.post('/addtoy', async (req,res) =>{
    const toy = req.body;
    console.log(toy)
    const result = await toyCollection.insertOne(toy)
    res.send(result)
})



app.get('/addtoy',async (req,res) =>{
    const result = await toyCollection.find().toArray();
    res.send(result);
})



app.get('/',async (req,res) =>{
    const result = await toyCollection.find().toArray();
    res.send(result);
})
app.get('/alltoy',async (req,res) =>{
    const result = await toyCollection.find().toArray();
    res.send(result);
})

app.delete('/addtoy/:id', async(req,res) =>{
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await toyCollection.deleteOne(query);
    res.send(result)
})


app.get('/',(req,res) => {
    res.send('Baby Mart is Running')
})

app.listen(port, () =>{
    console.log(`Baby Mart Is Running in Port ${port}`)
})