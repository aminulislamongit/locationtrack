require('dotenv').config()
let express = require("express")
let app = express();
let cors = require('cors')
app.use(cors())
app.use(express.json())

const port=4000;



app.get('/',(req,res)=>{
    res.send("hello world")
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aminulcoding:aminul123@cluster0.oyk9lvi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function getData(req,res){
    await client.connect();
    let data = client.db('Test').collection('location');
    app.post('/location', async function(req,res){
      let dataget = req.body;
      let insertData=await data.insertOne(dataget);

      res.send(insertData)

    })

}
getData();



app.listen(process.env.PORT, ()=>{
    console.log(`your server running on port ${port}}`)
})