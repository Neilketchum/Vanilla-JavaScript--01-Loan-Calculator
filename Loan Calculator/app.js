document.querySelector("#loan-form").addEventListener('submit', function (e) {
    // Hid Results
    document.getElementById('results').style.display = 'none';
    // SHow loader 
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResult, 2000);
    e.preventDefault();
});
// Calculating Result
function calculateResult() {
    const UI_amount = document.querySelector("#amount");
    const UI_interest = document.querySelector("#interest");
    const UI_time = document.querySelector('#years');
    const UI_monthlyPayment = document.getElementById('monthly-payment');
    const UI_totalPayment = document.querySelector('#total-payment');
    const UI_totalInterest = document.querySelector('#total-interest');
    const principal = parseFloat(UI_amount.value);
    const calcluatedInterest = parseFloat(UI_interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(UI_time.value) * 12;

    // Complete monthly payment
    const x = Math.pow(1 + calcluatedInterest, calculatedPayment);
    const monthly = (principal * x * calcluatedInterest) / (x - 1);
    if (isFinite(monthly)) {
        UI_monthlyPayment.value = monthly.toFixed(2);
        UI_totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        UI_totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    }
    else {
        showError("Please Check Your Numbers");

    }
    // e.preventDefault();

}
function showError(error) {
    // document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
    const errordiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(errordiv, heading)
    errordiv.className = "alert alert-danger";
    errordiv.appendChild(document.createTextNode(error));
    // Clearing error after 3 secs
    setTimeout(clearError, 3000);
}
function clearError() {
    document.querySelector('.alert').remove();
}
