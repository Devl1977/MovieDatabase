const express = require('express');
const Router = express.Router();
const { getAllUsers, getOneUser, createUser } = require('../controllers/User') 

// C = Create/POST
// R = Read/GET
// U = Update/PUT
// D = Delete/DELETE


//Route to get all users
Router.get('/', getAllUsers);

//Route to get one user
Router.get('/:id', getOneUser);

//Route to create new user
Router.post('/', createUser);

module.exports = Router