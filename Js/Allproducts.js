function showCategoryFromUrl() {
    updateCartCount();
    fetch("data.json")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const allProducts = data.Unilink.flatMap(product => product.Products);
            console.log(allProducts);

            if (allProducts) {
                const row = document.querySelector(".category-container");
                row.innerHTML = ""; 

                allProducts.forEach((product) => { 
                    const col = document.createElement("div");
                    col.classList.add("category-item");

                    col.innerHTML = `
                        <div class="product-item">
                            <img src="${product.Image}" alt="${product.Name}" class="product-img">
                            <h1> ₹ ${product.Price}<span> ₹ ${product.Mrp}</span></h1>
                            <div class="overlay">
                                <button class="add-to-cart"><i class='bx bxs-cart-add add'></i></button>
                                <button class="wishlist"><i class="fa-solid fa-heart"></i></button>
                            </div>
                            <p>${product.Name}</p>
                        </div>
                    `;

                    col.querySelector(".product-img").addEventListener("click", () => {
                        window.location.href = `Productview1.html?Name=${product.Name}`; 
                        console.log("Redirecting to:", product.Name);
                    });

                    col.querySelector(".add-to-cart").addEventListener("click", () => {
                        addcarts(product.Name);
                        updateCartCount(); 
                    });

                    col.querySelector(".wishlist").addEventListener("click", () => {
                        addToWishlists(product.Name);
                    });

                    row.appendChild(col);
                });
            } else {
                console.log("No matching category found.");
            }
        })
        .catch((error) => {
            console.log("Error fetching data:", error);
        });
}

showCategoryFromUrl();

document.getElementById('category-select').addEventListener('change', function () {
    window.location.href = this.value; // Ensure this.value is a valid URL
});

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



function filterProducts() {
    fetch("data.json")
      .then(res => res.json())
      .then(data => {
        const categoryFilter = document.getElementById('category-filter').value.trim(); 
        const priceFilter = document.getElementById('price-filter').value;
        
        
        const products = data.Unilink.flatMap(category => 
          category.Products.map(product => ({ ...product, Category: category.Category }))
        );
    
        console.log("All Products:", products);
    
        let filteredProducts = products;
    
      
        if (categoryFilter !== 'all') {
          filteredProducts = filteredProducts.filter(product => product.Category.trim() === categoryFilter);
        }
    
      
        if (priceFilter !== 'all') {
          filteredProducts = filteredProducts.filter(product => {
            if (priceFilter === 'low') {
              return product.Price < 300;
            } else if (priceFilter === 'mid') {
              return product.Price >= 300 && product.Price <= 700;
            } else if (priceFilter === 'high') {
              return product.Price > 700;
            }
          });
        }
    
        
        displayProducts(filteredProducts);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }
  
  function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    if (products.length === 0) {
      productList.innerHTML = '<p>No products found.</p>';
      return;
    }
  

    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('category-item');
      productItem.innerHTML =  `<div class="product-item">
      <img src="${product.Image}" alt="${product.Name}" class="Productimg">
      <h1> ₹ ${product.Price}<span> ₹ ${product.Mrp}</span></h1>
      <div class="overlay">
          <button class="add-to-cart"><i class='bx bxs-cart-add add'></i></button>
          <button class="wishlist"><i class="fa-solid fa-heart"></i></button>
      </div>
      <p>${product.Name}</p>
  </div>`;


      productList.appendChild(productItem);



      productItem.querySelector(".Productimg").addEventListener("click", () => {
        window.location.href = `Productview.html?Name=${product.Name}`; 
        console.log("Redirecting to:", product.Name);
    });


    productItem.querySelector(".add-to-cart").addEventListener("click", () => {
      addcarts(product.Name);
  });
     
  productItem.querySelector(".wishlist").addEventListener("click", () => {
      addToWishlists(product.Name);
  });


    });
  }
  
  
  document.getElementById('apply-filter-btn').addEventListener('click', filterProducts);


  document.getElementById('category-select').addEventListener('change', function () {
    window.location.href = this.value;
  });


  const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('nav');

// Add click event listener to the menu icon
menuIcon.addEventListener('click', function() {
    // Toggle the "show-menu" class on the nav element
    nav.classList.toggle('show-menu');
});




  
  