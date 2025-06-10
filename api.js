const BASE_URL = "https://demo2.z-bit.ee";


// Helper functions to manage token
export function getToken() {
  return localStorage.getItem("api_token");
}

export function setToken(token) {
  localStorage.setItem("api_token", token);
}

export function clearToken() {
  localStorage.removeItem("api_token");
}

// Registration: POST /users
export async function register(username, firstname, lastname, password) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      firstname,
      lastname,
      newPassword: password,
    }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Registration failed");
  }
  const data = await response.json();
  if (!data.access_token) throw new Error("No token returned");
  setToken(data.access_token);
  return data;
}

// Login: POST /users/get-token
export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/users/get-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Login failed");
  }
  const data = await response.json();
  if (!data.access_token) throw new Error("No token returned");
  setToken(data.access_token);
  return data;
}

// Get your own profile (GET /users/{id})
export async function getProfile(id) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
}

// Update your profile (PUT /users/{id})
export async function updateProfile(id, updates) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update profile");
  return response.json();
}

// TASK CRUD

// Get all tasks (GET /tasks)
export async function getTasks() {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
}

// Get single task (GET /tasks/{id})
export async function getTask(id) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch task");
  return response.json();
}

// Add new task (POST /tasks)
export async function addTask(title, desc = "") {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, desc }),
  });
  if (!response.ok) throw new Error("Failed to add task");
  return response.json();
}

// Update task (PUT /tasks/{id})
export async function updateTask(id, updates) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update task");
  return response.json();
}

// Delete task (DELETE /tasks/{id})
export async function deleteTask(id) {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete task");
}