'use strict';


// загрузка объекта из файла JSON
function XHRequest(file) {
    let request = new XMLHttpRequest();
    request.open("GET", file);
    request.setRequestHeader('Content-type','application/json; charset=utf-8');
    request.send();
    return request;
}

// создание элемента на странице
function writeElement(tegName,className,text,parentNode,attr) {
    this.tegName = tegName;                                         // наименование тега
    this.className = className;                                     // наменование классов
    this.text = text;                                               // текст элемента
    this.parentNode = parentNode;                                   // родитель элемента
    this.attr = attr;                                               // массив атрибутов тегов [SCR,ALT,TYPE,VALUE]
    let newElement = document.createElement(this.tegName);
    if (!(this.className == null)) newElement.className=this.className;
    if (!(this.text == null)) newElement.innerHTML = this.text;
    if (!(this.attr == null)) { 
        if (!(this.attr[0] == undefined)) newElement.setAttribute('src',this.attr[0]);
        if (!(this.attr[1] == undefined)) newElement.setAttribute('alt',this.attr[1]);
        if (!(this.attr[2] == undefined)) newElement.setAttribute('type',this.attr[2]);
        if (!(this.attr[3] == undefined)) newElement.setAttribute('value',this.attr[3]);         
    }
    return this.parentNode.appendChild(newElement);     
}

//заполнение таблиц групп результатами игр и создание контента групп на странице
function fillingTableGroup(teams,matches) {

    let arrGroup = [],                         //массив групп
        arrTeams = [],                         //массив команд в группе
        arrTeamsGroup = [];                    //массив объектов групп
    // подсчет статистики команд и сохранение в объекте TEAMS
    for (let team in teams) {
        let group = team.substr(6,1),
            nameTeam = teams[team].name,
            games = 0,
            win = 0,
            draw = 0,
            loser = 0,
            points = 0;
        // перебор матчей
        for (let match in matches) {
            // счет матча - число
            if ((+matches[match][8])+(+matches[match][9]) >= 0) {
                // команда выйграла
                if (((nameTeam == matches[match][4]) && ((+matches[match][8]) > (+matches[match][9]))) || 
                    (nameTeam == matches[match][7] && ((+matches[match][8]) < (+matches[match][9])))) {
                    games += 1;
                    win += 1;
                    points += 3;
                }
                // команда сыграла вничью
                if ((nameTeam == matches[match][4] && (+matches[match][8]) == (+matches[match][9])) ||
                   (nameTeam == matches[match][7] && (+matches[match][8]) == (+matches[match][9]))) {
                    games += 1;
                    draw += 1;
                    points += 1;
                }
                // команда проиграла
                if (((nameTeam == matches[match][4]) && ((+matches[match][8]) < (+matches[match][9]))) || 
                    (nameTeam == matches[match][7] && ((+matches[match][8]) > (+matches[match][9])))) {
                    games += 1;
                    loser += 1;
                }
            }
        }
        teams[team].games = games;
        teams[team].win = win;
        teams[team].draw = draw;
        teams[team].loser = loser;
        teams[team].points = points;

        //создание массива наименования групп ARRGROUP и массива объектов команд групп ARRTEAMSGROUP
        if (arrGroup.indexOf(group) >= 0) {
            arrTeams.push(teams[team]); 
        }                 
        if ((arrGroup.indexOf(group) < 0) && (arrTeams.length > 0)) {
            arrTeamsGroup.push(arrTeams);
            arrTeams = [];
            arrGroup.push(group);
            arrTeams.push(teams[team]);        
        }
        if ((arrGroup.indexOf(group) < 0) && (arrTeams.length == 0)) {
            arrTeams = [];
            arrGroup.push(group);
            arrTeams.push(teams[team]);   
        }
    }
    arrTeamsGroup.push(arrTeams);
    // получение элемента родителя
    let divTeamsRow = document.querySelector('.teams-row');
    // создание элементов HTML для групп
    for (let i = 0;i < arrGroup.length;i ++) {
        // сортировка массива групп по убыванию очков
        arrTeamsGroup[i].sort((a,b) => {
            return (+b.points)-(+a.points)
        }); 
        let divGroup = new writeElement('div','group bg-'+arrGroup[i],null,divTeamsRow,null),
            divGroupHeader = new writeElement('div','group-header col-12',null,divGroup,null),
            div = new writeElement('div','col-7','Группа '+arrGroup[i].toUpperCase(),divGroupHeader,null);
        div = new writeElement('div','col','И',divGroupHeader,null);
        div = new writeElement('div','col','В',divGroupHeader,null);
        div = new writeElement('div','col','Н',divGroupHeader,null);
        div = new writeElement('div','col','П',divGroupHeader,null);
        div = new writeElement('div','col','О',divGroupHeader,null);
        for (let grTeam in arrTeamsGroup[i]) {
            let divTeamGroupRow = new writeElement('div','team-group-row',null,divGroup,null),
                divGroupTeam = new writeElement('div','group-team col-7',null,divTeamGroupRow,null),
                img = new writeElement('img',null,null,divGroupTeam,[arrTeamsGroup[i][grTeam]['icon'],arrTeamsGroup[i][grTeam]['icon'].substr(6,3),,]),
                span = new writeElement('span',null,arrTeamsGroup[i][grTeam]['name'],divGroupTeam,null),
                div = new writeElement('div','col',arrTeamsGroup[i][grTeam]['games'],divTeamGroupRow,null);
            div = new writeElement('div','col',arrTeamsGroup[i][grTeam]['win'],divTeamGroupRow,null);
            div = new writeElement('div','col',arrTeamsGroup[i][grTeam]['draw'],divTeamGroupRow,null);
            div = new writeElement('div','col',arrTeamsGroup[i][grTeam]['loser'],divTeamGroupRow,null);
            div = new writeElement('div','col',arrTeamsGroup[i][grTeam]['points'],divTeamGroupRow,null);
        }
    } 
}

