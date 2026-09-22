const BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export async function api(path, options = {}) {
  const token = localStorage.getItem("adminToken");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Add JWT automatically to protected admin requests
  if (path.startsWith("/admin/") && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(BASE + path, {
    ...options,
    headers,
  });

  // Token is missing, invalid or expired
  if (
    path.startsWith("/admin/") &&
    (response.status === 401 || response.status === 403)
  ) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.status === 204 ? null : response.json();
}

export const toursApi = {
  all: () => api("/tours"),

  one: (slug) => api("/tours/" + slug),

  create: (tour) =>
    api("/admin/tours", {
      method: "POST",
      body: JSON.stringify(tour),
    }),

  update: (id, tour) =>
    api("/admin/tours/" + id, {
      method: "PUT",
      body: JSON.stringify(tour),
    }),

  remove: (id) =>
    api("/admin/tours/" + id, {
      method: "DELETE",
    }),
};

export const adminApi = {
  bookings: () => api("/admin/bookings"),
  messages: () => api("/admin/messages"),
};
