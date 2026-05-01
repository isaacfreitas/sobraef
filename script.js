document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Animações
    AOS.init({ duration: 800, once: true });

    // 2. FUNÇÃO DE SEGURANÇA PARA INICIALIZAR CARROSSEL
    const initSwipers = () => {
        const infoEl = document.querySelector('.infoSwiper');
        
        if (infoEl) {
            new Swiper('.infoSwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
                loop: false, // Evita sumir com apenas um slide
                breakpoints: {
                    1024: {
                        slidesPerView: 2,
                        centeredSlides: false
                    }
                },
                observer: true,
                observeParents: true,
            });
            console.log("Carrossel Informativo Inicializado");
        }
    };

    // Tenta inicializar imediatamente e após um pequeno delay para garantir
    initSwipers();
    setTimeout(initSwipers, 500);

    // 3. Lógica do Modal
    const modal = document.getElementById('modalFiliacao');
    const modalContent = document.getElementById('modalContent');
    const triggers = document.querySelectorAll('a[href="#filiacao"]');

    const openFiliacao = async (e) => {
        if(e) e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        modalContent.innerHTML = `<div class="p-20 text-center flex flex-col items-center">
            <div class="animate-spin h-10 w-10 border-4 border-green-800 border-t-transparent rounded-full mb-4"></div>
            <span class="text-xs font-bold text-gray-400">CARREGANDO...</span>
        </div>`;

        try {
            const response = await fetch('form/index.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.getElementById('filiacao');

            if(content) {
                modalContent.innerHTML = content.innerHTML;
                const cpf = modalContent.querySelector('#cpf');
                const tel = modalContent.querySelector('#tel');
                if(cpf) IMask(cpf, { mask: '000.000.000-00' });
                if(tel) IMask(tel, { mask: '(00) 00000-0000' });
            }
        } catch (err) {
            modalContent.innerHTML = '<p class="p-10 text-center text-red-500">Erro ao carregar formulário.</p>';
        }
    };

    triggers.forEach(t => t.addEventListener('click', openFiliacao));
    document.getElementById('closeModal').onclick = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };
});