document.addEventListener('DOMContentLoaded', () => {
    // Aplicação de Máscaras
    const cpfInput = document.getElementById('cpf');
    const telInput = document.getElementById('tel');

    if(cpfInput) IMask(cpfInput, { mask: '000.000.000-00' });
    if(telInput) IMask(telInput, { mask: '(00) 00000-0000' });

    // Lógica do Form
    const form = document.getElementById('formCadastro');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = `
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processando...
        `;

        // Simulação de envio para o cliente ver o estado de "loading"
        setTimeout(() => {
            alert('Cadastro enviado com sucesso! O sistema processará o comprovante de filiação.');
            location.reload();
        }, 2000);
    });
});