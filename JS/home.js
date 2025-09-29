

let productContainer=document.getElementById("product-container");
let searchInput=document.getElementById("search");
let sortSelect=document.getElementById("sort");
let checkboxes=document.querySelectorAll("aside input[type=checkbox]");

let currUser=JSON.parse(localStorage.getItem("currUser"));
let users=JSON.parse(localStorage.getItem("users")) ||[];


// agar user login nhi h to login page pe bhej do
if(!currUser){
    alert("Please login first!");
    window.location.href="login.html";
}else{
let allProducts=[];


async function fetchProducts() {
    try{
        let res=await fetch("https://fakestoreapi.com/products");
        allProducts=await res.json();
        displayProducts(allProducts);
        
    }catch(error){
   console.error("Error fetching products:", error);
    }
}

// display products dynamically

function displayProducts(products){
    productContainer.innerHTML="";
    products.forEach(p => {
        let card=document.createElement("div");
        card.classList.add("product-card");


        card.innerHTML=`
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
          `

            productContainer.appendChild(card);
    });
}



function addToCart(id){
    // localStorage se existing cart items lo
    let cart = JSON.parse(localStorage.getItem("myCart")) || [];

    // product find karo
    let product = allProducts.find(p => p.id === id);

    // duplicate check (optional)
    if(!cart.find(p => p.id === id)){
        cart.push(product);
    }

    // localStorage me save karo
    localStorage.setItem("myCart", JSON.stringify(cart));

    alert("Item added to cart!");
}



searchInput.addEventListener("input", () => {
    let keyword = searchInput.value.toLowerCase();

    let filtered = allProducts.filter(p => 
        p.title.toLowerCase().includes(keyword) // return automatically ho raha arrow function me
    );

    displayProducts(filtered);
});


checkboxes.forEach(cb => {
    cb.addEventListener("change", () => {
        let selected = Array.from(checkboxes)
            .filter(c => c.checked)
            .map(c => c.value);

        let filtered = allProducts.filter(p => 
            selected.length ? selected.includes(p.category) : true
        );

        displayProducts(filtered);
    });
});



sortSelect.addEventListener("change",()=>{
    let value=sortSelect.value;
    let sorted=[...allProducts];

    if(value==="low-high"){
        sorted.sort((a,b)=>a.price - b.price);
    }else if(value==="high-low"){
        sorted.sort((a,b)=>b.price - a.price);
    }
    displayProducts(sorted);
})
fetchProducts();
}
