import axios from 'axios';

export async function profile(username) {
  try {
    const data = await axios.get(`/api/user/${username}`);
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}

export async function limit() {
  try {
    const data = await axios.get('/api/limit');
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}

export async function clear(username) {
  try {
    const data = await axios.get(`/api/clear/${username}`);
    return Promise.resolve(data.ok);
  } catch (error) {
    return Promise.reject(error.response);
  }
}
