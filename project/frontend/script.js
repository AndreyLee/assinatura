document.getElementById('signature-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const sector = document.getElementById('sector').value;
    const extension = document.getElementById('extension').value;

    fetch('http://localhost:5000/generate_signature', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, sector, extension })
    })
    .then(response => response.json())
    .then(data => {
        if (data.image_path) {
            const preview = document.getElementById('signature-preview');
            preview.src = 'http://localhost:5000' + data.image_path;
            preview.style.display = 'block';
        } else {
            alert('Erro ao gerar assinatura: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocorreu um erro. Por favor, tente novamente.');
    });
});

document.getElementById('copy-button').addEventListener('click', function() {
    const imageUrl = document.getElementById('signature-preview').src;
    if (imageUrl) {
        navigator.clipboard.writeText(imageUrl).then(function() {
            alert('URL da imagem copiada para a área de transferência!');
        }, function(err) {
            console.error('Could not copy text: ', err);
            alert('Erro ao copiar a URL da imagem.');
        });
    } else {
        alert('Gere uma assinatura primeiro.');
    }
});
