import { jwtDecode } from 'jwt-decode';

function setToken(token) {
  localStorage.setItem('access_token', token);
}

export function getToken() {
  try {
    return localStorage.getItem('access_token');
  } catch (err) {
    return null;
  }
}

export function readToken() {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (err) {
    return null;
  }
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password: password }),
    headers: {
      'content-type': 'application/json',
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    setToken(data.token);
    return true;
  } else {
    throw new Error(data.message);
  }
}

export function isAuthenticated() {
  const token = readToken();
  return token ? true : false;
}

export async function registerUser(userName, password, password2) {
  try {
    if (password !== password2) {
      throw new Error("Passwords do not match");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      body: JSON.stringify({ userName, password, password2 }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      return true;
    } else {
      const data = await res.json();
      throw new Error(data.message || "Registration failed");
    }
  } catch (err) {
    console.error("Registration error:", err);
    throw err;
  }
}