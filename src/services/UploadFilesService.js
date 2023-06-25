import http from "../http-common";
import axios from 'axios'

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post(axios.defaults.baseURL+"/upload/profile-pics", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }

  getFiles() {
    return http.get(axios.defaults.baseURL+"/profile-pics");
  }
}

export default new UploadFilesService();