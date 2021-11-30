const express = require ("express");

const importData = require ("./chain.json");

const app = express();
let port = process.env.PORT || 8080;

app.get("/",(req, res) => {
    res.send("Elixirdome is a blockchain powered drug and vaccine validation protocol build by Ayo seun solomon, each vaccine or Drug is indentified with a unique cryptographic code that makes them impossible to be counterfeited, Elixirdome brings Trust and safety to drug distribution.");
});


app.get("/blocks",(req, res) => {

    
    res.send(importData);
});


app.get("/lastBlock",(req, res) => {
    res.send(importData);
});

app.listen(port, ()=> {
    console.log('running on port http://localhost:${port}');
});