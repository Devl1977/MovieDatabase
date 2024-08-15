const ExpenseModel = require('../models/Expense');

const getAllExpenses = async(req, res) => {
    try {
        const allExpense = await ExpenseModel.find();
        return res.status(200).json({
            status: 200,
            success: true,
            expenses: allExpense
        })
        
    } catch (error) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: `No expenses found!`
        })
    }
}


const getOneExpense = async(req, res) => {
    const { id } = req.params;

    try {
        const singleExpense = await ExpenseModel.findById(id);
        if(singleExpense) {
            return res.status(200).json({
                status: 200,
                success: true,
                message: `Expense found!`,
                expense: singleExpense
            })
        }

    } catch (error) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: `Expense id: '${id}' does not exist!`
        })
    }
}

const deleteAnExpense = async(req, res) => {
    const { id } = req.params;

    try {
        const singleExpense = await ExpenseModel.findByIdAndDelete(id);
        return res.status(200).json({
            status: 200,
            success: true,
            message: `Expense '${id}' successfully deleted!`,
            data: singleExpense
        })

    } catch (error) {
        return res.status(404).json({
            status: 404,
            success: false,
            message: `Failed to delete expense id: '${id}'!`
        })
    }
}

const createExpense = async(req, res) => {
    const { expense_name, expense_description, expense_category, expense_amount, expense_type, user} = req.body;
    const newExpense = new ExpenseModel({
        expense_name,
        expense_description,
        expense_category,
        expense_amount,
        expense_type,
        user
    })

    try {
        const expenseToCreate = await newExpense.save();
        return res.status(201).json({
            status: 200,
            success: true,
            expense: expenseToCreate
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: `Expense: '${expense_name}' was not created!`
        })
    }
}


module.exports = {
    getAllExpenses,
    getOneExpense,
    createExpense,
    deleteAnExpense
}
