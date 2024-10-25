document.addEventListener('DOMContentLoaded', function() {
    loadWishlist();
    updateCartCount();
});

function loadWishlist() {
    let wishlists = JSON.parse(localStorage.getItem("wishlists")) || [];
    const container = document.querySelector(".whislist-row");

    if (wishlists.length === 0) {
        container.innerHTML = `<p>Your wishlist is empty</p>`;
        updateWishlistCount(0); 
        return;
    }

    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            const allProducts = data.Unilink.flatMap(product => product.Products);
            let wishlistContent = `
                <table class="wishlist-table">
                    <tbody>
            `;
        
            wishlists.forEach(productName => {
                const wishlistProduct = allProducts.find(product => product.Name === productName);
                if (wishlistProduct) {
                    wishlistContent += `
                        <tr class="wishlist-item">
                            <td class="wishlist-img">
                                <img src="${wishlistProduct.Image}" alt="${wishlistProduct.Name}">
                            </td>
                            <td class="wishlist-description">
                                <h2>${wishlistProduct.Name}</h2>
                            </td>
                            <td class="wishlist-price">
                                <h3>₹ ${wishlistProduct.Price}</h3>
                            </td>
                            <td class="wishlist-addcart">
                                <button class="Addtocarts" data-name="${wishlistProduct.Name}">
                                    <i class='bx bx-cart-add'></i> Add to Cart
                                </button>
                                <div class="buynowbtn">
                                    <button>Buy Now</button> 
                                </div>
                            </td>
                            <td class="wishlist-remove">
                                <button class="remove-item" data-name="${wishlistProduct.Name}">
                                    <i class='bx bx-trash del'></i> Remove
                                </button>
                            </td>
                        </tr>
                    `;
                }
            });
        
            wishlistContent += `
                    </tbody>
                </table>
                <div class="whislists-button">
                    <div class="continue-button">
                        <button>Continue Shopping</button>
                    </div>
                    <div class="clear-button">
                        <button>Clear Wishlist</button>
                    </div>
                </div>
            `;
        
            container.innerHTML = wishlistContent;
            updateWishlistCount(wishlists.length); 
        
            const removebtns = document.querySelectorAll(".remove-item");
            removebtns.forEach(button => {
                button.addEventListener("click", function() {
                    const productName = button.getAttribute('data-name');
                    removeFromWishlist(productName);
                });
            });
        
            const addToCartBtns = document.querySelectorAll(".Addtocarts");
            addToCartBtns.forEach(button => {
                button.addEventListener("click", function() {
                    const productName = button.getAttribute('data-name');
                    addtocarts(productName);
                });
            }); 

            document.querySelector(".clear-button button").addEventListener("click",()=>{
                clearbuuton()
            })
        
        })
        .catch(error => {
            console.error("Error fetching product data:", error);
        });
}

function updateWishlistCount(count) {
    const wishlistCount = document.querySelector(".whislits-count h2"); 
    wishlistCount.textContent = `${count} Items`; 
}

function removeFromWishlist(productName) {
    let wishlists = JSON.parse(localStorage.getItem("wishlists")) || [];
    wishlists = wishlists.filter(item => item !== productName); 
    localStorage.setItem("wishlists", JSON.stringify(wishlists)); 
    loadWishlist(); 
    updateCartCount();
}

function addtocarts(productName) {
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
  
    alert(`${productName} added to cart`);
  }
  

function clearbuuton(){
    localStorage.removeItem("wishlists");
    loadWishlist();
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