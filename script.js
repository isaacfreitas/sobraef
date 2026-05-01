document.addEventListener('DOMContentLoaded', () => {
    // Inicializa Animações
    AOS.init({ duration: 800, once: true });

    // Swiper Principal (Avisos)
    new Swiper('.mainSwiper', {
        loop: true,
        autoplay: { delay: 5000 },
        pagination: { el: '.swiper-pagination', clickable: true }
    });

    // Swiper Informativos (Correção de Centralização)
    new Swiper('.infoSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true, // Garante centralização no mobile
        breakpoints: {
            1024: {
                slidesPerView: 2,
                centeredSlides: false
            }
        },
        autoplay: { delay: 4000 }
    });

    // Lógica do Modal Responsivo
    const modal = document.getElementById('modalFiliacao');
    const modalContent = document.getElementById('modalContent');
    const triggers = document.querySelectorAll('a[href="#filiacao"]');

    const openFiliacao = async (e) => {
        if(e) e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        modalContent.innerHTML = `<div class="p-20 text-center flex flex-col items-center">
            <div class="animate-spin h-10 w-10 border-4 border-green-800 border-t-transparent rounded-full mb-4"></div>
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Carregando...</span>
        </div>`;

        try {
            const response = await fetch('form/index.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.getElementById('filiacao');

            if(content) {
                modalContent.innerHTML = content.innerHTML;
                
                // Re-inicializa máscaras no formulário injetado
                const cpf = modalContent.querySelector('#cpf');
                const tel = modalContent.querySelector('#tel');
                if(cpf) IMask(cpf, { mask: '000.000.000-00' });
                if(tel) IMask(tel, { mask: '(00) 00000-0000' });
            }
        } catch (err) {
            modalContent.innerHTML = '<p class="p-10 text-center text-red-500 font-bold">Erro ao carregar formulário.</p>';
        }
    };

    triggers.forEach(t => t.addEventListener('click', openFiliacao));
    document.getElementById('closeModal').onclick = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };
});