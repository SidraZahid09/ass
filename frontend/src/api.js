const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}/api${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || "Request failed");
    error.status = response.status;
    throw error;
  }
  return data;
}

export const getLatestPosts = () => request("/blogs/latest");
export const getBlogs = (q = "", page = 1) =>
  request(`/blogs?q=${encodeURIComponent(q)}&page=${page}`);
export const getBlog = (slug) => request(`/blogs/${encodeURIComponent(slug)}`);
export const submitEnquiry = (payload) =>
  request("/enquiries", { method: "POST", body: JSON.stringify(payload) });
