import axios from 'axios';

export const GetProvinceRequest = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://esgoo.net/api-tinhthanh/1/0.htm",
    });
    return response
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};
