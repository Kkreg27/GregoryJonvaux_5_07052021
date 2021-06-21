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

  let lentilles = infoProduit.lenses;

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

    let panierBrut = localStorage.getItem("panier");
    let panier = JSON.parse(panierBrut);

    let name = infoProduit.name;
    let lense = lentillesCustom;
    let price = infoProduit.price;
    let imageUrl = infoProduit.imageUrl;
    let qty = 1;

    let newElem = {
      name,
      lense,
      price,
      imageUrl,
      qty,
    };

    let test =
      nameEstDansLePanier(panier, newElem.name) &&
      lenseEstDansLePanier(panier, newElem.lense);

    if (panier.length === 0) {
      panier.push(newElem);
      localStorage.setItem("panier", JSON.stringify(panier));
    } else {
      if (
        nameEstDansLePanier(panier, newElem.name) &&
        lenseEstDansLePanier(panier, newElem.lense)
      ) {
        for (let elem of panier) {
          if (elem.lense === lense) {
            elem.qty++;
          }
        }
        localStorage.setItem("panier", JSON.stringify(panier));
      } else {
        panier.push(newElem);
        localStorage.setItem("panier", JSON.stringify(panier));
      }
    }
  });
}

function nameEstDansLePanier(array, valueToDetect) {
  for (let elem of array) {
    if (elem.name === valueToDetect) {
      return true;
    }
  }
  return false;
}
function lenseEstDansLePanier(array, valueToDetect) {
  for (let elem of array) {
    if (elem.lense === valueToDetect) {
      return true;
    }
  }
  return false;
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
