import axios from 'axios';

export default async function githab(username) {
  try {
    const data = await axios.get(`/api/user/${username}`);
    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error.response);
  }
}