///заполнение контента матчей и подсчет очков игроков за угаданный прогноз
function filingMatches(teams,matches,players) {
    // подсчет очков у игроков за прогноз матчей
    for (let match in matches) {                
    let numberMatch = +match.replace(/\D+/g,"")-1,                                //номер матча
        scoreMatch = matches[match][8]+matches[match][9];                         //счет матча
        let parentForecast = createMatch(matches[match]);                         // создание строки матча в документе 
                                                                                  // возвращает родителя для контента прогнозов
        for (let player in players) {                               
            let points = 0, 
                result = 0, 
                outcome = 0,
                playerName = players[player]['name'],
                scoreForecast = players[player]['forecast'][numberMatch]; 

            // проверка счет матча является ли числом
            if (!(isNaN(+scoreForecast))&&!(isNaN(+scoreMatch))) {  
                //console.log(scoreMatch+' ? '+scoreForecast);
                // совпали ли результат матча и прогноз
                if (scoreMatch == scoreForecast) {   
                    points += 15;
                    result += 1;
                }
                else {
                    // ничья в результате и прогнозе, но не совпали 
                    if (((scoreMatch.charAt(0) == scoreMatch.charAt(1))&&(scoreForecast.charAt(0) == scoreForecast.charAt(1))) 
                        || ((scoreMatch.charAt(0) > scoreMatch.charAt(1))&&(scoreForecast.charAt(0) > scoreForecast.charAt(1)))
                        || ((scoreMatch.charAt(0) < scoreMatch.charAt(1))&&(scoreForecast.charAt(0) < scoreForecast.charAt(1)))) {  
                            points +=(10-((Math.abs(+scoreMatch.charAt(0)-+scoreForecast.charAt(0)))+(Math.abs(+scoreMatch.charAt(1)-+scoreForecast.charAt(1)))));
                            outcome += 1;
                    } 
                }                 
            } 
            players[player]['points'] = +players[player]['points']+points;
            players[player]['result'] = +players[player]['result']+result;
            players[player]['outcome'] = +players[player]['outcome']+outcome;   
            createMatchForecast(points,playerName,scoreForecast,parentForecast);                 //создание контента прогнозов игроков в документе
        }
    }
}

