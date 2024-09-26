function myFunction() {
    alert("Button clicked!");
}
function handleFileChange(event) {
            const fileInput = event.target;
            const fileName = document.getElementById('file-name');
            fileName.textContent = fileInput.files.length ? fileInput.files[0].name : 'No file chosen';
        }

        function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const fileInput = form.querySelector('input[type="file"]');
    const file = fileInput.files[0];

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
        showNotification('File size exceeds 2MB', 'error');
        return;
    }

    const whatsappNumber = formData.get('whatsapp');
    if (!/^\+(88|91|92|1)\d{10,15}$/.test(whatsappNumber)) {
        showNotification('Invalid WhatsApp number. Please enter a valid number with country code.', 'error');
        return;
    }

    const botToken = '7442919516:AAGi6dZgKgLJYspus3sSeKKVsn7mP13Wr-w';
    const channelId = '5187944932';

    const url = `https://api.telegram.org/bot${botToken}/sendDocument`;

    const data = new FormData();
    data.append('chat_id', channelId);
    data.append('document', file);
    data.append('caption', `Name: ${formData.get('name')}\nWhatsApp: https://wa.me/${formData.get('whatsapp')}\nPayment Method: ${formData.get('payment_method')}\nPayment Number: ${formData.get('payment_number')}\nCategory: ${formData.get('category')}`);

    fetch(url, {
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showNotification('File sent successfully!', 'success');
            setTimeout(() => location.reload(), 2000);
        } else {
            showNotification(`Failed to send file. Error: ${data.description}`, 'error');
        }
    })
    .catch(error => showNotification(`An error occurred: ${error}`, 'error'));
}


        function showNotification(message, type) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.style.background = type === 'success' ? '#4caf50' : '#f44336';
            notification.style.display = 'block';
            setTimeout(() => notification.style.display = 'none', 5000);
        }
