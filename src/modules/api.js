const serverUrl = 
window.location.href.startsWith("http://localhost") ?
"http://localhost:5001/qualified-charters/us-central1/api" :
"https://us-central1-qualified-charters.cloudfunctions.net/api"
;

export async function getJSON(url, token) {
    const response = await fetch(
        `${serverUrl}${url}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    if(response.status === 200) {
        return await response.json();
    }
    throw response.statusText;
}
export async function postJSON(url, token) {
    const response = await fetch(
        `${serverUrl}${url}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    if(response.status === 200) {
        return await response.json();
    }
    throw response.statusText;
}
