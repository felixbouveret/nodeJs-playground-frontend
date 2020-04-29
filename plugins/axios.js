export default function({ $axios, app, store }) {
  $axios.onError(error => {
    // console.table(error);
    throw error.response;
  });
}
