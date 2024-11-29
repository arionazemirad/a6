import { getToken } from "./authenticate";

export async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error in fetch request:", error.message);
    throw new Error(
      "There was an error processing your request. Please try again later."
    );
  }
}

export async function addToFavourites(id) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: "PUT",
  });
}

export async function removeFromFavourites(id) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: "DELETE",
  });
}

export async function getFavourites() {
  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    console.error(`Failed to fetch favourites: ${res.status}`);
    return [];
  }
}

export async function addToHistory(id) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "PUT",
  });
}

export async function removeFromHistory(id) {
  return fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: "DELETE",
  });
}

export async function getHistory() {
  const token = getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    console.error(`Failed to fetch history: ${res.status}`);
    return [];
  }
}