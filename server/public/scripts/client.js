
$(document).ready(readyNow);

let firstNumber;
let secondNumber;
let symbol = '';

function readyNow(){

    // on click + - * /
    $('#additionBtn').on('click', getFirstInput);
    $('#subtractionBtn').on('click', getFirstInput);
    $('#multiplicationBtn').on('click', getFirstInput);
    $('#divisionBtn').on('click', getFirstInput);

    // on click =
    $('#equalsBtn').on('click', sendInputs);

    // on click clear
    $('#clearBtn').on('click', clearInputs);

    getAnswer();

}
// getting the value of the first input and symbol
function getFirstInput(){
    firstNumber = $('#firstNumber').val();
    symbol = this.getAttribute('data-symbol'); 
}
// getting the value of the second input and making an object from the 
// inputs and symbol to send to the server side with an AJAX call
function sendInputs(){
    secondNumber = $('#secondNumber').val();
    
    //clearing inputs 
    $('#firstNumber').val('');
    $('#secondNumber').val('');

    // creating object to send to sever
    let calculations = {
        first: firstNumber,
        second: secondNumber,
        symbol: symbol,
        total: '',
        history: []
    }

    // making a POST request to send data to server
    $.ajax({
        type:'POST',
        url: '/calculations',
        data: calculations
    }).then(function (response){
        console.log(response);
        // calling get answer to request the updated calculations object
        // back from the server
        getAnswer();
    }).catch(function (err){
        alert(`ERROR! see console`);
        console.log(err);
        
    })
}

// AJAX call to th server to get the history array with all the 
// calculation objects
function getAnswer(){
    $.ajax({
        type: 'GET',
        url: '/calculations'
    }).then(function(response){
        // calling the function to display the data on the DOM
        displayOnDOM(response);
    }).catch(function(err){
        alert(`ERROR! see console`);
        console.log(err);
    })
}

// clears the inputs and zeros out the number and symbol values
function clearInputs(){
    firstNumber = '';
    secondNumber = '';
    symbol = '';

    $('#firstNumber').val('');
    $('#secondNumber').val('');

}

// displays on DOM
function displayOnDOM(history){
    $('#historyDiv').empty();
    if(history.length >= 1){
        $('#answerH2').text(history[history.length - 1].total);
    }

    for(let line of history){
        $('#historyDiv').append(`</p class="historyP m-3">${line.history}</p>`)
    }

}