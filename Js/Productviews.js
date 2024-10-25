function displayProducts() {
  const urlParams = new URLSearchParams(window.location.search);
  const ProductName = urlParams.get("Name");
  console.log("ProductName:", ProductName);
  
     updateCartCount();

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      let product = null;
      let categoryFind = null;  

      
      data.Unilink.forEach(uni => {
        
        const foundProduct = uni.Products.find(p => p.Name === ProductName);

        if (foundProduct) {
          product = foundProduct;
          categoryFind = uni.Category;
          console.log("Found Product:", product);
        }
      });

      if (product) {
       
        const productHTML = `
                  <div class="product-image">
                      <img src="${product.Image}" alt="${product.Name}">
                  </div>
                  <div class="product-info">
                      <h1 id="productTitle">${product.Name}</h1>
                      <p id="productDescription">${product.Description}</p>
                      <p class="Return-policy">Return Policy: 7 Days Replacement Policy. Read more</p>
                      <div class="price" id="productPrice">MRP : ${product.Price}</div>
                      <button class="buy-btn"><i class="fa-solid fa-store"></i>Buy Now</button>
                      <button class="add-cart-btn"><i class="fa-solid fa-cart-plus" id="addtocart"></i>Add to Cart</button>
                      <button class="wishlist-btn"><i class="fa-solid fa-heart hear"></i>Add to Wishlist</button>
                  </div>
              `;

        document.querySelector(".product-details").innerHTML = productHTML;  
        document.querySelector(".add-cart-btn").addEventListener("click", () => {
          addcarts(product.Name);
      });
      
      
      document.querySelector(".wishlist-btn").addEventListener("click", () => {
          addToWishlists(product.Name);
      });

       
        const relatedProducts = data.Unilink.find(uni => uni.Category === categoryFind).Products.filter(p => p.Name !== product.Name);
        console.log("Relatedproducts",relatedProducts);
        const relatedRow = document.querySelector(".category-container");
        relatedRow.innerHTML = ""; 

        if (relatedProducts.length > 0) {
          relatedProducts.forEach(relatedProduct => {
            const col = document.createElement("div");
            col.classList.add("category-item");

           
            col.innerHTML = ` 
              <div class="product-item">
                  <img src="${relatedProduct.Image}" alt="${relatedProduct.Name}">
                  <h1> ₹ ${relatedProduct.Price}<span> ₹ ${relatedProduct.Mrp}</span></h1>
                  <div class="overlay">
                      <button class="add-to-cart"><i class='bx bxs-cart-add add'></i></button>
                      <button class="wishlist"><i class="fa-solid fa-heart"></i></button>
                  </div>
                  <p>${relatedProduct.Name}</p>
              </div>
            `;
            relatedRow.appendChild(col); 

            col.querySelector(".add-to-cart").addEventListener("click", () => {
              addcarts(relatedProduct.Name);
            });

            col.querySelector(".product-item img").addEventListener("click", () => {
              window.location.href = `Productviews1.html?Name=${relatedProduct.Name}`; 
              console.log("Redirecting to:", relatedProduct.Name);
            });
          
            
            col.querySelector(".wishlist").addEventListener("click", () => {
              addToWishlists(relatedProduct.Name);
            });
          });
        } else {
          relatedRow.innerHTML = "<p>No related products available</p>";
        }

      } else {
       
        document.querySelector(".product-details").innerHTML = '<p>Product not found</p>';
      }
    })
    .catch(error => {
      console.error("There was an error:", error);
    });
}


displayProducts();




function addcarts(productName) {
  // Retrieve the cart from localStorage
  let cart3 = JSON.parse(localStorage.getItem("cart3")) || [];

  // Check if the product already exists in the cart
  const existingProduct = cart3.find(product => product.product === productName);

  if (existingProduct) {
      existingProduct.Quantity += 1; // Increase quantity if it exists
  } else {
      // Add new product with an initial quantity of 1
      cart3.push({ product: productName, Quantity: 1 });
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart3", JSON.stringify(cart3));
   updateCartCount();
  alert(`${productName} added to cart`);
}


function addToWishlists(productName) {
  let wishlists = JSON.parse(localStorage.getItem("wishlists")) || []; 

  if (!wishlists.includes(productName)) {
      wishlists.push(productName);
      localStorage.setItem("wishlists", JSON.stringify(wishlists)); 
      alert(`${productName} added to wishlist!`);
  } else {
      alert(`${productName} is already in your wishlist.`);
  }

 
}


function updateCartCount() {
    const cart3 = JSON.parse(localStorage.getItem("cart3")) || [];
    const countElement = document.querySelector(".addtocartvalue");
    const totalQuantity = cart3.reduce((sum, item) => sum + (parseInt(item.Quantity) || 0), 0);
    countElement.textContent = `${totalQuantity}`;
}


const searchInput = document.getElementById("Search-products");

searchInput.addEventListener("keyup", (event) => {
  console.log("Key pressed:", event.key);  
  const searchValue = searchInput.value.trim();
  console.log("Search value:", searchValue); 
  
 
  if (event.key === "Enter") { 
      if (searchValue.length > 0) {  
          console.log("Redirecting to search page..."); 
          window.location.href = `search-results.html?query=${encodeURIComponent(searchValue)}`;
      } else {
          console.log("No search value entered.");
      }
  }
});

const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('nav');

// Add click event listener to the menu icon
menuIcon.addEventListener('click', function() {
    // Toggle the "show-menu" class on the nav element
    nav.classList.toggle('show-menu');
});
