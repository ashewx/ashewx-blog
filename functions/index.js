const functions = require("firebase-functions");
const express = require("express");
const {getAlbum} = require('./google-photos')
const app = express();
const port = 9000;

app.listen(port, () => {
  console.log("Listening to Port " + port);
});

// authorize CORS (for demo only)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/photos", async (request, response) => {
  try {
    const results = await getAlbum("V7kWyhLpYUH1WQko6");
    response.json(results);
  } catch (e) {
    response.status(500);
  }
});

app.get("/ping", (req, res) => {
  res.send("Hello World");
});

exports.app = functions.https.onRequest(app);
