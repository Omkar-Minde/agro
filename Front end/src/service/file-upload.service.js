import http from "../http-common";

class FileUploadService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    var productId = sessionStorage.getItem("addProductId")

    return http.post(`/product/${productId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get(`/product/get/`);
  }
}

export default new FileUploadService();