export const checkTokenValidity = async (accessToken) => {
  const url = `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Token is invalid or expired");
    }
    const data = await response.json();
    console.log("Token is valid:", data);
    return data; // You can return the data for further use
  } catch (error) {
    console.error("Error checking token validity:", error);
    return null; // Return null or handle the error as needed
  }
};
