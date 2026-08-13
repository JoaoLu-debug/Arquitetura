document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.getElementById('main-building-img');
    const thumbBoxes = document.querySelectorAll('.thumb-box');
    const exploreBtn = document.getElementById('explore-btn');

    // Add fade effect for image transitions
    mainImg.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';

    thumbBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (box.classList.contains('active')) return;

            const newSrc = box.getAttribute('data-src');

            // 1. Remove active class from all thumbnails
            thumbBoxes.forEach(t => t.classList.remove('active'));

            // 2. Add active class to clicked thumbnail
            box.classList.add('active');

            // 3. Fade out main image, swap source, fade in
            mainImg.style.opacity = '0';
            
            setTimeout(() => {
                mainImg.src = newSrc;
                
                // Once image is loaded, fade back in
                mainImg.onload = () => {
                    mainImg.style.opacity = '1';
                };
            }, 300);
        });
    });

    // Subtle button click effect
    exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Visual indicator that it was clicked
        exploreBtn.style.transform = 'scale(0.95) translateY(0px)';
        setTimeout(() => {
            exploreBtn.style.transform = '';
            alert('Acessando o projeto corporativo de arquitetura Ergo...');
        }, 150);
    });
});
