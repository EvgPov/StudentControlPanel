export default async function apiClient (endpoint, { method = 'GET', body, ... options} = {}) {
  try {
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
    const response = await fetch(endpoint, config)

    let responseBody = response.clone();

    if (!response.ok) {
      const errorBody = await responseBody.json();
      throw new Error(
        `HTTP error ${response.status}: ${response.statusText}\nResponse body: ${JSON.stringify(errorBody, null, 2)}`
      );
    };
    return await response.json();
  } catch (error) {
     console.error("Error in apiClient", error)
  }
};

