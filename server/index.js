const express = require("express");
const {getAlbum} = require('./google-photos')
const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening to Port");
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
