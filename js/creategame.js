'use strict';
let teams = {
    t1:['Италия','icons/ita.jpg'],
    t2:['Швейцария','icons/sui.png'],
    t3:['Дания','icons/den.png'],
    t4:['Австрия','icons/aut.jpg'],
    t5:['Нидерланды','icons/ned.jpg'],
    t6:['Португалия','icons/por.png'],
    t7:['Польша','icons/pol.png'],
    t8:['Бельгия','icons/bel.png']
    },
    teams18 = [];

function countPoints(games,players) {
    for (let match in games) {                                      //перебираем объект матчей
    let numberMatch = +match.replace(/\D+/g,"")-1;              //номер матча
    let scoreMatch = games[match][7]+games[match][8];                //счет матча
        for (let player in players) {                               //перебираем объект игроков
            let points = 0, result = 0, outcome = 0;
            let playerName = 'none'; 
            for (let playerItem in players[player]) {               //перебираем свойства игроков
                if (playerItem == 'name') playerName = players[player][playerItem];
                if (playerItem == 'forecast') {                     // прогнозы матчей
                    let scoreForecast = players[player][playerItem][numberMatch];
                    if (!(isNaN(+scoreForecast))&&!(isNaN(+scoreMatch))) {  //если все числа
                        //console.log(scoreMatch+'  '+scoreForecast);
                        if (scoreMatch == scoreForecast) {         //если совпали результат матча и прогноз
                            points += 15;
                            result += 1;
                        }
                        else {
                            if (((scoreMatch.charAt(0) == scoreMatch.charAt(1))&&(scoreForecast.charAt(0) == scoreForecast.charAt(1))) 
                                || ((scoreMatch.charAt(0) > scoreMatch.charAt(1))&&(scoreForecast.charAt(0) > scoreForecast.charAt(1)))
                                || ((scoreMatch.charAt(0) < scoreMatch.charAt(1))&&(scoreForecast.charAt(0) < scoreForecast.charAt(1)))) { //если ничья в результате и прогнозе, но не совпали 
                                points +=(10-((Math.abs(+scoreMatch.charAt(0)-+scoreForecast.charAt(0)))+(Math.abs(+scoreMatch.charAt(1)-+scoreForecast.charAt(1)))));
                                outcome += 1;
                            } 
                        }                 
                    }                
                } 
                if (playerItem == 'points') players[player][playerItem] += points;
                if (playerItem == 'result') players[player][playerItem] += result;
                if (playerItem == 'outcome') players[player][playerItem] += outcome;
            }                
        }
    }
}

function addElements(games,players,playoff) {
    let i=0;
    for (let key in games) {
        addBlock(key,games);           
        //addBlockForecast(key,players);
    }  
    for (let key in playoff) {
        console.log(playoff[key].length);
        addBonus(playoff[key],key.substr(0,7));
    }
}

function addBlockForecast(key,obj) {
    //добавлем родительский DIV для отображения прогнозов игроков на матч
    let divForecast = new writeElement('div','forecast',null,document.querySelector('.'+key),null);
    //получаем номер матча numberMatch
    let numberMatch = +key.replace(/\D+/g,"")-1;
    let namePlayer='', scoreMatch='';
    for (let player in obj){
        for (let item in obj[player]){
            // получаем имя игрока
            if (item == 'name') namePlayer = obj[player][item];
            // получаем счет матча
            if (item=='forecast') scoreMatch = obj[player][item][numberMatch];
        }
        //добавляем DIV с именем игрока в документ
        let divnamePlayer = new writeElement('div',null,namePlayer,divForecast,null);
        //добавлям прогноз игрока
        let divScore = new writeElement('div',null,scoreMatch.charAt(0),divForecast,null);

    }   
}

 function writeElement(tegName,className,text,parentNode,attr) {
     this.tegName = tegName;                                         // наименование тега
     this.className = className;                                     // наменование классов
     this.text = text;                                               // текст элемента
     this.parentNode = parentNode;                                   // родитель элемента
     this.attr = attr;                                               // массив атрибутов тегов [SCR,TYPE,VALUE]
     let newElement = document.createElement(this.tegName);
     if (!(this.className == null)) newElement.className=this.className;
     if (!(this.text == null)) newElement.innerHTML = this.text;
     if (!(this.attr == null)) { 
         if (!(this.attr[0] == undefined)) newElement.setAttribute('src',this.attr[0]);
         if (!(this.attr[1] == undefined)) newElement.setAttribute('type',this.attr[1]);
         if (!(this.attr[2] == undefined)) newElement.setAttribute('value',this.attr[2]);         
     }
     return this.parentNode.appendChild(newElement);     
 }

function addBlock(key,obj) {

    let divRow = new writeElement('div',key+' matches stage-'+obj[key][0].toLowerCase(),null,document.querySelector(".games .container"),null);
    let divGroup = new writeElement('div','div-circle',obj[key][0],divRow,null);
    let divDate = new writeElement('div','dateMatch',obj[key][1],divRow,null);
    let divPlace = new writeElement('div','placeMatch',obj[key][2],divRow,null);
    let divTime = new writeElement('div','timeMatch',obj[key][3],divRow,null);
    let divTeam1 = new writeElement('div','team1',null,divRow);
    let spanTeam1 = new writeElement('span',null,obj[key][4],divTeam1,null);
    let imgTeam1 = new writeElement('img',null,null,divTeam1,[obj[key][5],,]);
    let spanBlank = new writeElement('span',null,'-',divRow,null);
    let divTeam2 = new writeElement('div','team2',null,divRow);
    let imgTeam2 = new writeElement('img',null,null,divTeam2,[obj[key][6],,]);
    let spanTeam2 = new writeElement('span',null,obj[key][7],divTeam2,null);
    let divScore = new writeElement('div','score',obj[key][8]+' : '+obj[key][9],divRow,null);
    let btn = new writeElement('button',null,'Forecast',divRow,[,'button',]);
}

function addBonus(arrPlayoff,divClass) {

    //let divTeam = new writeElement('div',divClass,,
} 

function xhRequest(file) {
    let request = new XMLHttpRequest();
    request.open("GET", file);
    request.setRequestHeader('Content-type','application/json; charset=utf-8');
    request.send();
    let objRet=request.addEventListener('readystatechange', function(e) {
        if (request.readyState === 4 && request.status == 200) {
            this.obj = JSON.parse(request.response);
            return this.obj;
        }
        //console.log(e);
    });
    console.log(objRet);
}        
