document.addEventListener('DOMContentLoaded', () => {
    // 1. AOS - Animações de entrada suaves
    AOS.init({ duration: 800, once: true, offset: 50 });

    // 2. Inicializar Swiper Principal (Avisos)
    const mainSwiper = new Swiper('.mainSwiper', {
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        observer: true, 
        observeParents: true // Importante para recalcular o tamanho ao abrir modais/mudar aba
    });

    // 3. Lógica do Modal com Carregamento via Fetch
    const modal = document.getElementById('modalFiliacao');
    const modalContent = document.getElementById('modalContent');
    const filiacaoTriggers = document.querySelectorAll('a[href="#filiacao"]');

    const openFiliacao = async (e) => {
        if(e) e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        modalContent.innerHTML = `
            <div class="flex flex-col items-center justify-center h-64">
                <div class="animate-spin h-10 w-10 border-4 border-green-800 border-t-transparent rounded-full mb-4"></div>
                <p class="text-slate-400 font-bold text-xs uppercase tracking-widest">Carregando formulário oficial...</p>
            </div>
        `;

        try {
            const response = await fetch('form/index.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const formSection = doc.getElementById('filiacao');

            if (formSection) {
                modalContent.innerHTML = formSection.innerHTML;
                
                // Re-inicializa máscaras (IMask) no formulário carregado
                const cpf = modalContent.querySelector('#cpf');
                const tel = modalContent.querySelector('#tel');
                if(cpf) IMask(cpf, { mask: '000.000.000-00' });
                if(tel) IMask(tel, { mask: '(00) 00000-0000' });
            }
        } catch (error) {
            modalContent.innerHTML = `<p class="p-10 text-center text-red-500 font-bold">Erro ao carregar pasta /form. Verifique o caminho.</p>`;
        }
    };

    filiacaoTriggers.forEach(t => t.addEventListener('click', openFiliacao));
    document.getElementById('closeModal').onclick = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    // 4. Menu Mobile Simples (Toggle)
    const menuBtn = document.getElementById('mobileMenuBtn');
    menuBtn.onclick = () => {
        const desktopMenu = document.querySelector('header ul');
        desktopMenu.classList.toggle('hidden');
        // Se desejar um menu mobile mais elaborado, pode-se criar um modal lateral aqui
    };
});