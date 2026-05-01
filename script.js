document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Animações AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // 2. Inicializar Carrossel Principal (Avisos)
    const mainSwiper = new Swiper('.mainSwiper', {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    // 3. Inicializar Carrossel de Informativos (Eventos)
    const infoSwiper = new Swiper('.infoSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: false,
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 }
        },
        autoplay: {
            delay: 4000,
        }
    });

    // 4. Lógica de Modal e Carregamento do Formulário /form
    const modal = document.getElementById('modalFiliacao');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');
    const triggers = document.querySelectorAll('a[href="#filiacao"]');

    const openFiliacao = async (e) => {
        if(e) e.preventDefault();
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Placeholder de Loading
        modalContent.innerHTML = `
            <div class="flex flex-col items-center justify-center py-40">
                <div class="animate-spin h-14 w-14 border-4 border-green-800 border-t-transparent rounded-full mb-6"></div>
                <p class="text-slate-500 font-bold uppercase tracking-widest text-xs">Carregando Formulário Oficial...</p>
            </div>
        `;

        try {
            const response = await fetch('form/index.html');
            const html = await response.text();
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const formContainer = doc.getElementById('filiacao');

            if (formContainer) {
                // Injeta o HTML da pasta /form
                modalContent.innerHTML = formContainer.innerHTML;
                
                // Re-inicializa máscaras IMask no formulário injetado
                const cpfInput = modalContent.querySelector('#cpf');
                const telInput = modalContent.querySelector('#tel');
                if(cpfInput) IMask(cpfInput, { mask: '000.000.000-00' });
                if(telInput) IMask(telInput, { mask: '(00) 00000-0000' });

                // Lógica de Envio
                const form = modalContent.querySelector('form');
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const btn = form.querySelector('button');
                    btn.innerText = "Enviando...";
                    btn.disabled = true;
                    
                    setTimeout(() => {
                        alert('✅ Solicitação de filiação enviada com sucesso! A SOBRAEF analisará seus dados.');
                        closeFiliacao();
                    }, 2000);
                });
            }
        } catch (error) {
            modalContent.innerHTML = `<div class="p-20 text-center text-red-500 font-bold">Erro técnico ao carregar formulário. Verifique se o arquivo form/index.html existe.</div>`;
        }
    };

    const closeFiliacao = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    triggers.forEach(btn => btn.addEventListener('click', openFiliacao));
    closeModal.addEventListener('click', closeFiliacao);

    // Fechar ao clicar no fundo
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.classList.contains('absolute')) {
            // Verifica se não clicou dentro do card branco
            if(e.target.id === 'modalFiliacao') closeFiliacao();
        }
    });

    // 5. Mudança de Estilo do Header no Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});