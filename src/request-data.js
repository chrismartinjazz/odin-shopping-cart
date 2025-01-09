import { setLocalStorage, getLocalStorage } from "./local-storage";

/* 
Check if there is already an API query result in local storage for the current date and query. If there is not,
query the API and store the data. If there is, retrieve the stored data.
*/
export async function requestData(query) {
  const currentDate = new Date().toDateString();
  const localData = getLocalStorage() || {};

  if (localData && localData[currentDate] && localData[currentDate][query]) {
    console.log("Local data retrieved");
    return localData[currentDate][query];
  }

  const result = await getData(query);
  console.log("API queried");

  try {
    if (!localData[currentDate]) localData[currentDate] = {};
    localData[currentDate][query] = result;
    setLocalStorage(localData);
  } catch (error) {
    console.error(
      `Error saving to localStorage: ${error.message}. API response not cached.`
    );
  }

  return result;
}

async function getData(query) {
  const baseUrl = "https://fakestoreapi.com/";
  try {
    const response = await fetch(`${baseUrl}${query}`);

    if (response.ok) {
      return await response.json();
    } else if (response.status === 400 || response.status === 429) {
      throw new Error(`Location not found - ${response.status}`);
    } else {
      throw new Error(`Unexpected error - ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error retrieving data: ${error.message}`);
  }
}
