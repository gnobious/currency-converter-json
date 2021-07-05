window.addEventListener('DOMContentLoaded', function() {
    'use strict'

    let inputStack = document.querySelectorAll('input'),
        ratesSrc = 'https://www.floatrates.com/daily/rub.json'; //external file with the current exchange rate    
   
    inputStack.forEach(item => {item.addEventListener('focus', () => {item.value = '';})}); //Clearing the input when focusing

    //Connecting to the data source and creating Promise
    function grabData(source) {
        return new Promise(function(resolve,reject){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', source);
            xhr.setRequestHeader('Content-type', 'application/json; charset-utf-8');
            xhr.onload = function() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }         
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });        
    }

    //The function parses the received data and converts
    grabData(ratesSrc)        
        .then(data => {                           
            let parsedData = JSON.parse(data);
            inputStack.forEach((listenedItem) => {listenedItem.addEventListener('input', () => {
                let currentEl = listenedItem.id,
                    ruble;
                if (currentEl == 'rub') {           //  Since the reference currency in our json file is the ruble,
                    ruble = listenedItem.value;    //  all conditions and calculations are based on this factor
                } else {
                    ruble = listenedItem.value/parsedData[currentEl].rate
                };
                inputStack.forEach((item) => {                    
                    if (item.id !== currentEl && item.id !== 'rub') {
                        item.value = (parsedData[item.id].rate * ruble).toFixed(3);
                    } else if (item.id !== currentEl && item.id == 'rub') {
                        item.value = ruble.toFixed(3);
                    }
                })                
            })});  
        })       
        .catch((error) => {
            console.log(`Сервер выдал ошибку: Статус - ${error.code};
            Текст: ${error}`)
            inputStack.forEach((item) => {item.value = `Ошибка (код ${error.code})`});
        })
});
