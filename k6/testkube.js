import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1, // Virtual Users
  duration: '10s', // Duration of the test
};

export default function () {
  // Send an HTTP GET request to the website
  let response = http.get('https://testkube.io'); // Replace with your website URL

  // Check if the response time is greater than 1 second
  check(response, {
    'Status is 200': (r) => r.status === 200,
  });

  // Add a sleep period (in this case, 1 second) between requests
  sleep(1);
}
