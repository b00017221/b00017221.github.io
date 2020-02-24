allGames={
    match25:['group-a-bgc','21/06/2020','Олимпико - Рим','19:00','Италия','icons/ITA.png','ita','icons/WAL.png','wal','Уэльс','???','???'],
    match26:['group-a-bgc','21/06/2020','Олимпийский - Баку','22:00','Швейцария','icons/SUI.png','sui','icons/TUR.png','tur','Турция','???','???'],
    match27:['group-c-bgc','22/06/2020','Арена Националэ - Бухарест','19:00','Украина','icons/UKR.png','ukr','icons/AUT.png','aut','Австрия','???','???'],
    match28:['group-c-bgc','22/06/2020','Й.Кройфф Арена - Амстердам','19:00','Победитель D(A)','icons/none.png','none','icons/NED.png','ned','Нидерланды','???','???'],
    match29:['group-b-bgc','22/06/2020','С.Петербург - С.Петербург','22:00','Финляндия','icons/FIN.png','fin','icons/BEL.png','bel','Бельгия','???','???'],
    match30:['group-b-bgc','22/06/2020','Паркен - Копенгаген','22:00','Россия','icons/RUS.png','rus','icons/DEN.png','den','Дания','???','???']
};

for (item in allGames) {
    console.log(allGames[item]);
    let containerGames=document.querySelectorAll('.games .container')[0];
    let divRow=document.createElement('div');
    divRow.classList.add('row',allGames[item][0],item);
    divRow=containerGames.appendChild(divRow);
    let divPlaceGame=document.createElement('div');
    divPlaceGame.classList.add('placegame','col-9','col-sm-9','col-md-2','col-lg-2','col-xl-2');
    divPlaceGame=divRow.appendChild(divPlaceGame);
    let spanDate=document.createElement('span');
    let spanPlace=document.createElement('span');
    spanDate.innerHTML=allGames[item][1];
    spanPlace.innerHTML=allGames[item][2];
    divPlaceGame.appendChild(spanDate);
    divPlaceGame.appendChild(spanPlace);
    let divTime=document.createElement('div');
    divTime.classList.add('timegame','col-3','col-sm-3','col-md-1','col-lg-1','col-xl-1');
    divTime.innerHTML=allGames[item][3];
    divRow.appendChild(divTime);
    let divTeam1=document.createElement('div');
    divTeam1.classList.add('team1','col-4','col-sm-4','col-md-2','col-lg-2','col-xl-2');
    divTeam1=divRow.appendChild(divTeam1);
    let spanTeam1=document.createElement('span');
    spanTeam1.innerHTML=allGames[item][4];
    divTeam1.appendChild(spanTeam1);
    let imgTeam1=document.createElement('img');
    imgTeam1.setAttribute('src',allGames[item][5]);
    imgTeam1.setAttribute('alt',allGames[item][6]);
    imgTeam1.classList.add('flag');
    divTeam1.appendChild(imgTeam1);
    let divBlank=document.createElement('div');
    divBlank.innerHTML='--';
    divBlank.classList.add('blank','col-1');
    divRow.appendChild(divBlank);
    let divTeam2=document.createElement('div');
    divTeam2.classList.add('team2','col-4','col-sm-4','col-md-2','col-lg-2','col-xl-2');
    divTeam2=divRow.appendChild(divTeam2);
    let imgTeam2=document.createElement('img');
    imgTeam2.setAttribute('src',allGames[item][7]);
    imgTeam2.setAttribute('alt',allGames[item][8]);
    imgTeam2.classList.add('flag');
    divTeam2.appendChild(imgTeam2);
    let spanTeam2=document.createElement('span');
    spanTeam2.innerHTML=allGames[item][9];
    divTeam2.appendChild(spanTeam2);
    let divScore1=document.createElement('div');
    divScore1.classList.add('score1','col-1');
    divScore1.innerHTML=allGames[item][10];
    divRow.appendChild(divScore1);
    let divBlank2=document.createElement('div');
    divBlank2.classList.add('blank','col-1');
    divBlank2.innerHTML=':';
    divRow.appendChild(divBlank2);
    let divScore2=document.createElement('div');
    divScore2.classList.add('score2','col-1');
    divScore2.innerHTML=allGames[item][11];
    divRow.appendChild(divScore2);
    let divBtn=document.createElement('div');
    divBtn.classList.add('btns','col-1');
    divBtn=divRow.appendChild(divBtn);
    let btns=document.createElement('button');
    btns.classList.add('btn','btn-outline-light');
    btns.setAttribute('type','button');
    btns.innerHTML='Прогноз';
    divBtn.appendChild(btns);
}







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
        })
    })
})

function createBlockGames(games) {
    let containerGames=document.querySelectorAll('.games .container')[0];
    let divRow=document.createElement('div');
    divRow.classList.add('row','group-a-bgc','match25');
    containerGames.appendChild(divRow);
    let divPlaceGame=document.createElement('div');
    divPlaceGame.classList.add('placegame','col-9','col-sm-9','col-md-2','col-lg-2','col-xl-2');

}