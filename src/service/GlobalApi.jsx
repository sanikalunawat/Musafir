// import axios from "axios";

// export const GetPlaceDetails = async () => {
//   try {
//     const response = await axios.get(
//       "https://places.googleapis.com/v1/places:searchText",
//       {
//         headers: {
//           Authorization: `Bearer AIzaSyDGfDWOQ0vk1Z_4-Wbh0-J3XgzH917ELIQ`,
//           // Include other headers if necessary
//         },
//       }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error(
//       "Error fetching data:",
//       error.response ? error.response.data : error.message
//     );
//   }
// };

import axios from "axios";
const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";

export const GetPlaceDetails = (placeName) => {
  return axios.get(`${BASE_URL}/${encodeURIComponent(placeName)}.json`, {
    params: {
      access_token: import.meta.env.VITE_MAPBOX_API_KEY,
      limit: 1,
    },
  });
};

