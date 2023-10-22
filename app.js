const express = require("express");
const Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended:true }));

let pokeID = 1;
let pokeName = '';

app.get("/",(req,res) => {
    P.getPokemonByName(pokeID)
    .then(function(response) {
      pokeName = response.name;
      pokeID = response.id;
      res.render(__dirname+"/index.html", { PokeName: pokeName, msg: "Search for a Pokemon!!!", PokeID: pokeID});
    })
    .catch(function(error) {
        pokeName = "Pokemon Not Found :(";
        pokeID = 0;
        res.render(__dirname+"/index.html", { currName: pokeName, msg: "write correctly",currID: pokeID});
    });
});
app.post("/search",(req,res) => {
    const currentSearch = req.body.searchName;
    P.getPokemonByName(currentSearch.toLowerCase())
    .then(function(response) {
        pokeID = response.id;
        res.redirect("/");
    })
    .catch(function(error) {
        pokeID = 0;
        res.redirect("/");
    });
});

app.post("/prev",(req,res) => {
    pokeID=pokeID-1;
    if(pokeID==0){
        pokeID=898;
    }
    res.redirect("/");
});

app.post("/next",(req,res) => {
    pokeID=pokeID+1;
    if (pokeID==899){
        pokeID=1;
    }
    res.redirect("/");
});

app.post("/prevInfo",(req,res) => {
    pokeID=pokeID-1;
    if(pokeID==0){
        pokeID=898;
    }
    res.redirect("/info");
});

app.post("/nextInfo",(req,res) => {
    pokeID=pokeID+1;
    if (pokeID==899){
        pokeID=1;
    }
    res.redirect("/info");
});


app.post("/back",(req,res) => {
    res.redirect("/");
});

app.get("/info",(req,res) => {
    P.getPokemonByName(pokeID)
    .then(function(response) {
      n = response.name;
      exp = response.base_experience;
      weight = response.weight;
      height = response.height;
      img = response.sprites.front_default;
      types = response.types;
      typesArray = [];
      for (const t in types){
        typesArray.push(types[t].type.name)
      }
      abil = response.abilities;
      abilArray = [];
      for (const a in abil){
        abilArray.push(abil[a].ability.name)
      }
      move = response.moves;
      moveArray = [];
      for (const m in move){
        moveArray.push(move[m].move.name)
      }
      res.render(__dirname+"/info.html", {n:n, exp:exp, weight:weight, height:height, img:img, types:typesArray, abil:abilArray, moves:moveArray});
    })
    .catch(function(error) {
        console.log("Error: ", error);
    });
});

app.post("/info",(req,res) => {
    P.getPokemonByName(pokeID)
    .then(function(response) {
      n = response.name;
      exp = response.base_experience;
      weight = response.weight;
      height = response.height;
      img = response.sprites.front_default;
      types = response.types;
      typesArray = [];
      for (const t in types){
        typesArray.push(types[t].type.name)
      }
      abil = response.abilities;
      abilArray = [];
      for (const a in abil){
        abilArray.push(abil[a].ability.name)
      }
      move = response.moves;
      moveArray = [];
      for (const m in move){
        moveArray.push(move[m].move.name)
      }
      res.render(__dirname+"/info.html", {n:n, exp:exp, weight:weight, height:height, img:img, types:typesArray, abil:abilArray, moves:moveArray});
    })
    .catch(function(error) {
        console.log("Error: ", error);
    });
});

app.listen(3000, () => {
    console.log("http://localhost:3000/");
});


