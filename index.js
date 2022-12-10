const addNewTransaction = document.querySelector(".newTransaction");
const receiveNewConcept = document.querySelector("#inputConcept");
const receiveNewQuantity = document.querySelector("#inputQuantity");

addNewTransaction.addEventListener("submit", (event) => {
    event.preventDefault();
    geTransaction();
    newTransaction(receiveNewQuantity.value);
    total();
    receiveNewConcept.value = '';
    receiveNewQuantity.value = '';
})

function geTransaction(){
    let transaction = {
        concept: receiveNewConcept.value,
        quantity: receiveNewQuantity.value
    };

    const child = document.createElement('li')
    child.textContent = `${transaction.concept}: ${transaction.quantity}`
    const elementList = document.querySelector(".newsTransactions")
    elementList.prepend(child)

    const close = document.createElement('button')
    close.textContent = 'X'
    child.appendChild(close)
    close.addEventListener('click', () => {
        elementList.removeChild(child)
        removeTransaction(transaction.quantity)
    })
}

let positiveOperations = []
let negativeOperations = []
const deposits = document.querySelector(".deposit")
const expenses = document.querySelector(".expenses")
const savings = document.querySelector(".totalSavings")

function newTransaction(receiveNewQuantity){
    const nums = parseFloat(receiveNewQuantity)
        if (nums < 0){
            negativeOperations.push(nums)
            expenses.textContent = negativeOperations.reduce((accum, operation) => accum + operation, 0) + '€'
            return (expenses.textContent)
        }else if(nums > 0){
            positiveOperations.push(nums)
            deposits.textContent = positiveOperations.reduce((accum, operation) => accum + operation, 0) + '€'
            return (deposits.textContent)
        }
    return (deposits.textContent)
}

function total(){

    const totalDeposits = positiveOperations.reduce((accum, operation) => accum + operation, 0)
    const totalExpenses = negativeOperations.reduce((accum, operation) => accum + operation, 0)
    const totalSaving = totalDeposits + totalExpenses
    return savings.textContent = totalSaving + '€'
}

function removeTransaction(quantityTransaction){
    positiveOperations = positiveOperations.filter((item) => item != quantityTransaction)
    negativeOperations = negativeOperations.filter((item) => item != quantityTransaction)
    deposits.textContent = positiveOperations.reduce((accum, operation) => accum + operation, 0)
    expenses.textContent = negativeOperations.reduce((accum, operation) => accum + operation, 0)
    total()
}