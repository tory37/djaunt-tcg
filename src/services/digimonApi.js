const RATE_LIMIT = 15; // Maximum requests per interval
const INTERVAL = 10000; // Interval in milliseconds (10 seconds)

let requestQueue = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing) return;
  isProcessing = true;

  while (requestQueue.length > 0) {
    const requestsToProcess = requestQueue.splice(0, RATE_LIMIT);
    await Promise.all(requestsToProcess.map(request => request()));
    await new Promise(resolve => setTimeout(resolve, INTERVAL)); // Wait for the interval
  }

  isProcessing = false;
};

const fetchWithRateLimit = async (url) => {
  return new Promise((resolve, reject) => {
    requestQueue.push(async () => {
      try {
        const now = Date.now();
        const lastRequests = JSON.parse(localStorage.getItem('lastRequests')) || [];
        
        // Filter out requests that are older than the interval
        const validRequests = lastRequests.filter(timestamp => now - timestamp < INTERVAL);
        
        if (validRequests.length >= RATE_LIMIT) {
          // If we have reached the limit, wait until the oldest request is out of the interval
          const waitTime = INTERVAL - (now - validRequests[0]);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        // Make the API request
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Update the last requests in localStorage
        lastRequests.push(now);
        localStorage.setItem('lastRequests', JSON.stringify(lastRequests));
        
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
    processQueue();
  });
};

const fetchCardData = async (cardSet) => {
  // Check if the data is already cached in localStorage
  const cachedData = localStorage.getItem(`digimonCache_${cardSet}`);
  if (cachedData) {
    console.log(`Using cached data for card set: ${cardSet}`);
    return JSON.parse(cachedData);
  }

  const apiUrl = `https://cors-anywhere.herokuapp.com/https://digimoncard.io/api-public/search.php?card=${cardSet}`;
  const apiData = await fetchWithRateLimit(apiUrl); // Use the rate-limited fetch
  localStorage.setItem(`digimonCache_${cardSet}`, JSON.stringify(apiData[0])); // Cache the response in localStorage
  console.log(`Fetched and cached data for card set: ${cardSet}`);
  return apiData[0]; // Return the fetched data
};

export { fetchWithRateLimit, fetchCardData };