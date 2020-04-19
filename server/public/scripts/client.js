
$(document).ready(readyNow);

let totalNum = '';

// creating object to send to sever
let calculations = {
    first: '',
    second: '',
    symbol: '',
    total: '',
    history: []
}

function readyNow(){
    // on click =
    $('#equals').on('click', sendInputs);

    // on click clear
    $('#clearBtn').on('click', clearInputs);

    // on click num buttons
    $('#zero').on('click', collectNumbers);
    $('#one').on('click', collectNumbers);
    $('#two').on('click', collectNumbers);
    $('#three').on('click', collectNumbers);
    $('#four').on('click', collectNumbers);
    $('#five').on('click', collectNumbers);
    $('#six').on('click', collectNumbers);
    $('#seven').on('click', collectNumbers);
    $('#eight').on('click', collectNumbers);
    $('#nine').on('click', collectNumbers);
    $('#dot').on('click', collectNumbers);

    // on click symbols
    $('#plus').on('click', setSymbol);
    $('#minus').on('click', setSymbol);
    $('#times').on('click', setSymbol);
    $('#divide').on('click', setSymbol);

    getAnswer();
}

// getting the value of the second input and making an object from the 
// inputs and symbol to send to the server side with an AJAX call
function sendInputs(){
    calculations.second = totalNum.slice(totalNum.lastIndexOf(calculations.symbol + 1));
    



    //clearing inputs 
    $('#number').val('');
   
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

    console.log(calculations);
    
    clearInputs();
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
    $('#number').val('');

    calculations.first = '';
    calculations.second = '';
    calculations.symbol = '';
    totalNum = '';
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

function collectNumbers(){
    totalNum += this.getAttribute('data-number');
    $('#number').val(totalNum);
}

function setSymbol(){
    symbol = this.getAttribute('data-symbol');

    if(calculations.symbol === ''){
        calculations.first = $('#number').val();
        calculations.symbol = symbol;
        totalNum += symbol;
        $('#number').val(totalNum);
    }


    
}

// [x] have one number
// [x] add nums as clicked
// [x] on click of symbol add total num and symbol to obj
// [x] clear total num
// [x] add nums as clicked
// [x] on click of = add second num total to obj
// [x] then send obj off

