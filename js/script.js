window.addEventListener('DOMContentLoaded', function() {
    'use strict'

    let inputUsd = document.getElementById('usd'),
        inputEur = document.getElementById('eur'),
        inputRub = document.getElementById('rub'),
        ratesSrc = 'https://www.floatrates.com/daily/rub.json'; //external file with the current exchange rate    
   
    //Connecting to the data source and calling the callback function
    function grabData(source, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', source, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset-utf-8');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                callback(xhr.response);
            }          
        };
        xhr.send(null);
    };

    //The function parses the received data and converts
    grabData(ratesSrc, function (data) {
        let response = JSON.parse(data);
        if (response) {
            let rubeur = response.eur.inverseRate,
                rubusd = response.usd.inverseRate,
                usdrub = response.usd.rate,
                eurrub = response.eur.rate;

            inputUsd.addEventListener('input', () => {
                inputRub.value = (inputUsd.value * rubusd).toFixed(3);
                inputEur.value = (inputRub.value * eurrub).toFixed(3);
            });

            inputEur.addEventListener('input', () => {
                inputRub.value = (inputEur.value * rubeur).toFixed(3);
                inputUsd.value = (inputRub.value * usdrub).toFixed(3);            
            });

            inputRub.addEventListener('input', () => {
                inputUsd.value = (inputRub.value * usdrub).toFixed(3);
                inputEur.value = (inputRub.value * eurrub).toFixed(3);            
            });
        }
        else if (isNaN(response) || response == "" || response == null) {
            inputUsd.value = "Что-то пошло не так!";
            inputRub.value = "Что-то пошло не так!";
            inputEur.value = "Что-то пошло не так!";
        }
    });         
});    
