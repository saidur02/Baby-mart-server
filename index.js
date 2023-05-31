const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aj4jua7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const run = async () => {
    try {
        const toyCollection = client.db('toysDB').collection('toys');

        app.post('/addtoy', async (req, res) => {
            const toy = req.body;
            console.log(toy)
            const result = await toyCollection.insertOne(toy)
            res.send(result)
        })
        
        
        app.get('/toysearch/:text', async (req, res) => {
            const searchText = req.params.text
            const result = await toyCollection.find({
                $or: [
                    { title: { $regex: searchText, Options: 'i' } },
                    { category: { $regex: searchText, Options: 'i' } },
                ],
            }).toArray();
            res.send(result)
        })
        
        
        app.get('/alltoy', async (req, res) => {
            const result = await toyCollection.find().toArray();
            res.send(result);
        })
        app.get('/alltoy/:id', async (req, res) => {
            const result = await toyCollection.find().toArray();
            res.send(result);
        })
        
        app.delete('/alltoy/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: new ObjectId(id) }
            const result = await toyCollection.deleteOne(query);
            res.send(result)
        })
        
        app.put('/addtoy/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const updateToys = req.body;
            const updateDoc = {
                $set: {
                    price: body.price,
                    quantity: body.quantity,
                    details: body.details,
                },
            };
            const result = await toyCollection.updateOne(filter, updateDoc);
            res.send(result)
        })
        
        console.log("Database Connected successfully ✅");
    } finally {

    }
}
run().catch(console.error);

app.get('/', (req, res) => {
    res.send('Baby Mart is Running')
})

app.listen(port, () => {
    console.log(`Baby Mart Is Running in Port ${port}`)
})