document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartCount();
    updateCartCounts();
    popupCart();
});

function loadCart() {
    const cart3 = JSON.parse(localStorage.getItem("cart3")) || [];
    const container = document.querySelector(".whislist-row");
    const totalAmount = document.querySelector(".total-value");
    let total = 0;

    container.innerHTML = ""; // Clear previous items

    if (cart3.length === 0) {
        container.innerHTML = "<p>Your Cart is Empty</p>";
        totalAmount.innerHTML = "0";
        return;
    }

    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            const products = data.Unilink.flatMap(shoe => shoe.Products);

            cart3.forEach(cartItem => {
                const product = products.find(prod => prod.Name === cartItem.product);
                if (product) {
                    const col = document.createElement("div");
                    col.classList.add("wishlist-col");

                    const price = parseFloat(product.Price);
                    const quantity = parseInt(cartItem.Quantity) || 1;
                    const itemTotal = price * quantity;
                    total += itemTotal;

                    col.innerHTML = `
                        <div class="wishlist-item">
                            <div class="wishlist-img">
                                <img src="${product.Image}" alt="Product Image">
                            </div>
                            <div class="wishlist-description">
                                <h2>${product.Name}</h2>
                                <h2>₹ ${product.Price}</h2>
                            </div>
                            <div class="wishlist-price">
                                <table class="quant">
                                    <tr class="quantity">
                                        <td class="decrease">-</td>
                                        <td class="Quantity-value">${quantity}</td>
                                        <td class="increase">+</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="wishlist-addcart">
                                <div class="buynowbtn">
                                    <button>Buy Now</button>
                                </div>
                                <div class="removes-btn">
                                    <button class="remove-item">
                                        <i class='bx bx-trash del'></i> Remove
                                    </button>
                                </div>
                            </div>
                            <div class="item-price-t">
                                ₹ ${itemTotal.toFixed(2)}
                            </div>
                        </div>`;

                    container.appendChild(col);

                    const quantityElement = col.querySelector('.Quantity-value');
                    const itemPriceElement = col.querySelector('.item-price-t');

                    // Increase quantity
                    col.querySelector('.increase').addEventListener('click', function() {
                        cartItem.Quantity++;
                        quantityElement.textContent = cartItem.Quantity;
                        const newItemTotal = price * cartItem.Quantity;
                        itemPriceElement.textContent = `₹ ${newItemTotal.toFixed(2)}`;
                        saveCart(cart3);
                        updateTotals(); // Update total values
                    });

                    // Decrease quantity
                    col.querySelector('.decrease').addEventListener('click', function() {
                        if (cartItem.Quantity > 1) {
                            cartItem.Quantity--;
                            quantityElement.textContent = cartItem.Quantity;
                            const newItemTotal = price * cartItem.Quantity;
                            itemPriceElement.textContent = `₹ ${newItemTotal.toFixed(2)}`;
                            saveCart(cart3);
                            updateTotals(); // Update total values
                        }
                    });

                    // Remove item
                    col.querySelector('.remove-item').addEventListener('click', function() {
                        removeItemFromCart(cartItem.product);
                    });
                }
            });

            const col1 = document.createElement("div");
            col1.classList.add("wishlist-col1");
            col1.innerHTML = `
                <div class="wishlist-totals">
                    <h2 class="Subtotal">Subtotal: <span class="subtotal-value">₹ ${total.toFixed(2)}</span></h2>
                    <h2 class="total">Total: <span class="total-value">₹ ${total.toFixed(2)}</span></h2>
                </div>
                <button class="checkouts">CHECKOUT</button>`;
            container.appendChild(col1);

            totalAmount.innerHTML = `₹ ${total.toFixed(2)}`; // Ensure totalAmount is updated correctly
        });
}

function saveCart(cart3) {
    localStorage.setItem("cart3", JSON.stringify(cart3));
}

function removeItemFromCart(productName) {
    let cart3 = JSON.parse(localStorage.getItem("cart3")) || [];
    cart3 = cart3.filter(item => item.product !== productName); // Remove item
    saveCart(cart3); // Save updated cart
    loadCart(); // Reload the cart display
    updateCartCount(); // Update the cart count
    updateCartCounts();
}

function updateCartCount() {
    const cart3 = JSON.parse(localStorage.getItem("cart3")) || [];
    const countElement = document.querySelector(".addtocartvalue");
    const totalQuantity = cart3.reduce((sum, item) => sum + (parseInt(item.Quantity) || 0), 0);
    countElement.textContent = `${totalQuantity}`;
}

