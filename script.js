document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 800, once: true });

    // CARROSSEL PRINCIPAL
    new Swiper('.mainSwiper', {
        loop: true,
        autoplay: { delay: 5000 },
        pagination: { el: '.swiper-pagination', clickable: true },
        observer: true,
        observeParents: true
    });

    // CARROSSEL INFORMATIVOS
    new Swiper('.infoSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        breakpoints: {
            1024: { slidesPerView: 2, centeredSlides: false }
        },
        autoplay: { delay: 4000 }
    });

    // LÓGICA DO MODAL
    const modal = document.getElementById('modalFiliacao');
    const modalContent = document.getElementById('modalContent');
    const triggers = document.querySelectorAll('a[href="#filiacao"], #filiacaoBtn');

    const openModal = async (e) => {
        if(e) e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        modalContent.innerHTML = '<div class="p-20 text-center animate-pulse font-bold text-slate-300">Carregando...</div>';

        try {
            const resp = await fetch('form/index.html');
            const html = await resp.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const content = doc.getElementById('filiacao');
            if(content) {
                modalContent.innerHTML = content.innerHTML;
                const cpf = modalContent.querySelector('#cpf');
                if(cpf) IMask(cpf, { mask: '000.000.000-00' });
            }
        } catch (e) {
            modalContent.innerHTML = '<div class="p-10">Erro ao carregar pasta /form.</div>';
        }
    };

    triggers.forEach(t => t.onclick = openModal);
    document.getElementById('closeModal').onclick = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };
});