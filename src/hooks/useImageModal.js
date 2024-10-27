import { useState } from "react";

const useImageModal = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return {
    selectedImage,
    handleImageClick,
    closeModal,
  };
};

export default useImageModal;
