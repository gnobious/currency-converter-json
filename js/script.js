let inputUsd = document.getElementById('usd'),
    inputEur = document.getElementById('eur'),
    inputRub = document.getElementById('rub');
    
inputUsd.addEventListener('input', () => {
    let request = new XMLHttpRequest();
    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset-utf-8');
    request.send();
    request.addEventListener('readystatechange', function() {
        if (request.readyState ===4 && request.status == 200) {
            let data = JSON.parse(request.response);

            inputRub.value = inputUsd.value * data.usdrub;
            inputEur.value = inputUsd.value * data.usdeur;
        } else {
            inputRub.value = "Что-то пошло не так!";
            inputEur.value = "Что-то пошло не так!";
        }
    });
});

 inputEur.addEventListener('input', () => {
    let request = new XMLHttpRequest();
    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset-utf-8');
    request.send();
    request.addEventListener('readystatechange', function() {
        if (request.readyState ===4 && request.status == 200) {
            let data = JSON.parse(request.response);

            inputRub.value = inputEur.value * data.eurrub;
            inputUsd.value = inputEur.value * data.eurusd;
        } else {
            inputRub.value = "Что-то пошло не так!";            
            inputUsd.value = "Что-то пошло не так!";
        }
    });
});

inputRub.addEventListener('input', () => {
    let request = new XMLHttpRequest();
    request.open('GET', 'js/current.json');
    request.setRequestHeader('Content-type', 'application/json; charset-utf-8');
    request.send();
    request.addEventListener('readystatechange', function() {
        if (request.readyState ===4 && request.status == 200) {
            let data = JSON.parse(request.response);

            inputUsd.value = inputRub.value / data.usdrub;
            inputEur.value = inputRub.value / data.eurrub;
        } else {
            inputUsd.value = "Что-то пошло не так!";
            inputEur.value = "Что-то пошло не так!";
        }
    });
});