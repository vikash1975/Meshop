async function loadCart() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = ""; 

    // Filter clothing products
    const clothes = data.filter(item => item.category.includes("clothing"));

    clothes.forEach(item => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <h3>${item.title}</h3>
        <p>Price: $${item.price}</p>
        <img src="${item.image}" alt="${item.title}" width="100">
      `;
      cartContainer.appendChild(div);
    });

  } catch (error) {
    console.error("Cart fetch error:", error);
    document.getElementById("cart-items").innerHTML = "<p>Error loading cart.</p>";
  }
}

loadCart();