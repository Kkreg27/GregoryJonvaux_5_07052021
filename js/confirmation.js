let queryString = window.location.search.slice(1);
const urlParams = new URLSearchParams(queryString);
const getOrderId = urlParams.get("orderId");
const getTotalPrice = urlParams.get("totalPrice");
console.log(queryString);
console.log(getOrderId);
console.log(getTotalPrice);

let infoJS = document.querySelector(".info-js");
let order = document.createElement("p");
order.innerText = `Commande : ${getOrderId}`;
infoJS.appendChild(order);

let total = document.createElement("p");
total.innerText = `Total de la commande : ${getTotalPrice} €`;
infoJS.appendChild(total);
