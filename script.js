document.addEventListener('DOMContentLoaded', () => {
    
    // Função para inicializar carrosséis com segurança
    const startSwipers = () => {
        new Swiper('.mainSwiper', {
            loop: true,
            autoplay: { delay: 4000 },
            observer: true,
            observeParents: true
        });

        new Swiper('.infoSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            observer: true,
            observeParents: true
        });
    };

    startSwipers();

    // FORÇAR REDESENHO (Garante que as alturas sejam calculadas após o carregamento total)
    window.onload = () => {
        window.dispatchEvent(new Event('resize'));
    };

    // Lógica do Modal
    const modal = document.getElementById('modalFiliacao');
    const modalContent = document.getElementById('modalContent');
    const triggers = document.querySelectorAll('#filiacaoBtn, a[href="#filiacao"]');

    const openModal = async () => {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        modalContent.innerHTML = '<div class="p-20 text-center">Carregando...</div>';

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