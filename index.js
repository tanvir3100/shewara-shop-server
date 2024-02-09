const express = require('express')
var cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
require('dotenv').config();
const port = process.env.PORT || 3200;

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://shewara3200:BZQlt5TuzxDOSLdM@cluster0.huqehxg.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const productsCollection = client.db('shewaraBD').collection('products')
        const teamsCollection = client.db('shewaraBD').collection('teams')

        //products related section
        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        //team related section
        app.get('/teams', async (req, res) => {
            const cursor = teamsCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })


































        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})