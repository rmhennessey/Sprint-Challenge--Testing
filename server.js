const express = require("express");

const server = express();

server.use(express.json());

const games = [
    {id: 1, title: "Pacman", genre: "Arcade", releaseYear: 1980},
    {id: 2, title: "Tecmo Bowl", genre: "Sports", releaseYear: 2000},
    {id: 3, title: "Mario Bros", genre: "Arcade", releaseYear: 2000},
    {id: 4, title: "Super Mario", genre: "Arcade", releaseYear: 2000},
]

server.get('/games', async (req, res) => {
  if (games.length > 0){
    res.status(200).json(games);
  } else {
    res.status(200).json([]);
  }
});

server.post("/games", (req, res) => {
    const { id, title, genre, releaseYear } = req.body;
  
    if (!title || !genre) {
      res.status(422).end();
    } else {
      res.status(201).json(req.body);
    }
  });

module.exports = server;