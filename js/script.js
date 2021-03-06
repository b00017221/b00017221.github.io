'use strict';

window.addEventListener("DOMContentLoaded",() => {
    let old = setInterval(showTopMove,60000);
    const menu = document.querySelector(".menu"),
    menuItem = document.querySelectorAll(".menu-item"),
    humburger = document.querySelector(".humburger");

    humburger.addEventListener("click", () => {
        humburger.classList.toggle("humburger-active");
        menu.classList.toggle("menu-active");
    });

    menuItem.forEach(item => {
        item.addEventListener("click", () => {
            humburger.classList.toggle("humburger-active");
            menu.classList.toggle("menu-active");
        })
    });  

    // появление элемента стрелочки вверх при прокрутке экрана, если прокрутка больше чем экран
    // исчезание элемента стрелочки вверх при прокрутке экрана, если прокрутка меньше чем экран
    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
            document.querySelector(".top-move").style.display = 'block';
        }
        if (document.documentElement.scrollTop <= document.documentElement.clientHeight) {
            document.querySelector(".top-move").style.display = 'none';
        }
    });

    // нажатие на элемент стрелочки вверх и перемещение в начало страницы
    document.querySelector('.top-move').addEventListener("click", () => {
        document.querySelector('.top-move').style.display = 'none';
        scroll(0,0);
    });
       

    // Загружаем объект TEAMS (команды) из файла
    let reqTeams = XHRequest('json/teams.json');
    reqTeams.addEventListener('readystatechange', function() {
        if (reqTeams.readyState === 4 && reqTeams.status == 200) {
            let teams = JSON.parse(reqTeams.response);
            // Загружаем объект MATCHES (матчи) из файла
            let reqMatches = XHRequest('json/matches.json');
            reqMatches.addEventListener('readystatechange', function() {
                if (reqMatches.readyState === 4 && reqMatches.status == 200) {
                    let matches = JSON.parse(reqMatches.response);
                    // Загружаем объект PLAYERS (игроки) из файла
                    let reqPlayers = XHRequest('json/players.json');
                    reqPlayers.addEventListener('readystatechange', function() {
                        if (reqPlayers.readyState === 4 && reqPlayers.status == 200) {
                            let players = JSON.parse(reqPlayers.response);
                            // Загружаем объект PLAYOFF (участники плей-офф) из файла
                            let reqPlayoff = XHRequest('json/playoff.json');
                            reqPlayoff.addEventListener('readystatechange', function() {
                                if (reqPlayoff.readyState === 4 && reqPlayoff.status == 200) {
                                    let playoff = JSON.parse(reqPlayoff.response);
                                    fillingTableGroup(teams,matches);                               //заполнение таблиц групп результатами игр
                                                                                                    // и создание контента групп на страцице
                                    filingMatches(teams,matches,players);                           //заполнение контента матчей и подсчет 
                                                                                                    //очков игроков за угаданный прогноз

                                    filingPlayoff(teams,players,playoff);                           //заполнение контента сетки матчей плей-офф

                                    filingResult(players);                                          //заполнение контента итоговых результатов игроков

                                    let btnsForecast = document.querySelectorAll('.btn-matches'),   //коллекция кнопок прознозов
                                        divForecast = document.querySelectorAll('.close-forecast'), //коллекция элементов закрытия 
                                                                                                    //контента прогнозов на матч (крестик)
                                        btnsPlayoff = document.querySelectorAll('.btns-forecast');  //коллекция кнопок прогнозов плей-офф
                                    
                                    // нажатие кнопки прогноза, открытие контента прогнозов игроков на матч
                                    btnsForecast.forEach(item => {                                  
                                        item.addEventListener("click", () => {                      
                                            let divForecast = item.parentNode.nextSibling;         
                                    divForecast.style.display = 'flex';
                                    item.style.display = 'none';
                                        })
                                    })

                                    // закрытие контента прогнозов (нажатие на крестик)
                                    divForecast.forEach(item => {
                                        item.addEventListener('click', () => {
                                            // нажатие на крестик контента прогнозов матчей (закрытие)
                                            if (Object.values(item.parentNode.classList).indexOf('forecast-match-row') >= 0 ) {
                                                item.parentNode.style.display = 'none';
                                                let btnForecast = item.parentNode.previousSibling.lastChild;
                                                btnForecast.style.display = 'block';
                                            }
                                            // нажатие на крестик контента прогнозов плей-офф (закрытие)
                                            if ((Object.values(item.parentNode.classList).indexOf('forecast18') >= 0 )||
                                                (Object.values(item.parentNode.classList).indexOf('forecast14') >= 0 )||
                                                (Object.values(item.parentNode.classList).indexOf('forecast12') >= 0 )||
                                                (Object.values(item.parentNode.classList).indexOf('forecast10') >= 0 )) {
                                                console.log(item.parentNode);
                                                item.parentNode.classList.add("disp-none");
                                                item.parentNode.classList.remove("disp-block");
                                                let divsPlayoffHeader = document.querySelectorAll('.playoff-header div'),
                                                    divsPlayoff = document.querySelectorAll('.playoff .container div'),
                                                    divsPlayoffBtns = document.querySelectorAll('.playoff-btns div'),
                                                    divsFinal18 = document.querySelectorAll('.final18'),
                                                    divsFinal14 = document.querySelectorAll('.final14'),
                                                    divsFinal12 = document.querySelectorAll('.final12'),
                                                    divsFinal11 = document.querySelectorAll('.final11'),
                                                    divsFinal10 = document.querySelectorAll('.final10');
                                                document.querySelector('.playoff-btns').style.display = 'flex';
                                                divsPlayoff.forEach(item => {
                                                    item.classList.toggle('noborder');
                                                    if (Object.values(item.parentNode.classList).indexOf('div-flex') >= 0 ) {
                                                        item.classList.remove('col-1');
                                                        item.classList.add('col-3');
                                                    }
                                                });
                                                divsPlayoffHeader.forEach(item => {
                                                    item.style.display = 'block';
                                                    item.classList.add('col-3');
                                                });
                                                divsPlayoffBtns.forEach(item => {
                                                    item.classList.add('col-3');
                                                });
                                                divsFinal18.forEach(item => {
                                                    item.style.display = 'flex';
                                                });
                                                divsFinal14.forEach(item => {
                                                    item.style.display = 'flex';
                                                });
                                                divsFinal12.forEach(item => {
                                                    item.style.display = 'flex';
                                                });
                                                divsFinal11.forEach(item => {
                                                    item.style.display = 'flex';
                                                });
                                                divsFinal10.forEach(item => {
                                                    item.style.display = 'flex';
                                                });
                                            }
                                        })  
                                    })
                                    
                                    // нажатие кнопки прогноза плей-офф, открытие контента прогнозов игроков на плей-офф
                                    btnsPlayoff.forEach(item => {
                                        item.addEventListener('click', () => {
                                            let divsFinal18 = document.querySelectorAll('.final18'),
                                                divsFinal14 = document.querySelectorAll('.final14'),
                                                divsFinal12 = document.querySelectorAll('.final12'),
                                                divsFinal11 = document.querySelectorAll('.final11'),
                                                divsFinal10 = document.querySelectorAll('.final10'),
                                                divsPlayoffHeader = document.querySelectorAll('.playoff-header div'),
                                                divsPlayoff = document.querySelectorAll('.playoff .container div');
                                            document.querySelector('.playoff-btns').style.display = 'none';
                                            divsPlayoff.forEach(item => {
                                                item.classList.toggle('noborder');
                                                item.classList.remove('col-3');
                                                item.classList.add('col-1');
                                            });
                                            divsPlayoffHeader.forEach(item => {
                                                item.style.display = 'none';
                                            });
                                            divsFinal18.forEach(item => {
                                                item.style.display = 'none';                                                
                                            });
                                            divsFinal14.forEach(item => {
                                                item.style.display = 'none';
                                            });
                                            divsFinal12.forEach(item => {
                                                item.style.display = 'none';
                                            });
                                            divsFinal11.forEach(item => {
                                                item.style.display = 'none';
                                            });
                                            divsFinal10.forEach(item => {
                                                item.style.display = 'none';
                                            });
                                            if (item.classList[0] == 'btn18') {
                                                document.querySelector('.forecast18').classList.remove("disp-none");
                                                document.querySelector('.forecast18').classList.add("disp-block");
                                                divsFinal18.forEach(item => {
                                                    item.style.display = 'flex';
                                                    divsPlayoffHeader.forEach(item => {
                                                        if (item.innerHTML == '1/8 финала') item.style.display = 'block';
                                                    });
                                                });
                                            }
                                            if (item.classList[0] == 'btn14') {
                                                document.querySelector('.forecast14').classList.remove("disp-none");
                                                document.querySelector('.forecast14').classList.add("disp-block");
                                                divsFinal14.forEach(item => {
                                                    item.style.display = 'flex';
                                                     divsPlayoffHeader.forEach(item => {
                                                        if (item.innerHTML == '1/4 финала') item.style.display = 'block';
                                                     });
                                                });
                                            }
                                            if (item.classList[0] == 'btn12') {
                                                document.querySelector('.forecast12').classList.remove("disp-none");
                                                document.querySelector('.forecast12').classList.add("disp-block");
                                                divsFinal12.forEach(item => {
                                                    item.style.display = 'flex';
                                                    divsPlayoffHeader.forEach(item => {
                                                        if (item.innerHTML == '1/2 финала') item.style.display = 'block';
                                                    });
                                                });
                                            }
                                            if (item.classList[0] == 'btn11') {
                                                document.querySelector('.forecast10').classList.remove("disp-none");
                                                document.querySelector('.forecast10').classList.add("disp-block");
                                                divsFinal10.forEach(item => {
                                                    item.style.display = 'flex';
                                                    divsPlayoffHeader.forEach(item => {
                                                        if (item.innerHTML == 'Финал') item.style.display = 'block';
                                                    });
                                                 });
                                            }
                                            document.querySelector('.playoff-forecast').style.display = 'flex';
                                            document.querySelector('.playoff-forecast').classList.remove('noborder');
                                        })
                                    })
//


                                }
                            })       
                        }
                    })
                }
            })
        }
    }); 
    

})






