const express = require('express');
const Router = express.Router();
const { getAllExpenses, createExpense, getOneExpense, deleteAnExpense} = require('../controllers/Expense'); 


//Route to get all expense
Router.get('/', getAllExpenses);

//Route to get one expense
Router.get('/:id', getOneExpense);

//Route to create new expense
Router.post('/', createExpense);

//Route to delete an expense - NOT PART OF THE ASSIGNMENT BUT ADDED IT TO REMOVE AN EXPENSE WITHOUT HAVING TO GO THROUGH MONGODB ATLAS
Router.delete('/:id', deleteAnExpense);

module.exports = Router
