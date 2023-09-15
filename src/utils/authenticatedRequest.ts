export default async function authenticatedRequest(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
) {
  const options: RequestInit = {
    method,
  };

  if (body) {
    options.body = JSON.stringify(body);
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  if (!process.env.SHARED_KEY) {
    console.warn("No shared key set, skipping authentication");
  } else {
    options.headers = {
      ...options.headers,
      Authorization: process.env.SHARED_KEY,
    };
  }

  return await fetch(`http://app:4321/${path}`, options);
}