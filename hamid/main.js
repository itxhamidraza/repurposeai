
document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const fadeInElements = document.querySelectorAll('.fade-in');
    const slideUpElements = document.querySelectorAll('.slide-up');

    const fadeInObserver = new IntersectionObserver(animateOnScroll, observerOptions);
    fadeInElements.forEach(el => fadeInObserver.observe(el));

    const slideUpObserver = new IntersectionObserver(animateOnScroll, observerOptions);
    slideUpElements.forEach(el => slideUpObserver.observe(el));

    // FAQ Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            const accordionContent = accordionItem.querySelector('.accordion-content');

            // Toggle active class on header
            header.classList.toggle('active');

            // Set max-height for smooth transition
            if (header.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                accordionContent.style.paddingTop = '10px'; // Add padding when open
                accordionContent.style.paddingBottom = '20px'; // Add padding when open
            } else {
                accordionContent.style.maxHeight = '0';
                accordionContent.style.paddingTop = '0'; // Remove padding when closed
                accordionContent.style.paddingBottom = '0'; // Remove padding when closed
            }

            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.closest('.accordion-item').querySelector('.accordion-content');
                    otherContent.style.maxHeight = '0';
                    otherContent.style.paddingTop = '0';
                    otherContent.style.paddingBottom = '0';
                }
            });
        });
    });
});
