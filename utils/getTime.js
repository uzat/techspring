// utils/getTime.js
function getTime() {
  const now = new Date();
  return now.toLocaleTimeString('en-AU', {
    timeZone: 'Australia/Melbourne',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

module.exports = { getTime };
