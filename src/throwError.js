export default function(response) {
  if (response.status === 500) {
    throw new Error("Server error");
  }
  if (response.status === 404) {
    throw new Error("Not found");
  }
  if (response.status === 401) {
    throw new Error("Not authorized");
  }
}