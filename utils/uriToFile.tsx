import * as imtool from "imtool";

type Size = {
  width: number;
  height: number;
};

export const uriToFile = async (uri: string, size: Size): Promise<File> => {
  const image = await imtool.fromImage(uri);
  const resizedImage = await image.scale(size.width, size.height);
  const blob = await resizedImage.toBlob();
  const file = new File([blob], "avatar", {
    lastModified: new Date().getTime(),
    type: blob.type,
  });
  return file;
};
