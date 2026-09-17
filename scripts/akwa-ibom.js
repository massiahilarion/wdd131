document.getElementById('year').textContent = new Date().getFullYear();

function formatLastModified(dateObj) {
  const pad = (num) => String(num).padStart(2, '0');

  const month = pad(dateObj.getMonth() + 1);
  const day = pad(dateObj.getDate());
  const year = dateObj.getFullYear();

  const hours = pad(dateObj.getHours());
  const minutes = pad(dateObj.getMinutes());
  const seconds = pad(dateObj.getSeconds());

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

const lastModifiedDate = new Date(document.lastModified);
document.getElementById('lastModified').textContent = formatLastModified(lastModifiedDate);

const temperature = 27;
const windSpeed = 12; 

function calculateWindChill(tempC, windKmh) {
  return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16);
}

const windChillDisplay = document.getElementById('windChill');

if (temperature <= 10 && windSpeed > 4.8) {
  const windChill = calculateWindChill(temperature, windSpeed).toFixed(1);
  windChillDisplay.textContent = `${windChill} \u00B0C`;
} else {
  windChillDisplay.textContent = 'N/A';
}