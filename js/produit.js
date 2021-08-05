let mainDeux = document.querySelector(".block-main-produits");
//Creation de la division 1 de gauche sur la page produit
let divUnPageProduit = document.querySelector(".divUnPageProduit");
//Creation et integration de la balise image dans la divUN
let photoProduit = document.createElement("img");
photoProduit.classList.add("photoProduit");
let src = photoProduit.getAttribute("src");
divUnPageProduit.appendChild(photoProduit);
//Creation de la division 2 de droite sur la page produit
let divDeuxPageProduit = document.querySelector(".divDeuxPageProduit");
//methode qui retourne la balise pour le nom du produit
let nomProduitDansPageProduit = document.querySelector(
  ".nomProduitDansPageProduit"
);
//methode qui retourne la balise pour le prix du produit
let prixProduitDansPageProduit = document.querySelector(
  ".prixProduitDansPageProduit"
);
//methode qui retourne la balise pour la description du produit
let descriptionProduitDansPageProduit = document.querySelector(
  ".descriptionProduitDansPageProduit"
);
//methode qui retourne la balise select pour les lentilles du produit
let selectLentilles = document.querySelector(".selectLentilles");
//methode qui retourne la balise pour les lentilles du produit
let choixOptions = document.querySelector(".choixOptions");
//methode qui retourne la balise pour le bouton ajouter au panier
let buttonAjouterPanier = document.querySelector(".buttonAjouterPanier");
//
//
//Création du panier dans le localStorage
if (!localStorage.getItem("panier")) {
  localStorage.setItem("panier", JSON.stringify([]));
}

//Fonction qui integre les elements fourni par l'argument , dans la page produit
function recupererProduit(infoProduit) {
  photoProduit.src = infoProduit.imageUrl;
  nomProduitDansPageProduit.innerHTML = `${infoProduit.name}`;
  prixProduitDansPageProduit.innerHTML = `Prix : <span>${
    infoProduit.price / 100
  } €</span> `;
  descriptionProduitDansPageProduit.innerHTML = ` Description : ${infoProduit.description} `;
  let lentilles = infoProduit.lenses;
  for (let elem of lentilles) {
    //boucle qui integre les lentilles dans les otpions de la balise select
    let optionLentilles = document.createElement("option");
    optionLentilles.innerText = elem;
    let value = optionLentilles.getAttribute("value");
    optionLentilles.value = elem;
    selectLentilles.appendChild(optionLentilles);
  }
  //
  //Evenement en attente d'excuter la fonction , suite a un clic sur la balise buttonAjouterPanier
  buttonAjouterPanier.addEventListener("click", function () {
    //
    let lentillesCustom =
      selectLentilles.options[selectLentilles.selectedIndex].value; //selectionne la lentille cliqué
    //
    let name = infoProduit.name;
    let lense = lentillesCustom;
    let price = infoProduit.price;
    let id = infoProduit._id;
    let imageUrl = infoProduit.imageUrl;
    let qty = 1;
    let newElem = {
      //créer un objet newElem comprenant: le nom, la lentille, son prix ,url de l'img , sa quantité , et son identifiant,
      name,
      lense,
      price,
      imageUrl,
      qty,
      id,
    };
    //
    let panierBrut = localStorage.getItem("panier"); //recupere le panier dans le localStorage
    let panier = JSON.parse(panierBrut); //Formate le panier en format JSON
    //
    //
    if (panier.length === 0) {
      //si panier vide alors ajouter newElem
      panier.push(newElem);
      localStorage.setItem("panier", JSON.stringify(panier)); //Actualisation du localStorage
    } else {
      if (
        //condition pour savoir si les produits existe ou non dans le panier
        estDansLePanier(panier, newElem.name, "name") &&
        estDansLePanier(panier, newElem.lense, "lense")
      ) {
        for (let elem of panier) {
          if (elem.lense === lense) {
            elem.qty++; //ajout d'une quantité +1 car produit existe deja
          }
        }
        localStorage.setItem("panier", JSON.stringify(panier)); //Actualisation du localStorage
      } else {
        panier.push(newElem);
        localStorage.setItem("panier", JSON.stringify(panier)); //Actualisation du localStorage
      }
    }
  });
}
function estDansLePanier(array, valueToDetect, category) {
  //fonction qui boucle les elements d'un tableau depuis une valeur precise afin de les comparer
  for (let elem of array) {
    if (elem[category] === valueToDetect) {
      return true;
    }
  }
  return false;
}

//Créer une fonction asynchrone qui va permettre le deroulement simultenement des taches
async function apiOnPageProduct() {
  //async retourne une promesse
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString); //Créer une variable qui recupere les parametres d'url
  const getId = urlParams.get("_id");
  await fetch(`http://localhost:3000/api/cameras/${getId}`) //Envoi une requete (vers l'exterieur) l'url http://localhost:3000/api/cameras + l'id intégrer pour preciser un seul produit à l'api
    .then((transfer) => transfer.json()) //Transforme les données brut du body repondu par l'api en JSON
    .then((transferJson) => recupererProduit(transferJson)) //Ajoute les données JSON en argument de la fonction
    .catch(function (e) {
      console.log("Une erreur est survenue : " + e);
    }); //Récupère les erreurs rencontrées et les affiches dans la console
}
apiOnPageProduct(); //Appel la fonction
