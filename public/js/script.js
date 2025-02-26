const itemTableBody = document.getElementById("itemTableBody");

// Include toaster functionality
function showToast(message, type = "success") {
    let toastContainer = document.getElementById('toastContainer');

    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.position = 'fixed';
        toastContainer.style.top = '20px';
        toastContainer.style.right = '20px';
        toastContainer.style.zIndex = '1000';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.padding = '10px 20px';
    toast.style.margin = '5px';
    toast.style.borderRadius = '5px';
    toast.style.color = '#fff';
    toast.style.fontSize = '14px';
    toast.style.display = 'inline-block';
    toast.style.animation = 'fadeOut 3s forwards';
    
    if (type === "success") {
        toast.style.backgroundColor = '#28a745';
    } else if (type === "error") {
        toast.style.backgroundColor = '#dc3545';
    } else {
        toast.style.backgroundColor = '#6c757d';
    }

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

document.getElementById("AddItemBtn").addEventListener("click", addItem);

window.addEventListener("DOMContentLoaded", () => {
    fetch("/items")
        .then(response => response.json())
        .then(items => {
            items.forEach(item => addItemToTable(item));
        })
        .catch(error => {
            console.error(error);
            showToast("Failed to fetch items!", "error");
        });
});

function addItem() {
    const itemName = document.getElementById("ItemName").value.trim();
    const description = document.getElementById("Description").value.trim();
    const price = document.getElementById("Price").value.trim();
    const quantity = document.getElementById("Quantity").value.trim();

    if (!itemName || !description || !price || !quantity) {
        showToast("All fields are required!", "error");
        return;
    }

    const item = { itemName, description, price, quantity };

    fetch("/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    })
    .then(response => response.json())
    .then(data => {
        addItemToTable(data);
        document.getElementById("ItemName").value = "";
        document.getElementById("Description").value = "";
        document.getElementById("Price").value = "";
        document.getElementById("Quantity").value = "";
        showToast("Item added successfully!", "success");
    })
    .catch(error => {
        console.error(error);
        showToast("Failed to add item!", "error");
    });
}

function addItemToTable(item) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.itemName}</td>
        <td>${item.description}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td><button class="btn btn-primary buy-btn" data-id="${item.id}" data-quantity="-1">Buy 1</button></td>
        <td><button class="btn btn-primary buy-btn" data-id="${item.id}" data-quantity="-2">Buy 2</button></td>
        <td><button class="btn btn-primary buy-btn" data-id="${item.id}" data-quantity="-3">Buy 3</button></td>
    `;
    itemTableBody.appendChild(row);
}

itemTableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("buy-btn")) {
        const itemId = event.target.dataset.id;
        const quantityChange = parseInt(event.target.dataset.quantity);
        
        const row = event.target.parentElement.parentElement;
        updateQuantity(itemId, quantityChange, row);
    }
});

function updateQuantity(itemId, quantityChange, row) {
    const currentQuantity = parseInt(row.cells[4].textContent);
    const newQuantity = Math.max(currentQuantity + quantityChange, 0);

    fetch(`/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity })
    })
    .then(response => response.json())
    .then(() => {
        row.cells[4].textContent = newQuantity;
        if (newQuantity === 0) {
            row.querySelectorAll(".buy-btn").forEach(btn => btn.disabled = true);
        }
        showToast("Quantity updated successfully!", "success");
    })
    .catch(error => {
        console.error(error);
        showToast("Failed to update quantity!", "error");
    });
}
