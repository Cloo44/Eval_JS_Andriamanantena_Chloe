//Le fichier JS pour la partie Météo

const cardMeteo = document.querySelector('.cardMeteo');
const charger = document.querySelector('button');

const info = document.createElement('div');
info.style.height = '300px';
info.style.width = '200px';
info.style.margin = '16px 0px';
info.style.border = '3px solid grey';
info.style.padding = "16px 12px 24px 12px";

charger.parentNode.insertBefore(info,charger);



function bouton() {
    charger.classList.add("bouton__cardMeteo");
};

charger.addEventListener("mousedown", ()=> {
    charger.style.backgroundColor = "orange";
});

document.body.addEventListener("mouseup", ()=> {
    charger.style.backgroundColor = "";
});

function addInfo() {
    info.innerText = `Condition actuelle : ${condition}

    Température actuelle : ${temp}

    Température maximum : ${tempMax}

    Température minimum : ${tempMin}`;
};

async function fetchMeteo() {
    const data = await fetch('https://prevision-meteo.ch/services/json/toulouse');
    console.log(data);
    const resultJson = await data.json();
    console.log(resultJson);

    condition = resultJson.current_condition.condition;
    temp = resultJson.current_condition.tmp;
    tempMax = resultJson.fcst_day_0.tmax;
    tempMin = resultJson.fcst_day_0.tmin;

    console.log(condition);
    console.log(temp);
    console.log(tempMax);
    console.log(tempMin);

    addInfo();
}

charger.addEventListener("click", ()=>{
    fetchMeteo();
    bouton();
});