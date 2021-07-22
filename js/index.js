let mainIndex = document.querySelector(".block-main__element-photo");
//
function afficherLesAppareilsPhoto(api) {
  for (let elem of api) {
    let lien = document.createElement("a");
    lien.classList.add("produits");
    let href = lien.getAttribute("href");
    lien.href = `produits.html?_id=${elem._id}`;
    mainIndex.appendChild(lien);

    let photoIndex = document.createElement("img");
    photoIndex.classList.add("photoIndex");
    let src = photoIndex.getAttribute("src");
    photoIndex.src = elem.imageUrl;
    lien.appendChild(photoIndex);

    let namePrice = document.createElement("p");
    namePrice.classList.add("namePrice");
    namePrice.innerHTML = `${elem.name}  <strong>${
      elem.price / 100
    }</strong> €  `;
    lien.appendChild(namePrice);
  }
}
//*Fonction qui permet l'affichage de données
async function apiOnPageIndex() {
  await fetch("http://localhost:3000/api/cameras")
    .then((apiBrute) => apiBrute.json())
    .then((apiformatJson) => afficherLesAppareilsPhoto(apiformatJson));
}
apiOnPageIndex();
//*Recupere les données de l'API
//* Applique une fonction aux données recuperer
