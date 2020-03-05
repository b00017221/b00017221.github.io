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

// объект ИГРОКИ
allPlayers={
    player1:{
        name:'Игрок-1',
        forecast:['21','00','11','21','22','32','10','01','11','21','??','??','??','??','??','??','??','??','??','??','00','21','11','21','22','32','??','??','??','??','??','??','??','??','??','??','??','??','??','??'],
        teams18:['1',[2],[3]],
        points:0,
        outcome:0,
        result:0
    },
    player2:{
        name:'Игрок-2',
        forecast:['13','32','32','10','01','11','21','12','22','20','??','??','??','??','??','??','??','??','??','??','00','21','11','21','22','32','??','??','??','??','??','??','??','??','??','??','??','??','??','??'],
        teams18:['1',[2],[3]],
        points:0,
        outcome:0,
        result:0
    },
    player3:{
        name:'Игрок-3',
        forecast:['00','10','01','11','20','21','12','22','30','03','??','??','??','??','??','??','??','??','??','??','00','21','11','21','22','32','??','??','??','??','??','??','??','??','??','??','??','??','??','??'],
        teams18:['1',[2],[3]],
        points:0,
        outcome:0,
        result:0
    }
};



function addElement(nameTeg,nameClass,text,parentNode,attr = null) {
    this.nameTeg = nameTeg;
    this.nameClass = nameClass;
    this.text = text;
    this.parentNode = parentNode;
    this.attr = attr;
    //console.log(this.nameClass);
    let newElement = document.createElement(this.nameTeg);
    if (!(this.nameClass == null)) {
        for (let i=0;i<this.nameClass.length;i++)
            newElement.classList.add(this.nameClass[i]);
        }
    if (!(this.text == null)) newElement.innerHTML = this.text;
    if (!(attr == null)) {
        if (!(this.attr[0] == undefined)) newElement.setAttribute('src',this.attr[0]);
        if (!(this.attr[1] == undefined)) newElement.setAttribute('alt',this.attr[1]);
        if (!(this.attr[2] == undefined)) newElement.setAttribute('type',this.attr[2]);
    }
    return this.parentNode.appendChild(newElement);
}

// создание секции Games
function addSectionGames(allGames) {
    for (let game in allGames) {  
        let containerGames=document.querySelector('.games').children[0];
        let divRow = new addElement('div',['row','group-'+allGames[game][0].toLowerCase()+'-bgc',game],null,containerGames);
        let divGroup = new addElement('div',['group','col-1'],null,divRow);
        let spanGroup = new addElement('span',null,allGames[game][0],divGroup);
        let divPlaceGame=new addElement('div',['placegame','col-9','col-sm-9','col-md-3','col-lg-3','col-xl-3'],null,divRow);
        let spanDate = new addElement('span',null,allGames[game][1],divPlaceGame);
        let spanPlace = new addElement('span',null,allGames[game][2],divPlaceGame);
        let divTime = new addElement('div',['timegame','col-2','col-sm-2','col-md-1','col-lg-1','col-xl-1'],allGames[game][3],divRow);
        let divTeam = new addElement('div',['team','col-10','col-sm-10','col-md-4','col-lg-4','col-xl-4'],null,divRow);
        let spanTeam1 = new addElement('span',null,allGames[game][4],divTeam);
        let imgTeam1 = new addElement('img',['flag'],null,divTeam,[allGames[game][5],allGames[game][6],,]);
        let spanBlank = new addElement('span',null,'--',divTeam);
        let imgTeam2 = new addElement('img',['flag'],null,divTeam,[allGames[game][7],allGames[game][8],,]);
        let spanTeam2 = new addElement('span',null,allGames[game][9],divTeam);
        let divScore = new addElement('div',['score','col-2','col-sm-2','col-md-1','col-lg-1','col-xl-1'],null,divRow);
        let spanScore1 = new addElement('span',null,allGames[game][10],divScore);
        let divBlank2 = new addElement('span',null,':',divScore);
        let spanScore2 = new addElement('span',null,allGames[game][11],divScore);
        let divBtn = new addElement('div',['btns','col-12','col-sm-12','col-md-2','col-lg-2','col-xl-2'],null,divRow);
        let btns = new addElement('button',['btn','btn-outline-light'],'Прогноз',divBtn,[,,'button',]);
        
        //создание DIV просмотра прогнозов игроков
        let divForecast = new addElement('div',['row','forecast','col-12','hide'],null,divRow);
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
            if ((!isNaN(+allGames[game][10]))&&(!isNaN(+allGames[game][11]))&&(!isNaN(forecastScore1))&&(!isNaN(forecastScore2))) {
        //console.log(+allGames[game][10]);
                if ((allGames[game][10]+allGames[game][11]) == (forecastScore1+forecastScore2)) bonus = '15';
                else {
                    if (((allGames[game][10]-allGames[game][11]) == (forecastScore1-forecastScore2))||
                        (((allGames[game][10]-allGames[game][11])>0)&&((forecastScore1-forecastScore2)>0))||
                        (((allGames[game][10]-allGames[game][11])<0)&&((forecastScore1-forecastScore2)<0)))
                        //bonus = 10-Math.abs((+allGames[game][10]+(+allGames[game][11]))-(+forecastScore1+(+forecastScore2)));
                        bonus = 10-(Math.abs(+allGames[game][10]-(+forecastScore1))+Math.abs(+allGames[game][11]-(+forecastScore2)));
                }
            }
    
            if (+bonus) bonus = '+'+bonus; else bonus = '-';
            let divBonus = new addElement('div',['bonus','col-2',forecastPlayer],bonus,divForecast);
            let divPlayer = new addElement('div',['col-8','col-sm-8','col-md-7','col-lg-7','col-xl-7'],namePlayer,divForecast);
            let divScoreForecast = new addElement('div',['scoreForecast','col-2','col-sm-2','col-md-3','col-lg-3','col-xl-3'],null,divForecast);
            let spanScoreForecast1 = new addElement('span',null,forecastScore1,divScoreForecast);
            let spanScoreForecastBlank = new addElement('span',null,':',divScoreForecast);
            let spanScoreForecast2 = new addElement('span',null,forecastScore2,divScoreForecast);
        }
        let divHide = new addElement('div',['hideForecast','hide'],null,divForecast);
    }

}
