import axios from 'axios';
import { env } from '@/env';

const foodServer = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'content-type': 'application/json'
  }
});

export default foodServer;
