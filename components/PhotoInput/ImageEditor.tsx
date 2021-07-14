import { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "react-modal";
import { useEffect } from "react";
import noScroll from "no-scroll";
import { MdArrowBack } from "react-icons/md";
import { Button } from "../Button";

type IImageEditorProps = typeof Cropper["defaultProps"] & {
  isVisible: boolean;
  onConfirm: (result: string) => void;
  onCancel: () => void;
};

export const ImageEditor = (props: IImageEditorProps) => {
  //
  const { src, isVisible, onConfirm, onCancel } = props;

  const cropperRef = useRef<ReactCropperElement>(null);

  // Lock the scroll when the modal is open
  useEffect(() => {
    if (isVisible) {
      noScroll.on();
    } else {
      noScroll.off();
    }
  }, [isVisible]);

  const onCrop = async () => {
    const imageElement = cropperRef.current;
    console.log(imageElement);
    if (imageElement) {
      const cropper = imageElement.cropper;
      onConfirm(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <Modal
      isOpen={isVisible}
      className="flex flex-col items-center w-full h-full max-w-5xl p-4 bg-white rounded-lg outline-none"
      overlayClassName="p-4 w-screen h-screen-vp bg-gray-700 bg-opacity-80 fixed top-0 left-0 flex items-center justify-center lg:p-16"
      ariaHideApp={false}
    >
      <div className="flex flex-row justify-start w-full mb-4">
        <button
          className="flex flex-row items-center text-gray-600"
          onClick={onCancel}
        >
          <MdArrowBack className="w-auto h-6 mr-2" />
          <p className="font-medium">Back</p>
        </button>
      </div>
      <div className="flex-1 w-full mb-4">
        <Cropper
          style={{ width: "100%", height: "100%" }}
          src={src}
          aspectRatio={1}
          viewMode={2}
          guides={true}
          ref={cropperRef}
        />
      </div>
      <Button className="max-w-md" onClick={onCrop}>
        Crop
      </Button>
    </Modal>
  );
};
