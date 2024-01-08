import axios from "axios";

const API_URL = "https://identitytoolkit.googleapis.com/v1/accounts";
const API_KEY = "AIzaSyAutklVjNO1iTXtXrlF-44AifjP6nlSrh0";

async function authenticate(mode, email, password) {
  const endpoint = `${API_URL}:${mode}?key=${API_KEY}`;
  const response = await axios.post(endpoint, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  return response.data.idToken;
}

export function signUp(email, password) {
  return authenticate("signUp", email, password);
}

export function signIn(email, password) {
  return authenticate("signInWithPassword", email, password);
}
