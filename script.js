document.addEventListener('DOMContentLoaded', () => {
    // 1. AOS - Animações
    AOS.init({ duration: 800, once: true });

    // 2. Lógica do Modal e Carregamento do /form
    const modal = document.getElementById('modalFiliacao');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');
    const triggerBtn = document.getElementById('filiacaoBtn');

    const openFiliacao = async (e) => {
        if(e) e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        modalContent.innerHTML = `
            <div class="flex flex-col items-center justify-center py-40">
                <div class="animate-spin h-10 w-10 border-4 border-green-800 border-t-transparent rounded-full mb-4"></div>
                <p class="text-slate-400 font-bold uppercase text-[10px]">Carregando formulário oficial...</p>
            </div>
        `;

        try {
            const response = await fetch('form/index.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.getElementById('filiacao');

            if(content) {
                modalContent.innerHTML = content.innerHTML;
                // Re-inicializa máscaras no form injetado
                const cpf = modalContent.querySelector('#cpf');
                const tel = modalContent.querySelector('#tel');
                if(cpf) IMask(cpf, { mask: '000.000.000-00' });
                if(tel) IMask(tel, { mask: '(00) 00000-0000' });
            }
        } catch (err) {
            modalContent.innerHTML = '<p class="p-10 text-center text-red-500 font-bold">Erro ao carregar pasta /form/index.html</p>';
        }
    };

    if(triggerBtn) triggerBtn.addEventListener('click', openFiliacao);
    
    // Suporte para links <a> que apontam para filiação
    document.querySelectorAll('a[href="#filiacao"]').forEach(a => {
        a.addEventListener('click', openFiliacao);
    });

    closeModal.onclick = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    // Auto-scroll para o carrossel nativo (opcional)
    const carousel = document.querySelector('.carousel-container');
    if(carousel) {
        setInterval(() => {
            if(carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
                carousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carousel.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
            }
        }, 5000);
    }
});