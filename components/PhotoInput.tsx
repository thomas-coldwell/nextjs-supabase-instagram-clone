import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import * as React from "react";
import cn from "classnames";
import { MdAddAPhoto, MdEdit, MdInsertPhoto } from "react-icons/md";

interface IPhotoInputProps extends React.HTMLAttributes<HTMLDivElement> {}

export const PhotoInput = (props: IPhotoInputProps) => {
  //
  const { className, ...rest } = props;

  const [isCropperOpen, setCropperOpen] = useState(false);

  const [editablePhoto, setEditablePhoto] = useState<string>();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      if (event.target) {
        setEditablePhoto(event.target.result as string);
        setCropperOpen(true);
      }
    });
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={cn(
          "bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden",
          className
        )}
      >
        {editablePhoto ? (
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${editablePhoto})`,
              backgroundSize: "cover",
            }}
          >
            <div className="absolute bottom-0 right-0 flex items-center justify-center w-10 h-10 bg-gray-900 rounded-tl-lg bg-opacity-60">
              <MdEdit className="w-6 h-6 text-white" />
            </div>
          </div>
        ) : (
          <div className="w-full h-full p-2">
            <div
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-gray-400 border-2 border-dashed rounded-lg",
                "transition duration-300 hover:border-blue-400",
                isDragActive && "border-blue-400"
              )}
            >
              <MdAddAPhoto className="w-8 h-8 mb-2" />
              <p className="px-4 text-sm font-medium text-center">
                Drag and drop a photo, or click to upload
              </p>
            </div>
          </div>
        )}
        <input style={{ outline: "none" }} {...getInputProps()} />
      </div>
    </>
  );
};
