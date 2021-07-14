import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import * as React from "react";
import cn from "classnames";
import { MdAddAPhoto, MdEdit, MdInsertPhoto } from "react-icons/md";
import { useIsTouchDevice } from "../../utils/useIsTouchDevice";
import { ImageEditor } from "./ImageEditor";
import Pica from "pica";

interface IPhotoInputProps extends React.HTMLAttributes<HTMLDivElement> {
  description: string;
  value: string;
  disabled: boolean;
  onImageChange: (result: string) => void;
}

export const PhotoInput = (props: IPhotoInputProps) => {
  //
  const { description, className, value, disabled, onImageChange, ...rest } =
    props;

  const [isEditorOpen, setEditorOpen] = useState(false);

  const [editablePhoto, setEditablePhoto] = useState<string>();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      if (event.target) {
        setEditablePhoto(event.target.result as string);
        setEditorOpen(true);
      }
    });
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
  });

  const isTouchscreen = useIsTouchDevice();

  const onConfirmEditing = async (result: string) => {
    onImageChange(result);
    setEditorOpen(false);
  };

  const onCancelEditing = () => {
    setEditablePhoto(undefined);
    setEditorOpen(false);
  };

  return (
    <>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={cn(
          "bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden",
          disabled && "filter grayscale cursor-not-allowed pointer-events-none",
          className
        )}
        {...rest}
      >
        {value ? (
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${value})`,
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
              <p className="px-4 text-xs font-medium text-center md:text-sm">
                {!isTouchscreen
                  ? `Drag and drop or click to upload a ${description}`
                  : `Click to upload a ${description}`}
              </p>
            </div>
          </div>
        )}
        <input style={{ outline: "none" }} {...getInputProps()} />
      </div>
      <ImageEditor
        isVisible={isEditorOpen}
        src={editablePhoto}
        onConfirm={onConfirmEditing}
        onCancel={onCancelEditing}
      />
    </>
  );
};
