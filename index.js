const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1nvrp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const database = client.db("Developers");
    const developersCollection = database.collection("DevelopersCollection");
    app.post("/addGame", async (req, res) => {
      const data = req.body;
      console.log(data);
      res.json(data);
      /*  const doc = {
        title: "Record of a Shriveled Datum",
        content: "No bytes, no problem. Just insert a document, in MongoDB",
      };
      const result = await developersCollection.insertOne(doc); */
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
