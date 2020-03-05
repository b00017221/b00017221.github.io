//'use strict';
// объект КОМАНДЫ


window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        });
    });

    let request = new XMLHttpRequest();
    request.open("GET",'json/matches.json');
    request.setRequestHeader('Content-type','application/json','charset=utf-8');
    request.send();
    request.addEventListener('readystatechange', function() {
        if (request.readyState === 4 && request.status == 200) {
            let allGames = JSON.parse(request.response);
            console.log(allGames);
            addSectionGames(allGames);

            let btnGames = document.querySelectorAll('.games .btns button'); 
            btnGames.forEach(item => {
            item.addEventListener('click',() => {
                let target = event.target;           
                let forecastPlayers = target.parentElement.nextElementSibling;
                let btnHide = forecastPlayers.lastChild;
                forecastPlayers.classList.remove('hide');
                forecastPlayers.classList.add('show');
                btnHide.classList.remove('hide');
                btnHide.classList.add('show');
                target.parentElement.classList.remove('show');
                target.parentElement.classList.add('hide');
                });
            });

            let btnsHideForecast = document.querySelectorAll('.games .forecast .hideForecast');
            btnsHideForecast.forEach(item => {
                item.addEventListener('click', function() {
                    let target = event.target;
                    let btns = target.parentElement.previousElementSibling;
                    btns.classList.remove('hide');
                    btns.classList.add('show');
                    target.classList.remove('show');
                    target.classList.add('hide');
                    target.parentElement.classList.remove('show');
                    target.parentElement.classList.add('hide');
                });
            });
        }
    });

    

})





