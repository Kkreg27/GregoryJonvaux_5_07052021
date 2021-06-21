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
