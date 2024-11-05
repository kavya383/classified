let products = [];
let cart = [];
let notifications = {}; // Object to store user notifications for products
let currentUser = null;
// Initial products array
products = [
  {
    name: "Tripod",
    price: 1000,
    description: "Used tripod in good condition.",
    image: "tripod.jpg",
    reviews: [
      { rating: 4, comment: "Great!" },
      { rating: 5, comment: "Amazing value for money." },
    ],
    showReviews: false,
    soldOut: false,
  },
  {
    name: "Camera",
    price: 3000,
    description: "Vintage camera for sale.",
    image: "camera.jpg",
    reviews: [{ rating: 3, comment: "Works well but a bit outdated." }],
    showReviews: false,
    soldOut: false,
  },
  {
    name: "Smartphone",
    price: 15000,
    description: "Latest model smartphone.",
    image: "smartphone.jpg",
    reviews: [
      { rating: 4, comment: "Works great!" },
      { rating: 5, comment: "Amazing features!" },
      { rating: 3, comment: "Good value for money." },
    ],
    showReviews: false,
    soldOut: false,
  },
];
const newProducts = [
  {
    name: "Laptop",
    price: 45000,
    description: "High-performance laptop for sale.",
    image: "laptop.jpg",
    reviews: [
      { rating: 5, comment: "Excellent performance!" },
      { rating: 4, comment: "Good value for the price." },
    ],
    showReviews: false,
    soldOut: false,
  },
  {
    name: "Headphones",
    price: 1500,
    description: "Noise-canceling headphones.",
    image: "headphones.jpg",
    reviews: [{ rating: 4, comment: "Great sound quality!" }],
    showReviews: false,
    soldOut: false,
  },
  {
    name: "Gaming Mouse",
    price: 2500,
    description: "Ergonomic gaming mouse with RGB lighting.",
    image: "gaming_mouse.jpg",
    reviews: [
      { rating: 5, comment: "Best gaming mouse I've ever used!" },
      { rating: 4, comment: "Great precision and comfort." },
    ],
    showReviews: false,
    soldOut: false,
  },
  {
    name: "Tripod",
    price: 1000,
    description: "Used tripod in good condition.",
    image: "tripod.jpg",
    reviews: [
      { rating: 4, comment: "Great!" },
      { rating: 5, comment: "Amazing value for money." },
    ],
    showReviews: false,
    soldOut: false,
  },
  {
    name: "Camera",
    price: 3000,
    description: "Vintage camera for sale.",
    image: "camera.jpg",
    reviews: [{ rating: 3, comment: "Works well but a bit outdated." }],
    showReviews: false,
    soldOut: false,
  },
  {
    name: "Smartwatch",
    price: 5000,
    description: "Stylish smartwatch with health features.",
    image: "smartwatch.jpg",
    reviews: [
      { rating: 4, comment: "Very useful and stylish!" },
      { rating: 5, comment: "Perfect for daily use." },
    ],
    showReviews: false,
    soldOut: false,
  },
];

// Function to replace the home products
function replaceHomeProducts() {
  products = newProducts; // Replace with the new product set
  displayProducts(); // Refresh the displayed products
  localStorage.setItem("products", JSON.stringify(products)); // Update in localStorage
}

// Call this function to replace products on the home page
replaceHomeProducts();
// Load products from localStorage if available
if (localStorage.getItem("products")) {
  products = JSON.parse(localStorage.getItem("products"));
} else {
  localStorage.setItem("products", JSON.stringify(products));
}

// Load notifications from localStorage if available
if (localStorage.getItem("notifications")) {
  notifications = JSON.parse(localStorage.getItem("notifications"));
}

// Function to display products
function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const div = document.createElement("div");
    div.classList.add("product-card");
    div.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        ${product.soldOut ? '<span class="sold-out">Sold Out</span>' : ''}
      </div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart('${product.name}', ${product.price})" ${product.soldOut ? 'disabled' : ''}>
        ${product.soldOut ? 'Sold Out' : 'Add to Cart'}
      </button>
      <button onclick="subscribeToProduct('${product.name}')"> Notify Me </button>
      <button onclick="toggleReviews(${index})">${product.showReviews ? "Hide Reviews" : "Show Reviews"}</button>
      <div class="reviews" style="display: ${product.showReviews ? "block" : "none"};">
        <h4>Reviews:</h4>
        ${getProductReviews(product)}
        <form onsubmit="addReview(${index}); return false;">
          <label>Rating (1-5):</label>
          <input type="number" min="1" max="5" id="rating-${index}" required>
          <textarea id="review-${index}" placeholder="Write a review" required></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    `;
    productList.appendChild(div);
  });
}

// Add 'Sold Out' overlay styling
const style = document.createElement("style");
style.innerHTML = `
  .product-image-wrapper {
    position: relative;
  }
  .sold-out {
    position: absolute;
    top: 10px;
    left: 10px;
    background: rgba(255, 0, 0, 0.7);
    color: white;
    padding: 5px;
    font-weight: bold;
    border-radius: 5px;
  }
