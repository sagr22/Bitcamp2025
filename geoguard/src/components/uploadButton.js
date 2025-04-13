import { useRef } from "react";
import Identify from "../identify";
import AddButton from "./addButton";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function UploadButton({ onFileSelect }) {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [pictures, setPictures] = useState([]);
  
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileSelect = (file) => {
  //   setSelectedFile(file); // Updates the state with the selected file
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      const fileUrl = URL.createObjectURL(file);  // Create a URL for the file

      setPictures((prevPictures) => [
        ...prevPictures,
        { url: fileUrl, file }
      ]);
      navigate("/identify", { state: { imageFile: file } });
      // onFileSelect(file);
      // setSelectedFile(file);
    }
  };

  return (
    <>
      <div onClick={handleClick}>
        <button className="bg-[#E78743] text-white px-4 py-4 rounded-[25px] font-bold hover:bg-[#D67632] transition-colors">Upload image or video</button>
      </div>
      <input
        type="file"
        accept="image/*,video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}