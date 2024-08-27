const express = require("express");
const booksRoute = require("./routes/books.route.js");

const app = express();

app.use(express.json());

app.use("/api/v1", booksRoute);


const PORT = 8080;


app.listen(PORT, () => {
    console.log(`\nServer listening on port ${PORT}`);
})

