

let cartContainer = document.getElementById("cart-container");

// localStorage se cart items read karo
let cartItems = JSON.parse(localStorage.getItem("myCart")) || [];

// display function
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

        // Delete button functionality
        div.querySelector(".delete-btn").addEventListener("click", () => {
            // Remove item from cartItems array
            cartItems.splice(index, 1);

            // Update localStorage
            localStorage.setItem("myCart", JSON.stringify(cartItems));

            // Re-render cart
            displayCart();
        });
    });
}

// Initial render
displayCart();