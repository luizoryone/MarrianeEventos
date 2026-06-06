document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.menu-list a');
    const sections = document.querySelectorAll('.category-section');
    const nav = document.querySelector('.scrolling-menu');
    const navHeight = nav.offsetHeight;

    // Rolagem suave e ativação do item ao clicar no menu
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calcula a posição descontando o menu fixo
                const targetPosition = targetSection.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualiza classe ativa
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Atualização do item ativo ao dar scroll na página
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + navHeight + 20;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
                
                // Rolar o menu horizontalmente para manter o item ativo visível no mobile
                const menuList = document.querySelector('.scrolling-menu');
                const activeItem = link.parentElement;
                
                const scrollLeft = activeItem.offsetLeft - (menuList.offsetWidth / 2) + (activeItem.offsetWidth / 2);
                menuList.scrollTo({
                    left: scrollLeft,
                    behavior: 'smooth'
                });
            }
        });
    });
});
