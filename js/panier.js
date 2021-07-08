function creePanier() {
  let mainTrois = document.querySelector(".block-main-panier");
  let divPanier = document.querySelector(".divPanier");

  let divTotal = document.querySelector(".divTotal");

  let panierBrut = localStorage.getItem("panier");
  let panier = JSON.parse(panierBrut);
  function pan() {
    return panier;
  }
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

  let totalProduit = document.createElement("div");
  totalProduit.classList.add("totalProduit");
  divTotal.appendChild(totalProduit);

  let totalpanier = document.createElement("p");
  totalpanier.classList.add("totalpanier");
  total = 0;
  for (let elem of panier) {
    total = total + (elem.price / 100) * elem.qty;
  }
  totalpanier.innerText = `Total  ${total} €`;
  totalProduit.appendChild(totalpanier);

  let form = document.querySelector(".formulaire");
  //
  //
  //
  //
  //
  form.firstName.addEventListener("change", function () {
    validNom(this);
  });
  let validNom = function (inputNom) {
    let nomRegex = new RegExp("^[a-zA-Z ,.'-]+$");

    let testNom = nomRegex.test(inputNom.value);
    let smallNom = inputNom.nextElementSibling;

    if (testNom) {
      smallNom.innerHTML = "";
      smallNom.classList.remove("test-danger");
      form.firstName.classList.remove("form-danger");
      return true;
    } else {
      smallNom.innerHTML = "Le Nom n'est pas valide";
      smallNom.classList.add("test-danger");
      form.firstName.classList.add("form-danger");
      return false;
    }
  };

  //
  form.lastName.addEventListener("change", function () {
    validPrenom(this);
  });
  let validPrenom = function (inputPrenom) {
    let prenomRegex = new RegExp("^[a-zA-Z ,.'-]+$");

    let testPrenom = prenomRegex.test(inputPrenom.value);
    let smallPrenom = inputPrenom.nextElementSibling;

    if (testPrenom) {
      smallPrenom.innerHTML = "";
      smallPrenom.classList.remove("test-danger");
      form.lastName.classList.remove("form-danger");
      return true;
    } else {
      smallPrenom.innerHTML = "Le Prenom n'est pas valide";
      smallPrenom.classList.add("test-danger");
      form.lastName.classList.add("form-danger");
      return false;
    }
  };
  //
  form.address.addEventListener("change", function () {
    validAdresse(this);
  });
  let validAdresse = function (inputAdresse) {
    let adresseRegex = new RegExp(
      "(^[0-9]{1,4}) (rue|boulevard|impasse|allée|avenue|chemin|gaffe|impasse|route|quai) [a-zA-Z ]{1,20}"
    );

    let testAdresse = adresseRegex.test(inputAdresse.value);
    let smallAdresse = inputAdresse.nextElementSibling;

    if (testAdresse) {
      smallAdresse.innerHTML = "";
      smallAdresse.classList.remove("test-danger");
      form.address.classList.remove("form-danger");
      return true;
    } else {
      smallAdresse.innerHTML = "L'adresse n'est pas valide";
      smallAdresse.classList.add("test-danger");
      form.address.classList.add("form-danger");
      return false;
    }
  };
  //
  form.city.addEventListener("change", function () {
    validVille(this);
  });
  let validVille = function (inputVille) {
    let villeRegex = new RegExp("^[a-zA-Z]+(?:[s-][a-zA-Z]+)*$");

    let testVille = villeRegex.test(inputVille.value);
    let smallVille = inputVille.nextElementSibling;

    if (testVille) {
      smallVille.innerHTML = "";
      smallVille.classList.remove("test-danger");
      form.city.classList.remove("form-danger");
      return true;
    } else {
      smallVille.innerHTML = "La ville indiqué n'est pas valide";
      smallVille.classList.add("test-danger");
      form.city.classList.add("form-danger");
      return false;
    }
  };
  //

  form.email.addEventListener("change", function () {
    validEmail(this);
  });
  let validEmail = function (inputEmail) {
    let emailRegex = new RegExp(
      "^[a-zA-Z0-9-.]+@([a-zA-Z0-9]+.)+[a-zA-Z0-9-.]{2,4}$"
    );

    let testEmail = emailRegex.test(inputEmail.value);
    let smallEmail = inputEmail.nextElementSibling;

    if (testEmail) {
      smallEmail.innerHTML = "";
      smallEmail.classList.remove("test-danger");
      form.email.classList.remove("form-danger");
      return true;
    } else {
      smallEmail.innerHTML = "L'email indiqué n'est pas valide";
      smallEmail.classList.add("test-danger");
      form.email.classList.add("form-danger");
      return false;
    }
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      validNom(form.firstName) &&
      validPrenom(form.lastName) &&
      validAdresse(form.address) &&
      validVille(form.city) &&
      validEmail(form.email)
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
          document.location.href = `confirmation.html?orderId=${repOrderID}&totalPrice=${total}`;
          console.log(test);
        });
    }
  });
}
creePanier();
