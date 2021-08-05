//
//methode qui retourne la balise pour la div de la page panier
let divPanier = document.querySelector(".divPanier");
//
//methode qui retourne la balise pour l'image du produit
let infoImgProduitImagePanier = document.querySelector(
  ".infoImgProduitImagePanier"
);
//methode qui retourne la balise pour le nom du produit
let infoNomProduitImagePanier = document.querySelector(
  ".infoNomProduitImagePanier"
);
//methode qui retourne la balise pour la lentille du produit
let infoLentilleProduitImagePanier = document.querySelector(
  ".infoLentilleProduitImagePanier"
);
//methode qui retourne la balise pour la quantité du produit
let infoQuantiteProduitImagePanier = document.querySelector(
  ".infoQuantiteProduitImagePanier"
);
//methode qui retourne la balise pour le prix du produit
let infoPrixProduitImagePanier = document.querySelector(
  ".infoPrixProduitImagePanier"
);
//methode qui retourne la balise pour la corbeille du produit
let infoTrashProduitImagePanier = document.querySelector(
  ".infoTrashProduitImagePanier"
);
//
let panierBrut = localStorage.getItem("panier");
let panier = JSON.parse(panierBrut);
//
//Créer une boucle pour inserer les elements depuis le loaclStorage dans une div qui contient toutes les informations
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
}

//
//methode qui retourne la balise pour le prix total du panier
let divTotal = document.querySelector(".divTotal");
//
//fonction à 3 argument qui test les champs du formulaire dans le panier
function formField(regex, field, erreur) {
  //
  let regexe = new RegExp(regex);
  let test = regexe.test(field.value); //test la valeur du champs la regex
  let small = field.nextElementSibling;
  //
  if (test) {
    //affiche un message d'erreur ou le supprime en fonction de la validation du champs du formulaire saisie
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

//Evenement qui intégre la fonction de test des champs de formulaire selectionné
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
//regex de chaque champs du formulaire
regexFirstName = new RegExp(/^[a-zA-Z ,.'-]+$/);
regexLastName = new RegExp(/^[a-zA-Z ,.'-]+$/);
regexAddress = new RegExp(
  /(^[0-9]{1,4}) (rue|boulevard|impasse|allée|avenue|chemin|gaffe|impasse|route|quai) [a-zA-Z ]{1,20}/
);
regexCity = new RegExp(/^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$/);
regexEmail = new RegExp(/^[a-zA-Z0-9-.]+@([a-zA-Z0-9]+.)+[a-zA-Z0-9-.]{2,4}$/);
//
//
//Evenement avec une fonction  test la validité du formulaire , et qui envoi ces données à l'api
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
      //Créer un object correspondant au model de l'object de l'api
      contact,
      products,
    };
    const options = {
      method: "POST", //methode utiliser pour la requete vers l'api
      headers: {
        "Content-Type": "application/json", //type et format d'envoi vers l'api
      },
      body: JSON.stringify(update),
    };
    fetch("http://localhost:3000/api/cameras/order", options) //Envoi une requete POST a l'api
      .then((reponse) => reponse.json()) //reucpere la reponse de l'api et la transfore au format json
      .then((reponseJson) => {
        let repOrderID = reponseJson.orderId;
        localStorage.clear();
        document.location.href = `confirmation.html?orderId=${repOrderID}&totalPrice=${total}`; //integre l'order id et le prix total dans les parametres d'url
      })
      .catch(function (e) {
        console.log("Une erreur est survenue : " + e);
      }); //Récupère les erreurs rencontrées et les affiches dans la console
  } else {
    form.style.color = "red"; //Change l'ecriture du formulaire si celui ci est non valide
  }
});
//
//methode qui retourne la balise pour le total du panier
let totalpanier = document.querySelector(".totalpanier");
//
total = 0;
for (let elem of panier) {
  //boucle qui permet la recuperation des prix du panier
  total = total + (elem.price / 100) * elem.qty;
}
totalpanier.innerText = `Total  ${total} €`; //affichage du prix total de tout les produits
//
