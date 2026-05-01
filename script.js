document.addEventListener('DOMContentLoaded', () => {
    // 1. AOS Animações
    AOS.init({ duration: 800, once: true });

    // 2. Carrosséis com configurações de redundância (Evita sumir no mobile)
    const initSwipers = () => {
        new Swiper('.mainSwiper', {
            loop: true,
            autoplay: { delay: 5000 },
            pagination: { el: '.swiper-pagination', clickable: true },
            observer: true,
            observeParents: true
        });

        new Swiper('.infoSwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5 }
            },
            observer: true,
            observeParents: true
        });
    };

    initSwipers();

    // 3. Lógica do Modal de Filiação
    const modal = document.getElementById('modalFiliacao');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');
    const triggers = document.querySelectorAll('a[href="#filiacao"]');

    const openFiliacao = async (e) => {
        if(e) e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        modalContent.innerHTML = `<div class="p-20 text-center flex flex-col items-center justify-center">
            <div class="animate-spin h-10 w-10 border-4 border-green-800 border-t-transparent rounded-full mb-4"></div>
            <p class="text-gray-400 font-bold uppercase text-xs">Carregando formulário...</p>
        </div>`;

        try {
            const response = await fetch('form/index.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.getElementById('filiacao');

            if (content) {
                modalContent.innerHTML = content.innerHTML;
                const cpf = modalContent.querySelector('#cpf');
                const tel = modalContent.querySelector('#tel');
                if(cpf) IMask(cpf, { mask: '000.000.000-00' });
                if(tel) IMask(tel, { mask: '(00) 00000-0000' });
            }
        } catch (error) {
            modalContent.innerHTML = '<div class="p-10 text-center text-red-500">Erro ao carregar pasta /form.</div>';
        }
    };

    triggers.forEach(trigger => trigger.addEventListener('click', openFiliacao));
    closeModal.onclick = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };
});