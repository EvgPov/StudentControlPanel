export default async function apiClient (endpoint, { method = 'GET', body, ... options} = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${endpoint}`, config)

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return await response.json();
};

