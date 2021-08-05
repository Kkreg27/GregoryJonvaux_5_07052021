let mainIndex = document.querySelector(".block-main__element-photo"); //Permet de se fixer à une noeud du DOM de la page index.html

//
function afficherLesAppareilsPhoto(api) {
  //Boucle l'argument pour créer des elements dans l'index html
  for (let elem of api) {
    let lien = document.createElement("a"); //Créer un lien clicable
    lien.classList.add("produits");
    let href = lien.getAttribute("href");
    lien.href = `produits.html?_id=${elem._id}`; //Transfere l'id du produit dans les parametres URL du lien href
    mainIndex.appendChild(lien);

    let photoIndex = document.createElement("img");
    photoIndex.classList.add("photoIndex");
    let src = photoIndex.getAttribute("src"); //Ajoute l'attribut src à l'image
    photoIndex.src = elem.imageUrl; //Integre la valeur à l'attribut src pour afficher l'image
    lien.appendChild(photoIndex);

    let namePrice = document.createElement("p");
    namePrice.classList.add("namePrice");
    namePrice.innerHTML = `${elem.name}  <strong>${
      elem.price / 100
    }</strong> €  `; //Récupere l'élément price et l'élément name afin de les afficher
    lien.appendChild(namePrice);
  }
}
//
//Créer une fonction asynchrone qui va permettre le deroulement simultenement des taches
async function apiOnPageIndex() {
  //async retourne une promesse
  await fetch("http://localhost:3000/api/cameras") //Envoi une requete (vers l'exterieur) l'url http://localhost:3000/api/cameras
    .then((apiBrute) => apiBrute.json()) //Transforme les données brut du body repondu par l'api en JSON
    .then((apiformatJson) => afficherLesAppareilsPhoto(apiformatJson)) //Ajoute les données JSON en argument de la fonction
    .catch(function (e) {
      console.log("Une erreur est survenue : " + e);
    }); //Récupère les erreurs rencontrées et les affiches dans la console
}
apiOnPageIndex();
