export async function makeBackendRequest(url_path,method,parameters,user_data) {
  const response = await fetch(url_path, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': user_data["access-token"],
      client: user_data.client,
      uid: user_data.uid,
      email: user_data.email
    },
    body: JSON.stringify(parameters),
  }).catch((error) => {
      console.error(error);
  });
  return response;
}