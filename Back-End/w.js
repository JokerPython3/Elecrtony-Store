async function fetchProducts() {
  try {
    const res = await fetch("/products");
    if (!res.ok) throw new Error('Failed to fetch products');
    const products = await res.json();
    const container = document.getElementById("product-list");
    container.innerHTML = "";
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${p.file || 'https://via.placeholder.com/200'}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>${p.des}</p>
        <strong>$${p.price}</strong>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchProducts();

function openModal() {
  document.getElementById("addProductModal").style.display = "block";
}
function closeModal() {
  document.getElementById("addProductModal").style.display = "none";
}

window.onclick = function(event) {
  if (event.target == document.getElementById("addProductModal")) {
    closeModal();
  }
};