//****************************************Div*Panier********************************************************* */
//
let divPanier = document.querySelector(".divPanier");
//
let infoProduitImagePanier = document.querySelector(".infoProduitImagePanier");
//
let infoImgProduitImagePanier = document.querySelector(
  ".infoImgProduitImagePanier"
);
//
let infoNomProduitImagePanier = document.querySelector(
  ".infoNomProduitImagePanier"
);
//
let infoLentilleProduitImagePanier = document.querySelector(
  ".infoLentilleProduitImagePanier"
);
//
let infoQuantiteProduitImagePanier = document.querySelector(
  ".infoQuantiteProduitImagePanier"
);
//
let infoPrixProduitImagePanier = document.querySelector(
  ".infoPrixProduitImagePanier"
);
//
let infoTrashProduitImagePanier = document.querySelector(
  ".infoTrashProduitImagePanier"
);
//
let panierBrut = localStorage.getItem("panier");
let panier = JSON.parse(panierBrut);
//
for (let elem of panier) {
  let blocProduitPanier = document.createElement("div");
  blocProduitPanier.classList.add("blocProduitPanier");
  divPanier.appendChild(blocProduitPanier);

  let photoProduitPanier = document.createElement("img");
  photoProduitPanier.classList.add("photoProduitPanier");
  let src = photoProduitPanier.getAttribute("src");
  photoProduitPanier.src = elem.imageUrl;
  blocProduitPanier.appendChild(photoProduitPanier);

  let nomProduitPanier = document.createElement("p");
  nomProduitPanier.classList.add("nomProduitPanier");
  nomProduitPanier.innerText = elem.name;
  blocProduitPanier.appendChild(nomProduitPanier);

  let optionProduitPanier = document.createElement("p");
  optionProduitPanier.classList.add("optionProduitPanier");
  optionProduitPanier.innerText = elem.lense;
  blocProduitPanier.appendChild(optionProduitPanier);

  let quantiteProduitPanier = document.createElement("p");
  quantiteProduitPanier.classList.add("quantiteProduitPanier");
  quantiteProduitPanier.innerText = elem.qty;
  blocProduitPanier.appendChild(quantiteProduitPanier);

  let prixProduitPanier = document.createElement("p");
  prixProduitPanier.classList.add("prixProduitPanier");
  prixProduitPanier.innerText = `${elem.price / 100} €`;
  blocProduitPanier.appendChild(prixProduitPanier);

  let corbeilleProduitPanier = document.createElement("button");
  corbeilleProduitPanier.classList.add("corbeilleProduitPanier");
  corbeilleProduitPanier.innerHTML = `<i class="far fa-trash-alt"></i>`;
  blocProduitPanier.appendChild(corbeilleProduitPanier);
}
//*******************************************Div*Formulaire*************************************************** */
//
let divTotal = document.querySelector(".divTotal");
//
function formField(regex, field, erreur) {
  //
  let regexe = new RegExp(regex);
  let test = regexe.test(field.value);
  let small = field.nextElementSibling;
  //
  if (test) {
    small.innerHTML = "";
    small.classList.remove("test-danger");
    field.classList.remove("form-danger");
  } else {
    small.innerHTML = `${erreur} indiqué non valide`;
    small.classList.add("test-danger");
    field.classList.add("form-danger");
  }
}
//
let form = document.querySelector(".formulaire");
let firstName = form.firstName;
let lastName = form.lastName;
let address = form.address;
let city = form.city;
let email = form.email;
//
firstName.addEventListener("change", function () {
  formField("^[a-zA-Z ,.'-]+$", firstName, "Nom");
});
//
lastName.addEventListener("change", function () {
  formField("^[a-zA-Z ,.'-]+$", lastName, "Prénom");
});
//
address.addEventListener("change", function () {
  formField(
    "(^[0-9]{1,4}) (rue|boulevard|impasse|allée|avenue|chemin|gaffe|impasse|route|quai) [a-zA-Z ]{1,20}",
    address,
    "Adresse"
  );
});
//
city.addEventListener("change", function () {
  formField("^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$", city, "Ville");
});
//
email.addEventListener("change", function () {
  formField(
    "^[a-zA-Z0-9-.]+@([a-zA-Z0-9]+.)+[a-zA-Z0-9-.]{2,4}$",
    email,
    "Email"
  );
});
//
//
regexFirstName = new RegExp(/^[a-zA-Z ,.'-]+$/);
regexLastName = new RegExp(/^[a-zA-Z ,.'-]+$/);
regexAddress = new RegExp(
  /(^[0-9]{1,4}) (rue|boulevard|impasse|allée|avenue|chemin|gaffe|impasse|route|quai) [a-zA-Z ]{1,20}/
);
regexCity = new RegExp(/^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$/);
regexEmail = new RegExp(/^[a-zA-Z0-9-.]+@([a-zA-Z0-9]+.)+[a-zA-Z0-9-.]{2,4}$/);
//
//
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    regexFirstName.test(firstName.value) &&
    regexLastName.test(lastName.value) &&
    regexAddress.test(address.value) &&
    regexCity.test(city.value) &&
    regexEmail.test(email.value)
  ) {
    let contact = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      address: form.address.value,
      city: form.city.value,
      email: form.email.value,
    };
    let products = [];
    let panierBrut = localStorage.getItem("panier");
    let panier = JSON.parse(panierBrut);
    for (let elem of panier) {
      products.push(elem.id);
    }
    let update = {
      contact,
      products,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    };
    fetch("http://localhost:3000/api/cameras/order", options)
      .then((reponse) => reponse.json())
      .then((reponseJson) => {
        let repOrderID = reponseJson.orderId;
        localStorage.clear();
        document.location.href = `confirmation.html?orderId=${repOrderID}&totalPrice=${total}`;
      });
  } else {
    form.style.color = "red";
  }
});
//
let totalpanier = document.querySelector(".totalpanier");
//
total = 0;
for (let elem of panier) {
  total = total + (elem.price / 100) * elem.qty;
}
totalpanier.innerText = `Total  ${total} €`;
//
