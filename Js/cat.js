function showCategoryFromUrl() {
   
    const urlparams = new URLSearchParams(window.location.search);
    const CategoryName = urlparams.get("Category");
  
    console.log("Category from URL:", CategoryName);
  
   
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
  
       
        const foundproduct = data.Unilink.find((unilink) => unilink.Category == CategoryName);
        console.log(foundproduct);
  
        if (foundproduct) {
          console.log("Found Category:", foundproduct);
          const row = document.querySelector(".category-container");
          row.innerHTML = ""; 
  


          foundproduct.Products.forEach((product) => {
            const col = document.createElement("div");
            col.classList.add("category-item");
  
            col.innerHTML = `
              <div class="product-item">
                <img src="${product.Image}" alt="${product.Name}">
                <h1> ₹ ${product.Price}<span> ₹ ${product.Mrp}</span></h1>
                <div class="overlay">
                  <button class="add-to-cart"><i class='bx bxs-cart-add add'></i></button>
                  <button class="wishlist"><i class='bx bxs-heart heart'></i></button>
                </div>
                <p>${product.Name}</p>
              </div>
            `;

            col.querySelector(".add-to-cart").addEventListener("click",()=>{
              addcarts(product.Name);
            })  


            col.querySelector(".wishlist").addEventListener("click",()=>{
              addToWishlist(product.Name)
            })

           
           
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
 function toggleMenu() {
 
}


document.getElementById('category-select').addEventListener('change', function () {
  window.location.href = this.value; 
});

  function addcarts(productName){
    const cart1=JSON.parse(localStorage.getItem("cart1")) ||[];
    
    const exisitingproduct=cart1.find(product=>product.product==productName);
    if(exisitingproduct){
      exisitingproduct.Quantity+=1;
    }
    else{
      cart1.push({product:productName,Quantity:1});
    }
    localStorage.setItem("cart1", JSON.stringify(cart1));
    alert(`${productName} added to cart `);
  }


  function addToWishlist(productName) {
    let wishlist = JSON.parse(localStorage.getItem("wish1")) || [];
  
    if (!wishlist.includes(productName)) {
        wishlist.push(productName);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert(`${productName} added to wishlist!`);
    } else {
        alert(`${productName} is already in your wishlist.`);
    }
  }






  