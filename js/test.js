function afficherLeToutSousFormeDeDivisions(nounours) {
  for (let elem of nounours) {
    let mainUn = document.querySelector(".block-main__element-photo");
    let lien = document.createElement("a");
    let photo = document.createElement("img");

    let src = photo.getAttribute("src");
    let href = lien.getAttribute("href");

    lien.href = "produits.html";
    let cls = photo.classList.add("photo");
    mainUn.appendChild(lien);
    lien.classList.add("produits");
    photo.src = elem.imageUrl;
    lien.appendChild(photo);

    let pUn = document.createElement("p");

    pUn.classList.add("description");
    lien.appendChild(pUn);
    pUn.innerHTML = `${elem.name}  <strong>${elem.price / 100}</strong> €  `;
  }
}
async function fillProducts() {
  await fetch("http://localhost:3000/api/cameras") // will return info, but in wrong format
    .then((response) => response.json()) // will return info, in json format
    .then((nounours) => afficherLeToutSousFormeDeDivisions(nounours));
}

fillProducts();

const queryString = window.location.search;
console.log(queryString);
