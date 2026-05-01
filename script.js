document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });

    // 1. Inicializar Swipers com Autoplay adaptativo
    new Swiper('.mainSwiper', {
        loop: true,
        autoplay: { delay: 4000 },
        pagination: { el: '.swiper-pagination', clickable: true }
    });

    new Swiper('.infoSwiper', {
        slidesPerView: 1.1, // Mostra um pedaço do próximo slide (peek) no mobile
        spaceBetween: 15,
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 }
        }
    });

    // 2. Lógica do Modal Responsivo
    const modal = document.getElementById('modalFiliacao');
    const modalContent = document.getElementById('modalContent');
    const triggers = document.querySelectorAll('a[href="#filiacao"]');

    const openFiliacao = async (e) => {
        if(e) e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        modalContent.innerHTML = `<div class="p-10 text-center"><div class="animate-spin h-8 w-8 border-4 border-green-800 border-t-transparent rounded-full mx-auto"></div></div>`;

        try {
            const response = await fetch('form/index.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const content = doc.getElementById('filiacao');

            if (content) {
                modalContent.innerHTML = content.innerHTML;
                
                // Re-inicializa máscaras no formulário mobile
                const cpf = modalContent.querySelector('#cpf');
                const tel = modalContent.querySelector('#tel');
                if(cpf) IMask(cpf, { mask: '000.000.000-00' });
                if(tel) IMask(tel, { mask: '(00) 00000-0000' });
            }
        } catch (err) {
            modalContent.innerHTML = '<p class="p-6 text-center text-red-500">Erro ao carregar formulário.</p>';
        }
    };

    triggers.forEach(t => t.addEventListener('click', openFiliacao));
    
    document.getElementById('closeModal').onclick = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    // 3. Menu Mobile Simples
    const menuBtn = document.getElementById('mobileMenuBtn');
    menuBtn.onclick = () => {
        const desktopMenu = document.querySelector('header ul');
        desktopMenu.classList.toggle('hidden');
        desktopMenu.classList.toggle('flex');
        desktopMenu.classList.toggle('flex-col');
        desktopMenu.classList.toggle('absolute');
        desktopMenu.classList.toggle('top-16');
        desktopMenu.classList.toggle('left-0');
        desktopMenu.classList.toggle('w-full');
        desktopMenu.classList.toggle('bg-white');
        desktopMenu.classList.toggle('p-6');
        desktopMenu.classList.toggle('shadow-xl');
    };
});