import axios from 'axios';

const API_URL = 'https://5d4f-181-84-200-119.ngrok-free.app';

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/login`, {
        username: username,
        password: password
      });
  
      return response.data;
    } catch (error) {
      console.log('Error en loginUser:', error.message || error);
      return error.response.data;
    }
  };

  export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/user/register`, {
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        password: userData.password
      });
  
      if (response.status === 201) {
        const login = await loginUser(userData.username, userData.password);
        const payload = await validateToken(login.token);
        return {
          payload: payload,
          token: login.token
        };
      } else {
        return false;
      }
    } catch (error) {
      console.log('Error during registration:', error.response ? error.response.data : error.message);
      return {
        success: false,
        message: error.response.data
      }
    }
  };

export const validateToken = async (token) => {
    try 
    {
        const response = await axios.get(`${API_URL}/api/user/validartoken`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.user;
    } catch (error) {
      console.log('Error en loginUser:', error.message || error);
    }
};
