let infoJS = document.querySelector(".info-js");
//
let queryString = window.location.search.slice(1);
let urlParams = new URLSearchParams(queryString);
//
let order = document.createElement("p");
let getOrderId = urlParams.get("orderId");
order.innerText = `Commande : ${getOrderId}`;
infoJS.appendChild(order);
//
let total = document.createElement("p");
let getTotalPrice = urlParams.get("totalPrice");
total.innerText = `Total de la commande : ${getTotalPrice} €`;
infoJS.appendChild(total);
