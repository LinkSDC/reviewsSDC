import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 100,
  duration: '30s',
};

export default function() {
  http.get(`http://localhost:3002/api/fec2/rfp/reviews/?product_id=${Math.floor(Math.random() * (1000000 - 1 + 1)) + 1}`);
}