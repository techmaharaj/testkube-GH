import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 1 }, // 1 virtual user for 10 seconds
  ],
};

export default function () {
  // Send an HTTP GET request to the website
  let response = http.get('https://testkube.io');

  // Check the response duration
  check(response, {
    'Response time is less than 1 second': (r) => r.timings.duration < 1000, // Adjust threshold as needed
  });
}
