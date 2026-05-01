document.addEventListener('DOMContentLoaded', () => {
    
    // Inicialização do Swiper com observadores dinâmicos
    const swiperOptions = {
        loop: false,
        observer: true,
        observeParents: true,
        watchOverflow: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
    };

    const mainSwiper = new Swiper('.mainSwiper', { ...swiperOptions, autoplay: { delay: 5000 } });
    const infoSwiper = new Swiper('.infoSwiper', { ...swiperOptions, spaceBetween: 20 });

    // Lógica do Modal
    const modal = document.getElementById('modalFiliacao');
    const modalContent = document.getElementById('modalContent');
    const triggers = document.querySelectorAll('#filiacaoBtn, a[href="#filiacao"]');

    const openModal = async (e) => {
        if(e) e.preventDefault();
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        modalContent.innerHTML = '<div class="p-20 text-center font-bold text-slate-300 uppercase tracking-widest animate-pulse">Carregando formulário...</div>';

        try {
            const resp = await fetch('form/index.html');
            const html = await resp.text();
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const content = doc.getElementById('filiacao');
            
            if(content) {
                modalContent.innerHTML = content.innerHTML;
                // Re-inicializa máscaras no formulário injetado
                const cpf = modalContent.querySelector('#cpf');
                if(cpf) IMask(cpf, { mask: '000.000.000-00' });
                
                // Forçar o navegador a entender o novo conteúdo para scroll
                modalContent.scrollTo(0,0);
            }
        } catch (err) {
            modalContent.innerHTML = '<div class="p-10 text-red-500 font-bold">Erro ao carregar pasta /form/index.html</div>';
        }
    };

    triggers.forEach(t => t.addEventListener('click', openModal));
    
    document.getElementById('closeModal').onclick = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    // Ajuste de Redesenho (Anti-Quebra)
    window.addEventListener('resize', () => {
        mainSwiper.update();
        infoSwiper.update();
    });
});