export async function apiHelper(
  url: string, // API endpoint
  method: "GET" | "POST", // HTTP method (can be extended to PUT, DELETE, etc.)
  body?: any, // Data to be sent in POST requests
  headers: Record<string, string> = { "Content-Type": "application/json" } // Optional headers
) {
  try {
    const options: RequestInit = {
      method, // HTTP method (GET or POST)
      headers,
    };

    // If it's a POST request, add the body to the request
    if (method === "POST" && body) {
      options.body = JSON.stringify(body); // Convert body to JSON string
    }

    const response = await fetch(url, options);

    // Check if the response is OK (status code 2xx)
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Parse and return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Rethrow the error to handle it in the component
  }
}
