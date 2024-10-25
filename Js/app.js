let slidePosition = 0;
const sliders = document.querySelectorAll(".banner-slide");
const totalSliders = sliders.length;
const nextBtn = document.querySelector("#nextbtn");
const prevBtn = document.querySelector("#prevbtn");

// Initialize dots for each slider
const dotscontainer = document.querySelector(".banner-dots"); 
sliders.forEach(() => {
    const dot = document.createElement("div");
    dot.classList.add("dots");
    dotscontainer.appendChild(dot);
});

// Select all dots after creating them
const dots = document.querySelectorAll(".dots");
dots[slidePosition].classList.add("dots-active");

function updatePosition() {
    // Update slider visibility
    sliders.forEach(slide => {
        slide.classList.remove("active");
        slide.classList.add("hidden");
    });
    sliders[slidePosition].classList.add("active");

    // Update dots active class
    dots.forEach(dot => {
        dot.classList.remove("dots-active");
    });
    dots[slidePosition].classList.add("dots-active");
}

// Move to the next slide
function moveNext() {
    if (slidePosition === totalSliders - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    updatePosition();
}

// Move to the previous slide
function movePrev() {
    if (slidePosition === 0) {
        slidePosition = totalSliders - 1;
    } else {
        slidePosition--;
    }
    updatePosition();
}

// Event listeners for buttons
nextBtn.addEventListener("click", moveNext);
prevBtn.addEventListener("click", movePrev);

// Dot click event listener
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        slidePosition = index;
        updatePosition();
    });
});

// Auto-slide with setInterval
let autoSlide = setInterval(moveNext, 2000);

// Stop auto-slide when user manually interacts with the slider
[nextBtn, prevBtn].forEach(btn => {
    btn.addEventListener("click", () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(moveNext, 2000);
    });
});

dots.forEach(dot => {
    dot.addEventListener("click", () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(moveNext, 2000);
    });
});

// Mobile menu toggle function
function toggleMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('active');
}

// Fetching data from JSON and displaying categories
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data && data.Unilink) {
           updateCartCount()
            categoryData(data);
            searchdata(data);
        } else {
            console.error("Unilink property not found in JSON data");
        }
    })
    .catch(error => {
        console.error("Failed to fetch data:", error);
    });

function categoryData(data) {
    const category = data.Unilink;
    const row = document.querySelector(".products-grid");

    category.forEach(categ => {
        const col = document.createElement('div');
        col.classList.add("product-card");

        col.innerHTML = `
            <img src="${categ.Image}" alt="${categ.Name}">
            <h3>${categ.Category}</h3>
            <p>Discover a wide range of health care products, tailored to meet your wellness needs.</p>
            
        `;

        col.addEventListener("click", () => {
            window.location.href = `Category.html?Category=${categ.Category}`;
            console.log(categ.Category);
        });

        row.appendChild(col);
    });



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


// const searchInput = document.getElementById("Search-products");

// searchInput.addEventListener("input", () => {
//     const searchValue = searchInput.value.trim();
//     console.log("Search value:", searchValue);  // Log the search value

//     if (searchValue.length > 0) {  // Check if at least one character is entered
//         console.log("Redirecting to search page...");
//         window.location.href = `search-results.html?query=${encodeURIComponent(searchValue)}`;
//     }
// });








// function searchdata(data) {
//     console.log("Search data:", data);
  
//     const searchInput = document.getElementById("Search-products"); 
//     const row = document.querySelector(".category-container");
  
//     const allproducts = data.Unilink.flatMap(uni => uni.Products);
//     console.log("All products:", allproducts);
  
//     searchInput.addEventListener("keyup", () => {
//         const searchValue = searchInput.value.trim().toLowerCase(); 
//         row.innerHTML = ""; 
  
//         if (searchValue === "") {
//             row.innerHTML = ""; 
//         } else {
//             const searchProducts = allproducts.filter(product =>
//                 product.Name.toLowerCase().includes(searchValue) 
//             );
  
//             searchProducts.forEach(product => {
//                 const productItem = document.createElement('div');
//                 productItem.classList.add('category-item');
                
//                 const productHTML = `
//                     <div class="product-item">
//                         <img src="${product.Image}" alt="${product.Name}" class="Productimg">
//                         <h1> ₹ ${product.Price} <span> ₹ ${product.Mrp}</span></h1>
//                         <div class="overlay">
//                             <button class="add-to-cart"><i class='bx bxs-cart-add add'></i></button>
//                             <button class="wishlist"><i class="fa-solid fa-heart"></i></button>
//                         </div>
//                         <p>${product.Name}</p>
//                     </div>`;
                    
//                 productItem.innerHTML = productHTML;
//                 row.appendChild(productItem); 
//             });
//         }
//     });
//   }
  
  
 
function debugCart() {
    const cart3 = JSON.parse(localStorage.getItem("cart3")) || [];
    console.log("Current Cart:", cart3);
}

debugCart();