// создание строки матча в документе
// в функцию передается массив компонентов матча
function createMatch(arrMatch) {
    // получение элемента родителя
    
    let divContainer = document.querySelector('.matches .container'),
        divRow = new writeElement('div','matches-row bg-'+arrMatch[0].toLowerCase(),null,divContainer,null),
        divGroup = new writeElement('div','group-match col',arrMatch[0],divRow,null),
        divDPM = new writeElement('div','dpt-match col-5 col-11-768',null,divRow,null),
        span = new writeElement('span','col-2',arrMatch[1],divDPM,null);
    span = new writeElement('span','col-9',arrMatch[2],divDPM,null);
    span = new writeElement('span','col-1',arrMatch[3],divDPM,null);
    let divTeams = new writeElement('div','teams-match col-4 col-10-768',null,divRow,null),
        divTeamHome = new writeElement('div','team-home col-6',null,divTeams,null),
        div = new writeElement('div','col-8',arrMatch[4],divTeamHome,null),
        divImg = new writeElement('div','col-4',null,divTeamHome,null),
        img = new writeElement('img',null,null,divImg,[arrMatch[5],arrMatch[5].substr(6,3),,]),
        divBlank = new writeElement('span','blank','-',divTeams,null),
        divTeamGuest = new writeElement('div','team-guest col-6',null,divTeams,null);
    divImg = new writeElement('div','col-4',null,divTeamGuest,null);
    img = new writeElement('img',null,null,divImg,[arrMatch[6],arrMatch[6].substr(6,3),,]);
    div = new writeElement('div',null,arrMatch[7],divTeamGuest,null);
    let divScore =  new writeElement('div','score-match col col-2-768',null,divRow,null);
    span = new writeElement('span',null,arrMatch[8],divScore,null);
    span = new writeElement('span',null,':',divScore,null);
    span = new writeElement('span',null,arrMatch[9],divScore,null);
    let divBtn =  new writeElement('div','btn-matches col col-2-768','Прогноз',divRow,null),
        divForecastMatchRow = new writeElement('div','forecast-match-row',null,divContainer,null),
        dateUs=arrMatch[1].substr(3,2)+'/'+arrMatch[1].substr(0,2)+'/'+arrMatch[1].substr(6,4)+' '+arrMatch[3];
    if (Date.parse(new Date()) < Date.parse(dateUs)) divBtn.style.display = 'none';
    return divForecastMatchRow;
}

// создание контента прогнозов игроков в документе
// в функцию передаются (расчитаннные очки, имя игрока, прогноз игрока, родитель контента прогнозов)
function createMatchForecast(point,playerName,scoreForecast,parent) {
    if (+point) point = '+'+point 
    else point = '-';
    let div = new writeElement('div','point col col-2-587',point,parent,null);
    div = new writeElement('div','player col-4 col-8-587',playerName,parent,null);
    let score = scoreForecast.charAt(0)+':'+scoreForecast.charAt(1);
    div = new writeElement('div','score-forecast col col-2-587',score,parent,null);
    let divClose = new writeElement('div','close-forecast',null,parent,null),
    span = new writeElement('span',null,null,divClose,null);
    span = new writeElement('span',null,null,divClose,null);
}

