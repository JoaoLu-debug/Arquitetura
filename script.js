document.addEventListener('DOMContentLoaded', () => {
    const mainImg = document.getElementById('main-building-img');
    const thumbBoxes = document.querySelectorAll('.thumb-box');

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

    // Custom scroll zoom parallax for the bottom large image frame
    const largeFrame = document.querySelector('.large-image-frame');
    const largeImg = largeFrame ? largeFrame.querySelector('img') : null;

    if (largeFrame && largeImg) {
        // Prepare initial transform styles
        largeImg.style.transition = 'transform 0.1s ease-out, filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        
        window.addEventListener('scroll', () => {
            const rect = largeFrame.getBoundingClientRect();
            const viewHeight = window.innerHeight;

            // Check if the large image frame is visible on the screen
            if (rect.top < viewHeight && rect.bottom > 0) {
                // Calculate scroll progress (0 when entering bottom, 1 when exiting top)
                const scrollProgress = (viewHeight - rect.top) / (viewHeight + rect.height);
                
                // Scale from 1.0 to 1.08
                const scale = 1.0 + (scrollProgress * 0.08);
                
                // Apply transformation
                largeImg.style.transform = `scale(${scale})`;
            }
        });
    }

    // Connect play circle visual click effect
    const playCircle = document.querySelector('.play-btn-circle');
    if (playCircle) {
        playCircle.addEventListener('click', () => {
            playCircle.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                playCircle.style.transform = '';
                alert('Iniciando apresentação cinematográfica do projeto Ergo...');
            }, 150);
        });
    }
});
