import { checkTokenValidity } from "./googleAuth";

// export const writeToSheet = async (spreadsheetId, range, values) => {
//   const accessToken = sessionStorage.getItem("access_token");
//   console.log("Access Token:", accessToken);
//   if (!accessToken) throw new Error("No access token found");

//   const isValidToken = await checkTokenValidity(accessToken);
//   if (!isValidToken) {
//     console.warn("Access token is invalid. Please log in again.");
//     throw new Error("Access token is invalid. Please log in again.");
//   }

//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`;

//   const response = await fetch(url, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ range, majorDimension: "ROWS", values }),
//   });

//   const data = await response.json();
//   if (!response.ok) throw new Error(data.error.message);
//   return data;
// };

export const fetchMasterList = async (sheetsId) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/Master List!A:F?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error.message);

  return data.values.slice(1).map((item) => ({
    Name: item[0],
    Id: item[1],
  }));
};

export const fetchDeck = async (sheetsId, deckName, getImageUrl) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetsId}/values/${deckName}!A:F?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error.message);

  const [headers, ...rows] = data.values;
  return rows.map((item) => {
    const cardObject = {};
    headers.forEach((header, index) => {
      cardObject[header] = item[index];
    });
    cardObject.Image = getImageUrl(item[1]);
    return cardObject;
  });
};
