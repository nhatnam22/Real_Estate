import axios from 'axios';

export const GetWardFromDitrictIdRequest = async (districtCode) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://esgoo.net/api-tinhthanh/3/${districtCode}.htm`,
    });
    return response
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};


