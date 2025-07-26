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
    if (document.querySelector('.hero')) {
        const bannerImages = [
            '/images/ai-banner-1.jpg',
            '/images/ai-banner-2.jpg',
            '/images/ai-banner-3.jpg',
            '/images/ai-banner-4.jpg',
            '/images/ai-banner-5.jpg'
        ];
        
        let currentImageIndex = 0;
        const heroSection = document.querySelector('.hero');
        
        const rotateBanner = () => {
            currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
            
            // Create a temporary pseudo-element for smooth transition
            const nextImage = bannerImages[currentImageIndex];
            
            // Update the CSS background image with fade effect
            heroSection.style.setProperty('--next-bg', `url('${nextImage}')`);
            
            // Add a CSS class to trigger the transition
            heroSection.classList.add('transitioning');
            
            setTimeout(() => {
                // Update the main background after transition
                heroSection.style.backgroundImage = `url('${nextImage}')`;
                heroSection.classList.remove('transitioning');
            }, 500);
        };
        
        // Set initial background
        heroSection.style.backgroundImage = `url('${bannerImages[0]}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
        heroSection.style.backgroundRepeat = 'no-repeat';
        
        // Rotate every 5 seconds
        setInterval(rotateBanner, 5000);
    }
    
    // Time and weather display (homepage only)
    if (document.getElementById('current-time')) {
        updateTimeAndWeather();
        setInterval(updateTime, 1000);
        setInterval(updateWeather, 300000); // Update weather every 5 minutes
    }
});

async function updateTimeAndWeather() {
    await updateTime();
    await updateWeather();
}

async function updateTime() {
    try {
        const timeElement = document.getElementById('current-time');
        if (!timeElement) return;
        
        // Get user's location for timezone
        const response = await fetch('http://ip-api.com/json/');
        const locationData = await response.json();
        
        const timezone = locationData.timezone || 'Australia/Melbourne';
        const currentTime = new Date().toLocaleString('en-AU', {
            timeZone: timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        timeElement.textContent = `${locationData.city || 'Melbourne'}: ${currentTime}`;
    } catch (error) {
        console.error('Error updating time:', error);
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            timeElement.textContent = `Melbourne: ${new Date().toLocaleString('en-AU')}`;
        }
    }
}

async function updateWeather() {
    try {
        const weatherElement = document.getElementById('weather-info');
        if (!weatherElement) return;
        
        // Get user's location
        const locationResponse = await fetch('http://ip-api.com/json/');
        const locationData = await locationResponse.json();
        
        const lat = locationData.lat || -37.8136;
        const lon = locationData.lon || 144.9631;
        const city = locationData.city || 'Melbourne';
        
        // Mock weather data (replace with actual API call)
        const weatherData = {
            city: city,
            temperature: Math.floor(Math.random() * 15) + 10, // Random temp between 10-25°C
            description: ['sunny', 'partly cloudy', 'overcast', 'light rain'][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
            windSpeed: Math.floor(Math.random() * 20) + 5 // 5-25 km/h wind
        };
        
        weatherElement.innerHTML = `
            <div>🌡️ ${weatherData.temperature}°C - ${weatherData.description}</div>
            <div>💧 ${weatherData.humidity}% humidity | 💨 ${weatherData.windSpeed} km/h wind</div>
        `;
    } catch (error) {
        console.error('Error updating weather:', error);
        const weatherElement = document.getElementById('weather-info');
        if (weatherElement) {
            weatherElement.innerHTML = `
                <div>🌡️ 18°C - partly cloudy</div>
                <div>💧 65% humidity | 💨 12 km/h wind</div>
            `;
        }
    }
}