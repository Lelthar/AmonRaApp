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

export const getPropsFromPlace = (place) => {
  return {
    title: place.name,
    description: place.description,
    direction: place.direction,
    phone_number: place.phone_number,
    facebook: place.facebook,
    images_url_1: place.image1_url, 
    images_url_2: place.image2_url, 
    images_url_3: place.image3_url,
  };
}