`;
document.head.appendChild(style);

function toggleReviews(productIndex) {
  products[productIndex].showReviews = !products[productIndex].showReviews;
  displayProducts();
  localStorage.setItem("products", JSON.stringify(products));
}

function getProductReviews(product) {
  if (product.reviews.length === 0) return "<p>No reviews yet.</p>";
  return product.reviews
    .map((review) => `<p>${review.rating}/5 - ${review.comment}</p>`)
    .join("");
}

function addReview(productIndex) {
  const rating = document.getElementById(`rating-${productIndex}`).value;
  const comment = document.getElementById(`review-${productIndex}`).value;

  const newReview = { rating: parseInt(rating), comment };
  products[productIndex].reviews.push(newReview);

  displayProducts();
  localStorage.setItem("products", JSON.stringify(products));
}

function showCheckout() {
  const address = prompt("Enter your delivery address:");
  const paymentMethod = prompt(
    "Enter your payment method (e.g., Credit Card):"
  );
  alert(
    `Your order has been placed!\nDelivery Address: ${address}\nPayment Method: ${paymentMethod}`
  );
  cart = [];
  updateCart();
}

function toggleSellProductForm() {
  const form = document.getElementById("sell-product-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function filterProducts() {
  const maxPrice = parseFloat(document.getElementById("price-filter").value);
  document.getElementById("price-display").textContent = `₹${maxPrice}`;

  const filteredProducts = products.filter(
    (product) => product.price <= maxPrice
  );
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  if (filteredProducts.length === 0) {
    productList.innerHTML = "<p>No products found in this price range.</p>";
  } else {
    filteredProducts.forEach((product) => {
      const div = document.createElement("div");
      div.classList.add("product-card");
      div.innerHTML = `
                <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: ₹${product.price.toFixed(2)}</p>
                <button onclick="addToCart('${product.name}', ${
        product.price
      })">Add to Cart</button>
                <button onclick="subscribeToProduct('${
                  product.name
                }')">Notify Me When Sold</button>
            `;
      productList.appendChild(div);
    });
  }
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Replace with actual login logic, e.g., checking against stored users
  if (username && password) {
    currentUser = username; // Simulating login
    alert(`Welcome, ${currentUser}!`);
    window.location.href = "index.html"; // Redirect to main page
  } else {
    alert("Please enter valid credentials.");
  }
}

function logout() {
  currentUser = null; // Clear user
  alert("You have logged out.");
  window.location.href = "login.html"; // Redirect to login page
}

// Function to display the logout button on the main page
function displayLogoutButton() {
  const logoutButton = document.createElement("button");
  logoutButton.innerText = "Logout";
  logoutButton.onclick = logout;
  document.body.appendChild(logoutButton);
}

// Call this function on the main page to display the logout button if a user is logged in
if (currentUser) {
  displayLogoutButton();
}

function addToCart(name, price) {
  const product = products.find((p) => p.name === name);
  if (product && !product.soldOut) {
    cart.push({ name, price });
    product.soldOut = true; // Mark product as sold out
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("products", JSON.stringify(products));
    alert(`${name} has been added to your cart!`);
    displayProducts(); // Update product display to show "Sold Out"
  }
}
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPriceElem = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");
  cartItems.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price}
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
    cartItems.appendChild(li);
    total += item.price;
  });
  totalPriceElem.textContent = `Total: ₹${total.toFixed(2)}`;
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  const removedItem = cart[index].name;
  if (
    confirm(`Are you sure you want to remove ${removedItem} from your cart?`)
  ) {
    cart.splice(index, 1);
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${removedItem} has been removed from your cart.`);
  }
}

function proceedToPayment() {
  window.location.href = "payment.html";
}

function addProduct() {
  const productName = document.getElementById("product-name").value;
  const productPrice = document.getElementById("product-price").value;
  const productDescription = document.getElementById(
    "product-description"
  ).value;
  const productImage = document.getElementById("product-image").files[0];

  if (productName && productPrice && productDescription && productImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const newProduct = {
        name: productName,
        price: parseFloat(productPrice),
        description: productDescription,
        image: e.target.result,
        reviews: [],
        showReviews: false,
      };

      products.push(newProduct);
      displayProducts();
      localStorage.setItem("products", JSON.stringify(products));
      alert("Your product has been added for sale!");
    };

    reader.readAsDataURL(productImage);
    document.getElementById("sell-product-form").reset();
  } else {
    alert("Please fill out all fields.");
  }
}

function subscribeToProduct(productName) {
  if (!notifications[productName]) {
    notifications[productName] = [];
  }
  const email = prompt("Enter your email to subscribe for notifications:");
  if (email && validateEmail(email)) {
    notifications[productName].push(email);
    alert(`You will be notified when ${productName} is sold!`);
    localStorage.setItem("notifications", JSON.stringify(notifications));
  } else {
    alert("Please enter a valid email address.");
  }
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function notifyUsers(productName) {
  if (notifications[productName]) {
    notifications[productName].forEach((email) => {
      alert(`Notification sent to ${email}: ${productName} has been sold!`);
    });
    notifications[productName] = [];
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }
}
// Function to show different sections
function showSection(sectionId) {
  const sections = document.querySelectorAll("main > section");
  sections.forEach((section) => section.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

// Initial call to display products and cart
displayProducts();
updateCart();
