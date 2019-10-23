export async function makeBackendRequest(url_path,method,user_data) {
  const response = await fetch(url_path, {
    method: method,
    headers: {
      /*Accept: 'application/json',*/
      'Content-Type': 'application/json',
      'access-token': user_data["access-token"],
      'client': user_data.client,
      'uid': user_data.uid,
      'email': user_data.email
    },
  }).catch((error) => {
      console.log(error);
  });
  return response;
}