// создание контента сетки матчей плей-офф в документе
// в функцию передаются (расчитаннные очки, имя игрока, прогноз игрока, родитель контента прогнозов)
function filingPlayoff(teams,players,playoff) {
    // получение элемента родителя
    let divContainer = document.querySelector('.playoff .container');
    for (let stage in playoff) {
        let divFinal = new writeElement('div',stage.substr(0,7)+' div-flex',null,divContainer,null),
            cols = playoff[stage];
        for (let i = 0; i < cols.length; i++) {
            if (typeof(cols[i]) == 'object') {
                let divTeam = new writeElement('div',cols[i][0],null,divFinal,null),
                    img = new writeElement('img',null,null,divTeam,[cols[i][1],cols[i][1].substr(6,3),,]),
                span = new writeElement('span',null,cols[i][2],divTeam,null);
            }
            else {
                let divCol = new writeElement('div',cols[i],null,divFinal,null);
            }
        } 
    }                
    //создание контента прогнозов команд попавших в плей-офф
    let divForecast18 = document.querySelector('.forecast18'),
        divForecast14 = document.querySelector('.forecast14'),
        divForecast12 = document.querySelector('.forecast12'),
        divForecast10 = document.querySelector('.forecast10'),
        divClose18 = new writeElement('div','close-forecast',null,divForecast18,null),
        span = new writeElement('span',null,null,divClose18,null);
    span = new writeElement('span',null,null,divClose18,null);
    let divClose14 = new writeElement('div','close-forecast',null,divForecast14,null);
    span = new writeElement('span',null,null,divClose14,null);
    span = new writeElement('span',null,null,divClose14,null);
    let divClose12 = new writeElement('div','close-forecast',null,divForecast12,null);
    span = new writeElement('span',null,null,divClose12,null);
    span = new writeElement('span',null,null,divClose12,null);
    let divClose10 = new writeElement('div','close-forecast',null,divForecast10,null);
    span = new writeElement('span',null,null,divClose10,null);
    span = new writeElement('span',null,null,divClose10,null);

    for (let player in players) {
        let point18 = 0, point14 = 0, point12 = 0, point10 = 0,
            arrTeams18 = [], arrTeams14 = [], arrTeams12 = [], arrTeams10 = [];
        // заполнение массива команд 1/8 финала согласно прогнозу игрока, подсчет бонусных очков
        players[player]['teams18'].forEach(item => {
            for (let team in teams) {
                if ((+item == +team.replace(/\D+/g,""))&&(teams[team].f18 == '*')) {
                    if (arrTeams18.indexOf(teams[team].icon) == -1) {
                        arrTeams18.push(teams[team].icon);
                        point18 += 5;
                    }                    
                }
            }
        })
        // заполнение массива команд 1/4 финала согласно прогнозу игрока, подсчет бонусных очков
        players[player]['teams14'].forEach(item => {
            for (let team in teams) {
                if ((+item == +team.replace(/\D+/g,""))&&(teams[team].f14 == '*')) {
                    if (arrTeams14.indexOf(teams[team].icon) == -1) {
                        arrTeams14.push(teams[team].icon);
                        point14 += 10;
                    }                    
                }
            }
        })
        players[player]['teams12'].forEach(item => {
            for (let team in teams) {
                if ((+item == +team.replace(/\D+/g,""))&&(teams[team].f12 == '*')) {
                    if (arrTeams12.indexOf(teams[team].icon) == -1) {
                        arrTeams12.push(teams[team].icon);
                        point12 += 15;
                    }
                }
            }
        })
        for (let team in teams) {
            if ((+players[player]['champion'] == +team.replace(/\D+/g,""))&&(teams[team].f11 == '*')) {
                arrTeams10.push(teams[team].icon);
                point10 += 30;
            }
        }
        //создание контента прогнозов игроков на плей-офф на странице
        let divRow18 = new writeElement('div','row-forecast col-12 div-flex',null,divForecast18,null),
            divRow14 = new writeElement('div','row-forecast col-12 div-flex',null,divForecast14,null),
            divRow12 = new writeElement('div','row-forecast col-12 div-flex',null,divForecast12,null),
            divRow11 = new writeElement('div','row-forecast col-12 div-flex',null,divForecast10,null);
        let divPoint = new writeElement('div','point-forecast col-1','+'+point18,divRow18,null);
        divPoint = new writeElement('div','point-forecast col-1','+'+point14,divRow14,null);
        divPoint = new writeElement('div','point-forecast col-1','+'+point12,divRow12,null);
        divPoint = new writeElement('div','point-forecast col-1','+'+point10,divRow11,null);
        let divPlayer = new writeElement('div','player-forecast col-4',players[player]['name'],divRow18,null);
        divPlayer = new writeElement('div','player-forecast col-4',players[player]['name'],divRow14,null);
        divPlayer = new writeElement('div','player-forecast col-4',players[player]['name'],divRow12,null);
        divPlayer = new writeElement('div','player-forecast col-4',players[player]['name'],divRow11,null);
        let divTeamsForecast18 = new writeElement('div','teams-forecast col-7 div-flex',null,divRow18,null),
            divTeamsForecast14 = new writeElement('div','teams-forecast col-7 div-flex',null,divRow14,null),
            divTeamsForecast12 = new writeElement('div','teams-forecast col-7 div-flex',null,divRow12,null),
            divTeamsForecast10 = new writeElement('div','teams-forecast col-7 div-flex',null,divRow11,null);
        if (arrTeams18.length > 0) {
            for (let i = 0; i < arrTeams18.length; i++) {
                let img = new writeElement('img',null,null,divTeamsForecast18,[arrTeams18[i],arrTeams18[i].substr(6,3),,]);
            }
        }
        if (arrTeams14.length > 0) {
            for (let i = 0; i < arrTeams14.length; i++) {
                let img = new writeElement('img',null,null,divTeamsForecast14,[arrTeams14[i],arrTeams14[i].substr(6,3),,]);
            }
        }
        if (arrTeams12.length > 0) {
            for (let i = 0; i < arrTeams12.length; i++) {
                let img = new writeElement('img',null,null,divTeamsForecast12,[arrTeams12[i],arrTeams12[i].substr(6,3),,]);
            }
        }
        if (arrTeams10.length >= 0) {
            for (let i = 0; i < arrTeams10.length; i++) {
                let img = new writeElement('img',null,null,divTeamsForecast10,[arrTeams10[i],arrTeams10[i].substr(6,3),,]);
            }
        }
        players[player]['bonus'] = point18+point14+point12+point10;
    }
}

