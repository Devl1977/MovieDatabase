const express = require('express');
const Router = express.Router();
const { getAllMovies, createMovie, getOneMovie, deleteAMovie} = require('../controllers/Movie'); 


//Route to get all movie
Router.get('/', getAllMovies);

//Route to get one movie
Router.get('/:id', getOneMovie);

//Route to create new movie
Router.post('/', createMovie);

//Route to delete an movie
Router.delete('/:id', deleteAMovie);

module.exports = Router
