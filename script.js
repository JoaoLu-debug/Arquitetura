document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.getElementById('main-building-img');
    const thumbBoxes = document.querySelectorAll('.thumb-box');
    const exploreBtn = document.getElementById('explore-btn');
    const refreshBtn = document.getElementById('refresh-layout-btn');

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

    // Handle refresh layout button (shuffles active project view randomly)
    refreshBtn.addEventListener('click', () => {
        // Apply temporary spin animation
        refreshBtn.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        refreshBtn.style.transform = 'rotate(360deg)';
        
        setTimeout(() => {
            refreshBtn.style.transition = 'none';
            refreshBtn.style.transform = '';
            // Reset transition for hover rules in CSS
            setTimeout(() => {
                refreshBtn.style.transition = '';
            }, 50);
        }, 600);

        // Find inactive thumbnails
        const inactiveThumbs = Array.from(thumbBoxes).filter(t => !t.classList.contains('active'));
        if (inactiveThumbs.length > 0) {
            // Select and click a random inactive thumbnail
            const randomIndex = Math.floor(Math.random() * inactiveThumbs.length);
            inactiveThumbs[randomIndex].click();
        }
    });

    // Subtle button click effect for the main CTA
    exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Visual indicator that it was clicked
        exploreBtn.style.transform = 'scale(0.96) translateY(0px)';
        setTimeout(() => {
            exploreBtn.style.transform = '';
            alert('Acessando o portfólio completo de arquitetura Ergo...');
        }, 150);
    });
});
