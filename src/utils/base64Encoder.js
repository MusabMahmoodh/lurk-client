export const encodeFileBase64 = (file) => {
  var reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      var Base64 = reader.result;
      return Base64;
    };
  }
};
