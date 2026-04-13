// // CONFIG FIREBASE (DÉJÀ REMPLACÉE)
const firebaseConfig = {
  apiKey: "AIzaSyBxrnmDYFscCkZ99TiNX0k40Csrdk5Rm78",
  authDomain: "boutique-1d1d9.firebaseapp.com",
  projectId: "boutique-1d1d9",
  storageBucket: "boutique-1d1d9.firebasestorage.app",
  messagingSenderId: "150422083425",
  appId: "1:150422083425:web:406c9ee9c9d9b1fd945720"
};

// INITIALISATION
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// ================= AUTH =================
function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Compte créé"))
    .catch(e => alert(e.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => alert("Connecté"))
    .catch(e => alert(e.message));
}

function logout() {
  auth.signOut().then(() => alert("Déconnecté"));
}


// ================= PRODUITS =================
function loadProducts() {
  db.collection("products").get().then(snapshot => {
    const container = document.getElementById("products");
    container.innerHTML = "";

    snapshot.forEach(doc => {
      const p = doc.data();

      container.innerHTML += `
        <div class="product">
          <h3>${p.name}</h3>
          <p>${p.price} FCFA</p>
          <button onclick="addToCart('${doc.id}')">Ajouter</button>
        </div>
      `;
    });
  });
}


// ================= PANIER =================
const cart = [];

function addToCart(id) {
  db.collection("products").doc(id).get().then(doc => {
    cart.push(doc.data());
    displayCart();
  });
}

function displayCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";

  cart.forEach(item => {
    cartList.innerHTML += `<li>${item.name} - ${item.price} FCFA</li>`;
  });
}


// ================= ADMIN =================
function addProduct() {
  const name = document.getElementById("pname").value;
  const price = parseInt(document.getElementById("pprice").value);

  if (!name || !price) {
    alert("Remplis tous les champs");
    return;
  }

  db.collection("products").add({
    name: name,
    price: price
  }).then(() => {
    alert("Produit ajouté");
    loadProducts();
  });
}


// ================= PAIEMENT =================
function payer() {
  if (cart.length === 0) {
    alert("Panier vide");
    return;
  }

  alert("Paiement effectué avec succès !");
  cart.length = 0;
  displayCart();
}


// ================= LANCEMENT =================
loadProducts();