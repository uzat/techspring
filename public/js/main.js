/* public/js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.className = savedTheme + '-mode';
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('light-mode') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.className = newTheme + '-mode';
        localStorage.setItem('theme', newTheme);
    });
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Rotating banner background (homepage only)
// Rotating banner background (homepage only) - Updated for 7 images
    if (document.querySelector('.hero')) {
        const bannerImages = [
            '/images/ai-banner-1.jpg',
            '/images/ai-banner-2.jpg',
            '/images/ai-banner-3.jpg',
            '/images/ai-banner-4.jpg',
            '/images/ai-banner-5.jpg',
            '/images/ai-banner-6.jpg',
            '/images/ai-banner-7.jpg'
        ];
        
        let currentImageIndex = 0;
        const heroSection = document.querySelector('.hero');
        
        const rotateBanner = () => {
            currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
            const nextImage = bannerImages[currentImageIndex];
            
            // Smooth background transition
            heroSection.style.backgroundImage = `url('${nextImage}')`;
        };
        
        // Set initial background
        heroSection.style.backgroundImage = `url('${bannerImages[0]}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
        heroSection.style.backgroundRepeat = 'no-repeat';
        
        // Rotate every 5 seconds
        setInterval(rotateBanner, 5000);
    }    
    // Enhanced time display with timezone detection
    if (document.getElementById('current-time')) {
        updateTime();
        setInterval(updateTime, 1000); // Update every second
    }
});

// Enhanced time function with better error handling
async function updateTime() {
    try {
        const timeElement = document.getElementById('current-time');
        if (!timeElement) return;
        
        // Use the browser's timezone
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        
        const timeString = now.toLocaleTimeString(undefined, options);
        const dateString = now.toLocaleDateString(undefined, {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });
        
        // Get timezone abbreviation
        const timeZoneAbbr = new Intl.DateTimeFormat('en', {
            timeZoneName: 'short'
        }).formatToParts(now).find(part => part.type === 'timeZoneName')?.value || '';
        
        timeElement.textContent = `${dateString} ${timeString} ${timeZoneAbbr}`;
        
    } catch (error) {
        console.log('Time update error:', error.message);
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = `${new Date().toLocaleString()}`;
        }
    }
}