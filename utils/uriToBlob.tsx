import Pica from "pica";

type Size = {
  width: number;
  height: number;
};

export const uriToBlob = async (uri: string, size: Size): Promise<Blob> => {
  // Turn the base64 string into a HTML Image Element
  const inputImage = new Image(1200, 1200);
  inputImage.src = uri;
  console.log({ inputImage });
  // Create a canvas to perform the image manipulation on
  const resizedCanvas = document.createElement("canvas");
  resizedCanvas.height = size.height;
  resizedCanvas.width = size.width;
  // Perform a resize op using pica
  const pica = new Pica();
  const resize = await pica.resize(inputImage, resizedCanvas, {
    unsharpAmount: 80,
    unsharpRadius: 0.6,
    unsharpThreshold: 2,
  });
  // Convert the result to a blob that can actually be uploaded to firebase
  const blob = await new Promise<Blob>((resolve, reject) =>
    resize.toBlob(
      (blob) => (blob ? resolve(blob) : reject()),
      "image/jpeg",
      0.9
    )
  );
  return blob;
};
