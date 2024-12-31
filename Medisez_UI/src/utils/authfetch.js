import axios from 'axios';

export const authFetch = async (route, method = 'GET', body = null) => {
  try {
    const config = {
      method, 
      url: route, 
      headers: {
        'Content-Type': 'application/json', 
      },
      data: body, 
    };

    const response = await axios(config);

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

