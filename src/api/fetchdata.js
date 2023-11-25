const API_BASE_URL ='https://sabahatsyed.pythonanywhere.com/api/'; // Replace with your Flask API URL

export const fetchStreets = async () => {
    try {
      const data = await fetch(API_BASE_URL + "bins", {
        method: "GET",
        cache: "no-store",
        // next: { revalidate: 0 } ,
      });
      const response = await data.json();
      return response
    } catch (error) {
      console.error('Error fetching streets:', error.message);
      return []
  }
}

export const updateBins = async (id,street) => {
  try {
    const data = await fetch(API_BASE_URL + `bin/recycle/${id}/${street}`, {
      method: "POST",
      cache: "no-store",
      // next: { revalidate: 0 } ,
    });
    const response = await data.json();
    return response
  } catch (error) {
    console.error('Error fetching streets:', error.message);
    return []
}
}