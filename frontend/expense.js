async function getUserInfo() {
    //Get user ID from the query string passed by the previous register page
    const userIdFromQuery = window.location.search
    const onlyUserId = userIdFromQuery.replace('?id=', '');

    try {
        const response = await fetch(`/api/v1/user/${onlyUserId}`);
        const data = await response.json();
        if (data.success) {
            return data;
        } else {
            alert('No valid user found.');
        }

    } catch (error) {
        console.log(error);
    }

}


function doTheMath(expensesArray, operator) {
    if (operator === '+') {
        let runningCreditTotal = 0;
        for (let i in expensesArray) {
            runningCreditTotal = runningCreditTotal + expensesArray[i].expense_amount;
        }
        return runningCreditTotal;
    } else if (operator === '-') {
        let runningDebitTotal = 0;
        for (let i in expensesArray) {
            runningDebitTotal = runningDebitTotal + expensesArray[i].expense_amount;
        }
        return runningDebitTotal;
    } else {
        return null;
    }
}


document.addEventListener('DOMContentLoaded', async () => {

    //Get the div layer that will hold all expense history
    const expenseHistory = document.getElementById('expense_history');

    const currentUser = await getUserInfo();

    const userNameElement = document.getElementById('username_dashboard');
    userNameElement.innerHTML = `Hi ${currentUser.user.name}!`;

    const totalElement = document.getElementById('total');

    try {
        const response = await fetch('/api/v1/expense/');
        const data = await response.json();

        if (data.success) {
            //Filter expenses by userID
            const userSpecificExpenses = data.expenses.filter((expense) => {
                return expense.user === currentUser.user._id
            });

            //Debit = Deduction
            const allDeductions = userSpecificExpenses.filter((expense) => {
                return expense.expense_type === 'debit'
            });
            const totalDeductions = doTheMath(allDeductions, '-');



            //Credit = Addition
            const allAdditions = userSpecificExpenses.filter((expense) => {
                return expense.expense_type === 'credit'
            });
            const totalAdditions = doTheMath(allAdditions, '+');


            //This sorts all expenses from latest to oldest created
            const sortedExpenses = userSpecificExpenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            //Loops through all expenses and creates a paragraph element to append to the main expense history div
            sortedExpenses.forEach(element => {
                const newElement = document.createElement('p');
                newElement.classList = 'expense'
                //This formats the createdAt date data to be a readable format
                const formattedDate = new Date(element.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                //Sets the innerHTML of the new p element
                newElement.innerHTML = `<span id="history_name"  onclick="displayExpenseInfoInsideModal(event)" data-expenseid=${element._id}>${element.expense_name}</span> ${element.expense_type === 'debit' ? `<span class="history_amount debit"> - $${element.expense_amount}</span>` : `<span class="history_amount credit"> + $${element.expense_amount}</span>`}  <span id="history_date">${formattedDate}</span> <span id="trashcan"><svg onclick="deleteExpense(event)" id=${element._id} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </span>`;
                //Appends a p element everytime we loop through each expense
                expenseHistory.appendChild(newElement);

                totalElement.innerHTML = `Total: $${totalAdditions - totalDeductions}`
            });
        }
    } catch (error) {
        console.log(error);
    }
});

async function displayExpenseInfoInsideModal(event) {
    const expenseId = event.target.dataset.expenseid;
    try {
        const response = await fetch(`/api/v1/expense/${expenseId}`);
        const data = await response.json();

        if (data.success) {
            document.getElementById('expense_information_name').innerHTML = `Name: ${data.expense.expense_name}`;
            document.getElementById('expense_information_description').innerHTML = `Description: ${data.expense.expense_description}`;
            document.getElementById('expense_information_category').innerHTML = `Category: ${data.expense.expense_category}`;
            document.getElementById('expense_information_amount').innerHTML = `Amount: ${data.expense.expense_amount}`;
            document.getElementById('expense_information_type').innerHTML = `Type: ${data.expense.expense_type}`;
        }
    } catch (error) {
        console.log(error);
    }

    document.getElementById('myModal').classList.toggle('hideMe');
}

async function deleteExpense(event) {
    const expenseId = event.target.id;
    console.log(expenseId)
    try {
        const response = await fetch(`/api/v1/expense/${expenseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.success) {
          location.reload()
        }
    } catch (error) {
        console.log(error);
    }
}

async function addExpense() {
    const expenseName = document.getElementById('expense_name').value;
    const expenseDescription = document.getElementById('expense_description').value;
    const expenseCategory = document.getElementById('expense_category').value;
    const expenseAmount = document.getElementById('expense_amount').value;
    const expenseType = document.getElementById('expense_type').value;
    const currentUser = await getUserInfo();
    const user = currentUser.user._id;
    console.log('full user object from addExpense: ', currentUser.user._id);

    if (expenseName !== '' && expenseDescription !== '' && expenseCategory !== '' && expenseAmount !== '' && expenseType !== '' && user !== '') {
        try {
            const response = await fetch('/api/v1/expense/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    expense_name: expenseName,
                    expense_description: expenseDescription,
                    expense_category: expenseCategory,
                    expense_amount: expenseAmount,
                    expense_type: expenseType,
                    user
                })
            })
            const data = await response.json();
            if (data.success) {
                console.log('data from addExpense', data);
                window.location.href = `/expense.html?id=${user}`;
            } else {
                alert('Expense creation failed');
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        alert('Please fill in all fields');
        return;
    }
}