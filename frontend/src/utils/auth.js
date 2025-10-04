export function getAuthToken() {
  const token = localStorage.getItem("token");
  
//   const expiration = localStorage.getItem("expiration");

//   if (!token || !expiration) {
//     return null;
//   }
  return token;
}

