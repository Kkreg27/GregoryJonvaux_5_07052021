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
  if (!localStorage.getItem("panier")) {
    localStorage.setItem("panier", JSON.stringify([]));
  }
  //
  buttonAjouterPanier.addEventListener("click", function () {
    let selectElmt = document.querySelector(".selectLentilles");
    let lentillesCustom = selectElmt.options[selectElmt.selectedIndex].value;

    let id = infoProduit._id;
    let name = infoProduit.name;
    let lense = lentillesCustom;
    let price = infoProduit.price;
    let imageUrl = infoProduit.imageUrl;

    let panierBrut = localStorage.getItem("panier");

    let panier = JSON.parse(panierBrut);

    let newElem = {
      id,
      name,
      lense,
      price,
      imageUrl,
      qty: 1,
    };

    panier.push(newElem);
    localStorage.setItem("panier", JSON.stringify(panier));
    console.log(panier);
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
  console.log(panier);

  let infoProduitImagePanier = document.createElement("div");
  infoProduitImagePanier.classList.add("infoProduitImagePanier");
  divPanier.appendChild(infoProduitImagePanier);

  let infoImgProduitImagePanier = document.createElement("p");
  infoImgProduitImagePanier.classList.add("infoImgProduitImagePanier");

  infoProduitImagePanier.appendChild(infoImgProduitImagePanier);

  let infoNomProduitImagePanier = document.createElement("p");
  infoNomProduitImagePanier.classList.add("infoNomProduitImagePanier");
  infoNomProduitImagePanier.innerText = "Appareil";
  infoProduitImagePanier.appendChild(infoNomProduitImagePanier);

  let infoLentilleProduitImagePanier = document.createElement("p");
  infoLentilleProduitImagePanier.classList.add(
    "infoLentilleProduitImagePanier"
  );
  infoLentilleProduitImagePanier.innerText = "Lentilles";
  infoProduitImagePanier.appendChild(infoLentilleProduitImagePanier);

  let infoQuantiteProduitImagePanier = document.createElement("p");
  infoQuantiteProduitImagePanier.classList.add(
    "infoQuantiteProduitImagePanier"
  );
  infoQuantiteProduitImagePanier.innerText = "Quantité";
  infoProduitImagePanier.appendChild(infoQuantiteProduitImagePanier);

  let infoPrixProduitImagePanier = document.createElement("p");
  infoPrixProduitImagePanier.classList.add("infoPrixProduitImagePanier");
  infoPrixProduitImagePanier.innerText = "Prix";
  infoProduitImagePanier.appendChild(infoPrixProduitImagePanier);

  let infoTrashProduitImagePanier = document.createElement("p");
  infoTrashProduitImagePanier.classList.add("infoTrashProduitImagePanier");

  infoProduitImagePanier.appendChild(infoTrashProduitImagePanier);

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

  let totalProduit = document.createElement("p");
  totalProduit.classList.add("totalProduit");
  totalProduit.innerText = "total";
  divTotal.appendChild(totalProduit);
}

creePanier();
