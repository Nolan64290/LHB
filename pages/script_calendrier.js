currentDivIndex = 1;

function changeDiv(n) {
    var currentDiv = document.getElementById(currentDivIndex);
    currentDiv.classList.remove('currentDiv');
    currentDivIndex = n;
    var newCurrentDiv = document.getElementById(currentDivIndex);
    newCurrentDiv.classList.add('currentDiv');
}