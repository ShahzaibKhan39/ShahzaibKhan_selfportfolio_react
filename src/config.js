const LOCAL_API = 'http://localhost:5000'; // change to your local server port
const REMOTE_API = 'https://shahzaibkhan-selfportfolio-node.onrender.com';

// VITE_API_URL wins if set; otherwise dev -> local backend, production build -> Render
export const API_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? LOCAL_API : REMOTE_API)
).replace(/\/$/, '');
