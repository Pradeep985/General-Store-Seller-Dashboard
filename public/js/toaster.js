// public/js/toaster.js
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
    toast.style.padding = '20px 40px';
    toast.style.margin = '5px';
    toast.style.borderRadius = '5px';
    toast.style.color = '#fff';
    toast.style.fontSize = '14px';
    toast.style.display = 'inline-block';
    toast.style.animation = 'fadeOut 3s forwards';
    
    if (type == "success") {
        toast.style.backgroundColor = '#28a745';
    } else if (type == "error") {
        toast.style.backgroundColor = '#dc3545';
    } else {
        toast.style.backgroundColor = '#6c757d';
    }

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
