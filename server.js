const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

app.get("/api/v1/papers", (req, res) => {
  database("papers")
    .select()
    .then(papers => {
      res.status(200).json(papers);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