// создание контента итогвых результатов по прогнозу игроков
function filingResult(players) {
    let arrObjPlayers = [];
    for (let player in players) {
        players[player]['total'] = (+players[player]['points'])+(+players[player]['bonus']); 
        arrObjPlayers.push(players[player]); 
    }
    // сортируем массив игроков по убывание очков
    arrObjPlayers.sort((a,b) => {
        return (+b.total)-(+a.total)
    }); 
    let number = 0;
    for (let i = 0; i < arrObjPlayers.length; i++) {
        let divParent = document.querySelector('.total .container'),
            divRowTotal = new writeElement('div','total-row div-flex',null,divParent,null),
            divPlace = new writeElement('div','place-player col',(++number)+'.',divRowTotal,null),
            divPlayer = new writeElement('div','name-player col-6',arrObjPlayers[i]['name'],divRowTotal,null),
            divOutcome = new writeElement('div','outcome-player col',arrObjPlayers[i]['outcome'],divRowTotal,null),
            divResult = new writeElement('div','result-player col',arrObjPlayers[i]['result'],divRowTotal,null),
            divPoints = new writeElement('div','points-player col',arrObjPlayers[i]['points'],divRowTotal,null),
            divBonus = new writeElement('div','bonus-player col',arrObjPlayers[i]['bonus'],divRowTotal,null),
            divTotal = new writeElement('div','total-player col',arrObjPlayers[i]['total'],divRowTotal,null);
    }
}

function showTopMove() {
    // появление и исчезание модальной стрелочки вверх
    if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
        if (document.querySelector(".top-move").style.display == 'block') 
            document.querySelector(".top-move").style.display = 'none';
        else document.querySelector(".top-move").style.display = 'block';
    }
    // появление кнопок прогноза на матч если текущее время больше времени начала матча
    let divsBtnMatches = document.querySelectorAll('.btn-matches');
    divsBtnMatches.forEach(itemBtn => {
        let childs = itemBtn.parentNode.childNodes;
        childs.forEach(item => {
            if (Object.values(item.classList).indexOf('dpt-match') >= 0) {
                let dateUs=item.firstChild.innerHTML.substr(3,2)+'/'+item.firstChild.innerHTML.substr(0,2)+'/'+item.firstChild.innerHTML.substr(6,4)+' '+item.lastChild.innerHTML;
                if (Date.parse(new Date()) > Date.parse(dateUs)) {
                    itemBtn.style.display = 'block';
                }
            }
        }) 
    })
}

