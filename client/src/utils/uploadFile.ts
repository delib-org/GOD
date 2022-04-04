// import axios from 'axios';

export function uploadFile(file:any) {
  return new Promise((resolve, reject) => {
    console.dir(file);

    const url = 'https://api.cloudinary.com/v1_1/god-delib/image/upload';

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'ddbgxxbf');

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}
// https://codepen.io/team/Cloudinary/pen/QgpyOK
// https://stackoverflow.com/questions/45148976/how-to-make-direct-api-call-to-cloudinary-with-axios
