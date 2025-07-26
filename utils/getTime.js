// ===== UTILS/GETTIME.JS =====
// utils/getTime.js
const axios = require('axios');

async function getUserLocation(ip) {
    try {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        return response.data;
    } catch (error) {
        console.error('Error getting location:', error);
        return null;
    }
}

function getCurrentTime(timezone = 'Australia/Melbourne') {
    try {
        return new Date().toLocaleString('en-AU', {
            timeZone: timezone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    } catch (error) {
        console.error('Error formatting time:', error);
        return new Date().toLocaleString('en-AU');
    }
}

module.exports = { getUserLocation, getCurrentTime };