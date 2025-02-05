import axios from 'axios';

export const GetDistrictFromProvinceIdRequest = async (provinceCode) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://esgoo.net/api-tinhthanh/2/${provinceCode}.htm`,
    });
    return response
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw error;
  }
};



