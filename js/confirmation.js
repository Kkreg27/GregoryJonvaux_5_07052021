//methode qui retourne la balise pour les informations de la commande
let infoJS = document.querySelector(".info-js");
//
let queryString = window.location.search.slice(1);
let urlParams = new URLSearchParams(queryString); //recuperation des données stocké dasn les parametre d'url
//
let order = document.createElement("p");
let getOrderId = urlParams.get("orderId");
order.innerText = `Commande : ${getOrderId}`; //affichage de lorder id dans la page de confirmation
infoJS.appendChild(order);
//
let total = document.createElement("p");
let getTotalPrice = urlParams.get("totalPrice");
total.innerText = `Total de la commande : ${getTotalPrice} €`; //affichage du prix total dans la page de confirmation
infoJS.appendChild(total);
