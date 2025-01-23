document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le formulaire de soumettre de manière traditionnelle

    var formData = new FormData(event.target);

    var data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    fetch('https://example.com/send-email', { //http://localhost:3000/send-email
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert('Message envoyé avec succès !');
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Il y a eu un problème avec l\'envoi du message.');
        });
});