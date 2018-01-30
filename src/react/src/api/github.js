import axios from 'axios';
import { hit, miss } from '../utils/cache';

export default async function githab(username) {
  try {
    let data = hit(username);
    if (data !== null) {
      return data;
    }
    data = await axios.get(`/api/user/${username}`);
    const result = miss(username, data);
    if (result !== false) {
      return Promise.resolve(data);
    }
    return Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
