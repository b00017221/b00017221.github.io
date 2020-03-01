//'use strict';
// объект КОМАНДЫ
let teams = {
    1:['a','Турция','icons/TUR.png'],
    2:['a','Уэльс','icons/WAL.png'],
    3:['a','Швейцария','icons/SUI.png'],
    4:['a','Италия','icons/ITA.png'],
    5:['b','Дания','icons/DEN.png'],
    6:['b','Россия','icons/RUS.png'],
    7:['b','Бельгия','icons/BEL.png'],
    8:['b','Финляндия','icons/FIN.png'],
    9:['c','Победитель плей-офф D (A) ','icons/none.png'],
    10:['c','Украина','icons/UKR.png'],
    11:['c','Австрия','icons/AUT.png'],
    12:['c','Нидерланды','icons/NED.png'],
    13:['d','Победитель плей-офф C','icons/none.png'],
    14:['d','Англия','icons/ENG.png'],
    15:['d','Чехия','icons/CZE.png'],
    16:['d','Хорватия','icons/CRO.png'],
},
// объект ИГРЫ
allGames={
    match1:['A','12/06/2020','Олимпико - Рим','22:00','Турция','icons/TUR.png','tur','icons/ITA.png','ita','Италия','1','1'],
    match2:['A','13/06/2020','Олимпийский - Баку','16:00','Уэльс','icons/WAL.png','wal','icons/SUI.png','sui','Швейцария','1','1'],
    match3:['B','13/06/2020','Паркен - Копенгаген','19:00','Дания','icons/DEN.png','den','icons/FIN.png','fin','Финляндия','3','2'],
    match4:['B','13/06/2020','С.Петербург - С.Петербург','22:00','Бельгия','icons/BEL.png','bel','icons/RUS.png','rus','Россия','2','2'],
    match5:['D','14/06/2020','Уэмбли - Лондон','16:00','Англия','icons/ENG.png','eng','icons/CRO.png','cro','Хорватия','0','1'],
    match6:['C','14/06/2020','Арена Националэ - Бухарест','19:00','Австрия','icons/AUT.png','aut','icons/none.png','none','Победитель D(A)','?','?'],
    match7:['C','14/06/2020','Й.Кройфф Арена - Амстердам','22:00','Нидерланды','icons/NED.png','ned','icons/UKR.png','ukr','Украина','?','?'],
    match8:['D','15/06/2020','Хэмпден Парк - Глазго','16:00','Победитель C','icons/none.png','none','icons/CZE.png','cze','Чехия','?','?'],
    match9:['E','15/06/2020','Дублин Арена - Дублин','19:00','Польша','icons/POL.png','pol','icons/none.png','none','Победитель B','?','?'],
    match10:['E','15/06/2020','Сан-Мамес - Бильбао','22:00','Испания','icons/ESP.png','esp','icons/SWE.png','swe','Швеция','?','?'],
    match27:['C','22/06/2020','Арена Националэ - Бухарест','19:00','Украина','icons/UKR.png','ukr','icons/AUT.png','aut','Австрия','?','?'],
    match28:['C','22/06/2020','Й.Кройфф Арена - Амстердам','19:00','Победитель D(A)','icons/none.png','none','icons/NED.png','ned','Нидерланды','?','?'],
    match29:['B','22/06/2020','С.Петербург - С.Петербург','22:00','Финляндия','icons/FIN.png','fin','icons/BEL.png','bel','Бельгия','?','?'],
    match30:['B','22/06/2020','Паркен - Копенгаген','22:00','Россия','icons/RUS.png','rus','icons/DEN.png','den','Дания','?','?'],
    match31:['D','23/06/2020','Уэмбли - Лондон','22:00','Чехия','icons/CZE.png','cze','icons/ENG.png','eng','Англия','?','?'],
    match32:['D','23/06/2020','Хэмпден Парк - Глазго','22:00','Хорватия','icons/CRO.png','cro','icons/none.png','none','Победитель С','?','?'],
    match33:['E','24/06/2020','Дублин Арена - Дублин','19:00','Швеция','icons/SWE.png','swe','icons/POL.png','pol','Польша','?','?'],
    match34:['E','24/06/2020','Сан-Мамес - Бильбао','19:00','Победитель В','icons/none.png','none','icons/ESP.png','esp','Испания','?','?'],
    match35:['F','24/06/2020','Арена Мюнхен - Мюнхен','22:00','Германия','icons/GER.png','ger','icons/none.png','none','Победитель A(D)','?','?'],
    match36:['F','24/06/2020','Пушкаш Арена - Будапешт','22:00','Португалия','icons/POR.png','por','icons/FRA.png','fra','Франция','?','?']
},
// объект ИГРОКИ
allPlayers={
    player1:{
        name:'Игрок-1',
        forecast:['21','00','11','21','22','32','??','??','??','??','??','??','??','??','??','??','??','??','??','??','00','21','11','21','22','32','??','??','??','??','??','??','??','??','??','??','??','??','??','??'],
        teams18:['1',[2],[3]],
        points:0,
        outcome:0,
        result:0
    },
    player2:{
        name:'Игрок-2',
        forecast:['13','32','32','10','??','??','??','??','??','??','??','??','??','??','??','??','??','??','??','??','00','21','11','21','22','32','??','??','??','??','??','??','??','??','??','??','??','??','??','??'],
        teams18:['1',[2],[3]],
        points:0,
        outcome:0,
        result:0
    }
};

