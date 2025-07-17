document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const signaturePreview = document.getElementById('signature-preview');
    const nameInput = document.getElementById('name');
    const departmentInput = document.getElementById('department');
    const extensionInput = document.getElementById('extension');

    generateBtn.addEventListener('click', () => {
        const name = nameInput.value;
        const department = departmentInput.value;
        const extension = extensionInput.value;

        if (name && department && extension) {
            const signatureHTML = `
                <div class="signature" id="signature-content">
                    <img src="img/sesc.png" alt="Sesc Logo">
                    <p class="name">${name}</p>
                    <p>${department}</p>
                    <div class="separator"></div>
                    <div class="contact-info">
                        <p>Sesc Pinheiros</p>
                        <p>+55 11 3095-${extension}</p>
                        <p><a href="http://sescsp.org.br">sescsp.org.br</a></p>
                    </div>
                </div>
            `;
            signaturePreview.innerHTML = signatureHTML;
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    copyBtn.addEventListener('click', () => {
        const signatureContent = document.getElementById('signature-content');
        if (signatureContent) {
            html2canvas(signatureContent).then(canvas => {
                canvas.toBlob(blob => {
                    try {
                        navigator.clipboard.write([
                            new ClipboardItem({
                                'image/png': blob
                            })
                        ]);
                        alert('Assinatura copiada para a área de transferência!');
                    } catch (error) {
                        console.error('Erro ao copiar a imagem: ', error);
                        alert('Erro ao copiar a imagem. Verifique as permissões do navegador.');
                    }
                });
            });
        } else {
            alert('Gere uma assinatura primeiro.');
        }
    });
});
