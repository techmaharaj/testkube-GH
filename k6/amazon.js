import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // Number of virtual users (simulated users)
  duration: '10s', // Duration of the test in seconds
};

export default function () {
  // Define the Amazon homepage URL
  const baseUrl = 'https://www.amazon.com';

  // Send an HTTP GET request to the Amazon homepage
  let response = http.get(baseUrl);

  // Check if the homepage request was successful
  check(response, {
    'Homepage is accessible': (r) => r.status === 200,
  });

  // Sleep for a short duration (e.g., 2 seconds) to simulate user think time
  sleep(2);

  // Define the search keyword (e.g., "iPhone")
  const searchKeyword = 'iPhone';

  // Construct the search URL with the keyword
  const searchUrl = `${baseUrl}/s?k=${searchKeyword}`;

  // Send an HTTP GET request to perform the search
  response = http.get(searchUrl);

  // Measure the time until the page loads completely
  const pageLoadTime = response.timings.duration;

  console.log("==== Response Time")
  console.log(pageLoadTime)

  // Check if the search results page request was successful
  check(response, {
    'Search results page is accessible': (r) => r.status === 200,
  });

  // Fail the test if pageLoadTime exceeds 5 seconds, otherwise pass it
  if (pageLoadTime > 5000) {
    fail(`Page load time exceeded 5 seconds: ${pageLoadTime} ms`);
  }
}
