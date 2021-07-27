//*******************************************************************************************************/
let mainDeux = document.querySelector(".block-main-produits");
//
let divUnPageProduit = document.querySelector(".divUnPageProduit");
//
let photoProduit = document.createElement("img");
photoProduit.classList.add("photoProduit");
let src = photoProduit.getAttribute("src");
divUnPageProduit.appendChild(photoProduit);
//
let divDeuxPageProduit = document.querySelector(".divDeuxPageProduit");
//
let nomProduitDansPageProduit = document.querySelector(
  ".nomProduitDansPageProduit"
);
//
let prixProduitDansPageProduit = document.querySelector(
  ".prixProduitDansPageProduit"
);
//
let descriptionProduitDansPageProduit = document.querySelector(
  ".descriptionProduitDansPageProduit"
);
//
let selectLentilles = document.querySelector(".selectLentilles");
//
let choixOptions = document.querySelector(".choixOptions");
//
let buttonAjouterPanier = document.querySelector(".buttonAjouterPanier");
//
if (!localStorage.getItem("panier")) {
  localStorage.setItem("panier", JSON.stringify([]));
}
//************************************************************************************************************/
function recupererProduit(infoProduit) {
  photoProduit.src = infoProduit.imageUrl;
  nomProduitDansPageProduit.innerHTML = `${infoProduit.name}`;
  prixProduitDansPageProduit.innerHTML = `Prix : <span>${
    infoProduit.price / 100
  } €</span> `;
  descriptionProduitDansPageProduit.innerHTML = ` Description : ${infoProduit.description} `;
  let lentilles = infoProduit.lenses;
  for (let elem of lentilles) {
    let optionLentilles = document.createElement("option");
    optionLentilles.innerText = elem;
    let value = optionLentilles.getAttribute("value");
    optionLentilles.value = elem;
    selectLentilles.appendChild(optionLentilles);
  }
  buttonAjouterPanier.addEventListener("click", function () {
    //
    let lentillesCustom =
      selectLentilles.options[selectLentilles.selectedIndex].value;
    //
    let name = infoProduit.name;
    let lense = lentillesCustom;
    let price = infoProduit.price;
    let id = infoProduit._id;
    let imageUrl = infoProduit.imageUrl;
    let qty = 1;
    let newElem = {
      name,
      lense,
      price,
      imageUrl,
      qty,
      id,
    };
    //
    let panierBrut = localStorage.getItem("panier");
    let panier = JSON.parse(panierBrut);
    if (panier.length === 0) {
      panier.push(newElem);
      localStorage.setItem("panier", JSON.stringify(panier));
    } else {
      if (
        estDansLePanier(panier, newElem.name, "name") &&
        estDansLePanier(panier, newElem.lense, "lense")
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
function estDansLePanier(array, valueToDetect, category) {
  for (let elem of array) {
    if (elem[category] === valueToDetect) {
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
