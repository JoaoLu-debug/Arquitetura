document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.getElementById('main-building-img');
    const thumbBoxes = document.querySelectorAll('.thumb-box');
    const exploreBtn = document.getElementById('explore-btn');
    const refreshBtn = document.getElementById('refresh-layout-btn');

    // Add fade effect for image transitions in the hero gallery
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

    // Custom cinematic scroll parallax (Recreates the Siena Parallax / skiper29 effect)
    const parallaxSection = document.querySelector('.parallax-section');
    const parallaxBg = document.querySelector('.parallax-bg');

    if (parallaxSection && parallaxBg) {
        window.addEventListener('scroll', () => {
            const rect = parallaxSection.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            // Check if the parallax section is visible in the viewport
            if (rect.top < viewHeight && rect.bottom > 0) {
                // Calculate scroll progress (0 when entering bottom, 1 when exiting top)
                const scrollProgress = (viewHeight - rect.top) / (viewHeight + rect.height);
                
                // Translate vertically (-60px to +60px) and scale up (1.0 to 1.12)
                const translateY = (scrollProgress - 0.5) * -120;
                const scale = 1.0 + (scrollProgress * 0.12);
                
                // Apply transformations
                parallaxBg.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
            }
        });
    }

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