// создание секции Games
for (let game in allGames) {  
    let containerGames=document.querySelector('.games').children[0];
    //console.log(containerGames.children[0]);
    let divRow=document.createElement('div');
    divRow.classList.add('row','group-'+allGames[game][0].toLowerCase()+'-bgc',game);
    divRow=containerGames.appendChild(divRow);
    let divGroup = document.createElement('div');
    divGroup.classList.add('group','col-1');
    divGroup = divRow.appendChild(divGroup);
    let spanGroup = document.createElement('span');
    spanGroup.innerHTML = allGames[game][0];
   divGroup.appendChild(spanGroup);
    let divPlaceGame=document.createElement('div');
    divPlaceGame.classList.add('placegame','col-9','col-sm-9','col-md-3','col-lg-3','col-xl-3');
    divPlaceGame=divRow.appendChild(divPlaceGame);
    let spanDate=document.createElement('span');
    let spanPlace=document.createElement('span');
    spanDate.innerHTML=allGames[game][1];
    spanPlace.innerHTML=allGames[game][2];
    divPlaceGame.appendChild(spanDate);
    divPlaceGame.appendChild(spanPlace);
    let divTime=document.createElement('div');
    divTime.classList.add('timegame','col-2','col-sm-2','col-md-1','col-lg-1','col-xl-1');
    divTime.innerHTML=allGames[game][3];
    divRow.appendChild(divTime);
    let divTeam=document.createElement('div');
    divTeam.classList.add('team','col-10','col-sm-10','col-md-4','col-lg-4','col-xl-4');
    divTeam=divRow.appendChild(divTeam);
    let spanTeam1=document.createElement('span');
    spanTeam1.innerHTML=allGames[game][4];
    divTeam.appendChild(spanTeam1);
    let imgTeam1=document.createElement('img');
    imgTeam1.setAttribute('src',allGames[game][5]);
    imgTeam1.setAttribute('alt',allGames[game][6]);
    imgTeam1.classList.add('flag');
    divTeam.appendChild(imgTeam1);
    let spanBlank = document.createElement('span');
    spanBlank.innerHTML = '--';
    divTeam.appendChild(spanBlank);
    let imgTeam2=document.createElement('img');
    imgTeam2.setAttribute('src',allGames[game][7]);
        imgTeam2.setAttribute('alt',allGames[game][8]);
    imgTeam2.classList.add('flag');
    divTeam.appendChild(imgTeam2);
    let spanTeam2=document.createElement('span');
    spanTeam2.innerHTML=allGames[game][9];
    divTeam.appendChild(spanTeam2);
    let divScore=document.createElement('div');
    divScore.classList.add('score','col-2','col-sm-2','col-md-1','col-lg-1','col-xl-1');
    divScore = divRow.appendChild(divScore);
    let spanScore1 = document.createElement('span');
    spanScore1.innerHTML=allGames[game][10];
    divScore.appendChild(spanScore1);
    let divBlank2=document.createElement('span');
     divBlank2.innerHTML=':';
    divScore.appendChild(divBlank2);
    let divScore2=document.createElement('span');
    divScore2.innerHTML=allGames[game][11];
    divScore.appendChild(divScore2);
    let divBtn=document.createElement('div');
    divBtn.classList.add('btns','col-12','col-sm-12','col-md-2','col-lg-2','col-xl-2');
    divBtn=divRow.appendChild(divBtn);
    let btns=document.createElement('button');
    btns.classList.add('btn','btn-outline-light');
    btns.setAttribute('type','button');
    btns.innerHTML='Прогноз';
    divBtn.appendChild(btns);
    //создание DIV просмотра прогнозов игроков
    let divForecast = document.createElement('div');
    divForecast.classList.add('row','forecast','col-12','hide','fade');
    divForecast = divRow.appendChild(divForecast);
    let namePlayer, forecastPlayer, forecastScore1, forecastScore2,bonus;
    let numMatch = parseInt(game.replace(/[^0-9\.]/g, ''), 10);
    for ( let player in allPlayers) {
        forecastPlayer = player;
        //console.log(forecastPlayer);
        for (let iPlay in allPlayers[player]) {
            bonus = '';
            if (iPlay=='name') namePlayer = allPlayers[player][iPlay];
            if ((iPlay='forecast')&&(allPlayers[player][iPlay].length>numMatch)) {
                forecastScore1 = allPlayers[player][iPlay][numMatch-1].charAt(0);
                forecastScore2 = allPlayers[player][iPlay][numMatch-1].charAt(1);
            }
        }
       //создание DIV игрока
        
        //console.log(allGames[game][10]+':'+allGames[game][11]+'--'+namePlayer+'  '+forecastScore1+':'+forecastScore2 );    
  
        if ((!isNaN(+allGames[game][10]))&&(!isNaN(+allGames[game][11]))&&(!isNaN(forecastScore1))&&(!isNaN(forecastScore2))) {
    //console.log(+allGames[game][10]);
            if ((allGames[game][10]+allGames[game][11]) == (forecastScore1+forecastScore2)) bonus = '15';
            else {
                if (((allGames[game][10]-allGames[game][11]) == (forecastScore1-forecastScore2))||
                    (((allGames[game][10]-allGames[game][11])>0)&&((forecastScore1-forecastScore2)>0))||
                    (((allGames[game][10]-allGames[game][11])<0)&&((forecastScore1-forecastScore2)<0)))
                    bonus = 10-Math.abs(+allGames[game][10]+(+allGames[game][11]))-(+forecastScore1+(+forecastScore2));
                    //console.log(namePlayer+'-'+bonus);
            }
        };

        let divBonus = document.createElement('div');
        divBonus.classList.add('bonus','col-2',forecastPlayer);
        if (+bonus) divBonus.innerHTML = '+'+bonus;
        else divBonus.innerHTML = '-';
        divForecast.appendChild(divBonus);
        let divPlayer = document.createElement('div');
        divPlayer.classList.add('col-8','col-sm-8','col-md-7','col-lg-7','col-xl-7');
        divPlayer.innerHTML = namePlayer;
        divForecast.appendChild(divPlayer);
        let divScoreForecast = document.createElement('div');
        divScoreForecast.classList.add('scoreForecast','col-2','col-sm-2','col-md-3','col-lg-3','col-xl-3');
        divScoreForecast = divForecast.appendChild(divScoreForecast);
        let spanScoreForecast1 = document.createElement('span');
        spanScoreForecast1.innerHTML = forecastScore1;
        divScoreForecast.appendChild(spanScoreForecast1);
        let spanScoreForecastBlank = document.createElement('span');
        spanScoreForecastBlank.innerHTML = ':';
        divScoreForecast.appendChild(spanScoreForecastBlank);
        let spanScoreForecast2 = document.createElement('span');
        spanScoreForecast2.innerHTML = forecastScore2;
        divScoreForecast.appendChild(spanScoreForecast2);

    }
    let divHide = document.createElement('div');
    divHide.classList.add('hideForecast', 'hide');
    divForecast.appendChild(divHide);

};


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
        item.addEventListener('click', () => {
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

})





