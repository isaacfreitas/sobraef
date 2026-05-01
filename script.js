document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Animações de Scroll
    AOS.init({
        duration: 800,
        once: true
    });

    // 2. Inicializar Carrossel (Swiper)
    const swiper = new Swiper('.pubSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: { delay: 4000 },
        breakpoints: {
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
        },
    });

    // 3. Máscara de CPF (IMask)
    const cpfElement = document.getElementById('cpf');
    IMask(cpfElement, { mask: '000.000.000-00' });

    // 4. Lógica Simples do Formulário (Feedback UX)
    const form = document.getElementById('formFiliacao');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        
        // Simulação de Loading
        btn.innerText = "Processando...";
        btn.disabled = true;
        btn.classList.add('opacity-70');

        setTimeout(() => {
            alert('🎉 Solicitação enviada com sucesso! Você receberá um e-mail em breve.');
            btn.innerText = originalText;
            btn.disabled = false;
            btn.classList.remove('opacity-70');
            form.reset();
        }, 2000);
    });

    // 5. Menu Mobile Toggle
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.addEventListener('click', () => {
        alert('Aqui abriria o Menu lateral responsivo na versão final.');
    });
});