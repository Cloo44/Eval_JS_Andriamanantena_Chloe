const usersHuman = [{
        type: "humain",
        name: "John Doe",
        email: "j.smith@gmail.com",
        age: 25,
        avatar : '../img/john.png',
        icon : './img/john_icon.png',
        latitude : 43.604429,
        longitude : 1.443812
    },
    {
        type: "humain",
        name: "Jane Smith",
        email: "ja.doe@sfr.fr",
        age: 5,
        avatar : './img/jane.png',
        icon : './img/jane_icon.png',
        latitude : 43.60792, 
        longitude : 1.44133
    },
    {
        type: "humain",
        name: "Le Vénérable",
        email: "levy@gmail.com",
        age: 500,
        avatar : './img/venerable.png',
        icon : './img/venerable_icon.png',
        latitude : 43.60053,
        longitude : 1.44590
    }
];

const usersPet = [{
        type: "animal de compagnie",
        espece: "chien",
        name: "Rox",
        age: 7,
        propriétaire: "John Doe",
        avatar : './img/chien.png',
        icon : './img/chien_icon.png',
        latitude : 43.60377,
        longitude : 1.43583
    },
    {
        type: "animal de compagnie",
        espece: "renard",
        name: "Roukie",
        age: 300,
        propriétaire: "Le Vénérable",
        avatar : './img/renard.jpg',
        icon : './img/renard_icon.png',
        latitude : 43.59602,
        longitude : 1.43692
    }
];

const usersXeno = [{
        type: "Xeno",
        espece: "Krogan",
        name: "Wrex",
        menace: "Rouge",
        age: 45,
        avatar : './img/wrex.png',
        icon : './img/wrex_icon.png',
        latitude : 43.59555,
        longitude : 1.45257
    },
    {
        type: "Xeno",
        espece: "Turien",
        name: "Garrus",
        menace: "Vert",
        age: 35,
        avatar : './img/garrus.png',
        icon : './img/garrus_icon.png',
        latitude : 43.61108,
        longitude : 1.45539
    },
    {
        type: "Xeno",
        espece: "Asari",
        name: "Liara",
        menace: "ULTRA Rouge",
        age: 25,
        avatar : './img/liara.png',
        icon : './img/liara_icon.png',
        latitude : 43.61183,
        longitude :  1.43222
    }
];

const tabData = [];

tabData.push(usersHuman);
tabData.push(usersPet);
tabData.push(usersXeno);

console.log(tabData);

// Les fonctions "card" fonctionnent bien:
console.log(cardHuman(usersHuman[0]));
console.log(cardHuman(tabData[0][0]));
console.log(cardPet(usersPet[0]));
console.log(cardPet(tabData[1][0]));
console.log(cardXeno(usersXeno[0]));
console.log(cardXeno(tabData[2][0]));

function cardHuman(object) {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    h2.innerText = object.name;
    const img = document.createElement('img');
    img.src = object.avatar;
    img.alt = `Portrait de ${object.name}`;
    const p = document.createElement('p');
    p.innerText = `${object.age} ans, ${object.email}`;
    article.appendChild(h2);
    article.appendChild(img);
    article.appendChild(p);
    article.classList.add("card");

    return article;
}

function cardPet(object) {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    h2.innerText = object.name;
    const img = document.createElement('img');
    img.src = object.avatar;
    img.alt = `Portrait de ${object.name}`;
    const p = document.createElement('p');
    p.innerText = `${object.age} ans, ${object.espece}, appartient à ${object.propriétaire}`;
    article.appendChild(h2);
    article.appendChild(img);
    article.appendChild(p);
    article.classList.add("card");

    return article;
}

function cardXeno(object) {
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    h2.innerText = object.name;
    const img = document.createElement('img');
    img.src = object.avatar;
    img.alt = `Portrait de ${object.name}`;
    const p = document.createElement('p');
    p.innerText = `${object.age} ans, ${object.espece}, Niveau de menace: ${object.menace}`;
    article.appendChild(h2);
    article.appendChild(img);
    article.appendChild(p);
    article.classList.add("card");

    return article;
}



function profil(tabObject) {    
    const cardList = [];
    tabObject.map((object) => {
        if(object.type == "humain") {
            let result = cardHuman(object);
            cardList.push(result);
        } else if(object.type == "animal de compagnie") {
            let result = cardPet(object);
            cardList.push(result);
        } else if(object.type == "Xeno") {
            let result = cardXeno(object);
            cardList.push(result);
        } else {
            console.error("Type de profil non existant");
        }
    })
    return cardList;
};

// Test de la fonction profil() en console :
console.log(profil(usersHuman));
console.log(profil(usersPet));
console.log(profil(usersXeno));
// ça fonctionne

// Affichage des cardList sur la page :
// const profils = document.body.querySelector('.profils');

// const profilsHuman = document.createElement('div');
// profilsHuman.innerHTML = profil(usersHuman)[0].childNodes;

// profils.appendChild(profilsHuman);
// // profils.append(profil(usersPet));
// // profils.append(profil(usersXeno));
// // ça n'affiche que du texte...

function profilAll(bigTab) {
    const profils = document.body.querySelector('.profils');

    for (let i=0 ; i < bigTab.length ; i++) {
        const cardTab = profil(bigTab[i]);
        console.log(cardTab);
        for (let j=0 ; j < cardTab.length ; j++) {
            profils.append(cardTab);
        }
    }
}

profilAll(tabData);
// ça n'affiche toujours que du texte : [object HTMLElement]...


/*********************
 * LEAFLET
*********************/

const map = L.map('map').setView([43.604429, 1.443812], 14);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function markerProfil(objectProfil) {
    const icon = L.icon({
        iconUrl: objectProfil.icon,
        iconSize: [50, 83],
        iconAnchor: [25,83]
    });

    const marker = L.marker([objectProfil.latitude, objectProfil.longitude], {icon:icon}).addTo(map);
};

markerProfil(tabData[0][0]);

// Pour finir (mais pas le temps) : faire une boucle pour appliquer markerProfil() à chacun des objets !