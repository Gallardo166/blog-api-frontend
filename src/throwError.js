export default function(response) {
  if (response.status === 500) {
    throw new Response("Server error", { status: 500 });
  }
  if (response.status === 404) {
    throw new Response("Not Found", { status: 404 });
  }
  if (response.status === 401) {
    throw new Response("Not authorized", { status: 401 });
  }
}