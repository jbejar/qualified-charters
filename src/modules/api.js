const serverUrl = "http://localhost:5001/qualified-charters/us-central1/api";

export async function getJSON(url, token) {
    const response = await fetch(
        `${serverUrl}${url}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return await response.json();
}
