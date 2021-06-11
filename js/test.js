function afficherLesAppareilsPhoto(api) {
  let mainIndex = document.querySelector(".block-main__element-photo");
  for (let elem of api) {
    let lien = document.createElement("a");
    lien.classList.add("produits");
    let href = lien.getAttribute("href");
    lien.href = `produits.html?_id=${elem._id}`;
    mainIndex.appendChild(lien);
    //
    let photoIndex = document.createElement("img");
    photoIndex.classList.add("photoIndex");
    let src = photoIndex.getAttribute("src");
    photoIndex.src = elem.imageUrl;
    lien.appendChild(photoIndex);
    //
    let namePrice = document.createElement("p");
    namePrice.classList.add("namePrice");
    namePrice.innerHTML = `${elem.name}  <strong>${
      elem.price / 100
    }</strong> €  `;
    lien.appendChild(namePrice);
  }
}
async function apiOnPageIndex() {
  await fetch("http://localhost:3000/api/cameras")
    .then((apiBrute) => apiBrute.json())
    .then((apiformatJson) => afficherLesAppareilsPhoto(apiformatJson));
}
apiOnPageIndex();
//
//
//
//
//
//
//
//
//
//
function recupererProduit(infoProduit) {
  let mainDeux = document.querySelector(".block-main-produits");
  //
  let divUnPageProduit = document.createElement("div");
  divUnPageProduit.classList.add("divUnPageProduit");
  mainDeux.appendChild(divUnPageProduit);
  //
  let photoProduit = document.createElement("img");
  photoProduit.classList.add("photoProduit");
  let src = photoProduit.getAttribute("src");
  photoProduit.src = infoProduit.imageUrl;
  divUnPageProduit.appendChild(photoProduit);
  //
  let divDeuxPageProduit = document.createElement("div");
  divDeuxPageProduit.classList.add("divDeuxPageProduit");
  mainDeux.appendChild(divDeuxPageProduit);
  //
  let nomProduitDansPageProduit = document.createElement("h2");
  nomProduitDansPageProduit.classList.add("nomProduitDansPageProduit");
  nomProduitDansPageProduit.innerHTML = `${infoProduit.name}`;
  divDeuxPageProduit.appendChild(nomProduitDansPageProduit);
  //
  let prixProduitDansPageProduit = document.createElement("p");
  prixProduitDansPageProduit.classList.add("prixProduitDansPageProduit");
  prixProduitDansPageProduit.innerHTML = ` Prix : <span>${
    infoProduit.price / 100
  } €</span> `;
  divDeuxPageProduit.appendChild(prixProduitDansPageProduit);
  //
  let descriptionProduitDansPageProduit = document.createElement("p");
  descriptionProduitDansPageProduit.classList.add(
    "descriptionProduitDansPageProduit"
  );
  descriptionProduitDansPageProduit.innerHTML = ` Description : ${infoProduit.description} `;
  divDeuxPageProduit.appendChild(descriptionProduitDansPageProduit);

  //
  let selectLentilles = document.createElement("select");
  selectLentilles.classList.add("selectLentilles");
  divDeuxPageProduit.appendChild(selectLentilles);

  let choixOptions = document.createElement("option");
  choixOptions.innerText = "Choix de la lentille";
  selectLentilles.appendChild(choixOptions);

  const lentilles = infoProduit.lenses;

  for (let elem of lentilles) {
    let optionLentilles = document.createElement("option");
    optionLentilles.innerText = elem;
    let value = optionLentilles.getAttribute("value");
    optionLentilles.value = elem;
    selectLentilles.appendChild(optionLentilles);
  }

  let buttonAjouterPanier = document.createElement("button");
  buttonAjouterPanier.classList.add("buttonAjouterPanier");
  buttonAjouterPanier.innerText = `Ajouter au panier`;
  divDeuxPageProduit.appendChild(buttonAjouterPanier);
  //
  //
  //
  localStorage.setItem("panier", JSON.stringify([]));
  //
  buttonAjouterPanier.addEventListener("click", function () {
    let selectElmt = document.querySelector(".selectLentilles");
    let lentillesCustom = selectElmt.options[selectElmt.selectedIndex].value;

    let id = infoProduit.name;
    let lense = lentillesCustom;
    let elem = {
      id,
      lense,
      qty: 1,
    };

    let panierBrut = localStorage.getItem("panier");
    console.log(panierBrut);
    let panier = JSON.parse(panierBrut);
    panier.push(elem);
    localStorage.setItem("panier", JSON.stringify(panier));
  });

  //
}

async function apiOnPageProduct() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const getId = urlParams.get("_id");
  await fetch(`http://localhost:3000/api/cameras/${getId}`)
    .then((transfer) => transfer.json())
    .then((transferJson) => recupererProduit(transferJson));
}
apiOnPageProduct();

function creePanier() {
  let mainTrois = document.querySelector(".block-main-panier");
  let divPanier = document.createElement("div");
  divPanier.classList.add("divPanier");
  let divTotal = document.createElement("div");
  divTotal.classList.add("divTotal");

  mainTrois.appendChild(divPanier);
  mainTrois.appendChild(divTotal);

  let panierBrut = localStorage.getItem("panier");
  let panier = JSON.parse(panierBrut);
  console.log(panierBrut);
  divPanier.innerText = panier;
}

creePanier();
