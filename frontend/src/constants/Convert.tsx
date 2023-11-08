export const convertTOBase64 = (files: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const toBase64 = (file: Blob) => {
  const reader = new FileReader();
  reader.onloadend = () => {
    reader.result as string;
  };
  reader.readAsDataURL(file);
};
