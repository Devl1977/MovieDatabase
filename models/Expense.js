const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    expense_name: {
        type: String,
        required: true
    },
    expense_description: {
        type: String,
        required: true
    },
    expense_category: {
        type: String,
        required: true
    },
    expense_amount: {
        type: Number,
        required: true
    },
    expense_type: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})

const ExpenseModel = mongoose.model('Expense', ExpenseSchema);

module.exports = ExpenseModel;