function updateTotals() {
    const cart3 = JSON.parse(localStorage.getItem("cart3")) || [];
    let total = 0;

    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            const products = data.Unilink.flatMap(shoe => shoe.Products);

            cart3.forEach(cartItem => {
                const product = products.find(prod => prod.Name === cartItem.product);
                if (product) {
                    const price = parseFloat(product.Price);
                    const quantity = parseInt(cartItem.Quantity) || 1;
                    total += price * quantity;
                }
            });

            document.querySelector('.subtotal-value').textContent = `₹ ${total.toFixed(2)}`;
            document.querySelector('.total-value').textContent = `₹ ${total.toFixed(2)}`;
        });
}

function popupCart() {
    const cart3 = JSON.parse(localStorage.getItem("cart3")) || [];
    const container = document.querySelector(".cart-items");
    let total = 0;

    container.innerHTML = ""; // Clear previous items

    if (cart3.length === 0) {
        container.innerHTML = "<p>Your Cart is Empty</p>";
        document.querySelector('.total-value').innerHTML = "0"; // Ensure totalAmount is defined
        return;
    }

    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            const products = data.Unilink.flatMap(shoe => shoe.Products);

            cart3.forEach(cartItem => {
                const product = products.find(prod => prod.Name === cartItem.product);
                if (product) {
                    const price = parseFloat(product.Price);
                    const quantity = parseInt(cartItem.Quantity) || 1;
                    const itemTotal = price * quantity;
                    total += itemTotal;

                    // Create cart item element
                    const li = document.createElement("li");
                    li.classList.add("cart-products");
                    li.innerHTML = `
                        <div class="cart-img">
                            <img src="${product.Image}" alt="Product Image">
                        </div>
                        <div class="cart-name">
                            <h1>${product.Name}</h1>
                            <div class="quantityy">
                                <table class="Quantityies">
                                    <tr class="pop-cart">
                                        <td class="pop-decrease">-</td>
                                        <td class="pop-value">${quantity}</td>
                                        <td class="pop-increase">+</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="delete-icon">
                            <h1><i class='bx bxs-trash tra'></i></h1>
                        </div>
                        <div class="totals-cart">
                            ₹ ${itemTotal.toFixed(2)}
                        </div>
                    `;

                    // Append to container
                    container.appendChild(li);

                    const quantityElement = li.querySelector('.pop-value');
                    const itemPriceElement = li.querySelector('.totals-cart');

                    // Increase quantity
                    li.querySelector('.pop-increase').addEventListener('click', function () {
                        cartItem.Quantity++;
                        quantityElement.textContent = cartItem.Quantity;
                        const newItemTotal = price * cartItem.Quantity;
                        itemPriceElement.textContent = `₹ ${newItemTotal.toFixed(2)}`;
                        saveCart(cart3);
                        updateTotals();
                    });

                    // Decrease quantity
                    li.querySelector('.pop-decrease').addEventListener('click', function () {
                        if (cartItem.Quantity > 1) {
                            cartItem.Quantity--;
                            quantityElement.textContent = cartItem.Quantity;
                            const newItemTotal = price * cartItem.Quantity;
                            itemPriceElement.textContent = `₹ ${newItemTotal.toFixed(2)}`;
                            saveCart(cart3);
                            updateTotals();
                        }
                    });

                    // Remove item
                    li.querySelector('.tra').addEventListener('click', function () {
                        removeItemFromCart(cartItem.product);
                        popupCart(); // Refresh the popup cart
                    });
                }
            });

            // Update total values in cart
            const totalLi = document.createElement("li");
            totalLi.classList.add("static-li")
            totalLi.classList.add("cart-totals");
            totalLi.innerHTML = `
                <h2 class="total">Total : <span class="total-value">₹ ${total.toFixed(2)}</span></h2>
            `;
            container.appendChild(totalLi);
        });
}

// Toggle cart visibility
document.getElementById("toggle-cart").addEventListener("click", function () {
    const container = document.querySelector(".cart-items");
    const toggleIcon = this.querySelector('i');

    container.classList.toggle("show");

    if (container.classList.contains("show")) {
        toggleIcon.classList.remove('bx-chevron-down');
        toggleIcon.classList.add('bx-chevron-up'); // Change to up icon
    } else {
        toggleIcon.classList.remove('bx-chevron-up');
        toggleIcon.classList.add('bx-chevron-down'); // Change to down icon
    }
});

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



function updateCartCounts() {
    const cart3 = JSON.parse(localStorage.getItem("cart3")) || [];
    const wishlistCount = document.querySelector(".counts"); 
    const totalQuantity = cart3.reduce((sum, item) => sum + (parseInt(item.Quantity) || 0), 0);
    wishlistCount.textContent = `${totalQuantity}`;
}

const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('nav');

// Add click event listener to the menu icon
menuIcon.addEventListener('click', function() {
    // Toggle the "show-menu" class on the nav element
    nav.classList.toggle('show-menu');
});
