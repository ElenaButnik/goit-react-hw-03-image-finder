export function fetchImage(imageName, page) {
  return fetch(
    `https://pixabay.com/api/?q=${imageName}&page=${page}&key=23276068-4a413a2f7a08bb1d67038a93d&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`There are no images called ${imageName}`));
  });
}

const api = { fetchImage };
export default api;
