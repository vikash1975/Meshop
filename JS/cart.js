let currUser = JSON.parse(localStorage.getItem("currUser"));
if(!currUser){
    alert("Please login first!");
    window.location.href = "login.html";
} else {
    let cartContainer = document.getElementById("cart-container");
    let cartKey = `cart_${currUser.email}`;
    let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];

    function displayCart() {
        cartContainer.innerHTML = "";

        if(cartItems.length === 0){
            cartContainer.innerHTML = "<p>Your cart is empty!</p>";
            return;
        }

        cartItems.forEach((item, index) => {
            let div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>₹${item.price}</p>
                <button class="delete-btn">Delete</button>
            `;
            cartContainer.appendChild(div);

            div.querySelector(".delete-btn").addEventListener("click", () => {
                cartItems.splice(index, 1);
                localStorage.setItem(cartKey, JSON.stringify(cartItems));
                displayCart();
            });
        });
    }

    displayCart();
}