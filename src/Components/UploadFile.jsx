import { BsCamera } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

const UploadImage = (
  { file, setFile, allowedExtensions, fallbackIcon },
  ref
) => {
  const MainIcon = fallbackIcon;
  const inputBtnRef = useRef();
  //const [selectedImage, setSelectedImage] = useState();
  const [feedback, setFeedback] = useState("");

  const allowedfiles = useRef(allowedExtensions);
  const uploadImage = (e) => {
    if (!e.target?.files) {
      setFeedback("Please select image");
    } else {
      if (
        e.target?.files[0].type?.split("/")[0]?.toLowerCase() === "image" &&
        allowedfiles?.current?.find((ext) => {
          return (
            ext?.toLowerCase()?.trim() ===
            e.target?.files[0].type?.split("/")[1]?.toLowerCase()?.trim()
          );
        })
      ) {
        setFile(e.target?.files[0]);
      } else {
        setFeedback("Please select a valid image");
        setFile("");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (feedback) {
        setFeedback("");
      }
    }, 3000);
  });

  return (
    <main className="flex flex-col   items-center w-[200px] h-fit">
      <div className="text-red-500">{feedback}</div>
      <section className=" relative pb-4 ">
        <div className="realtive h-[100px] w-[100px] rounded-full border-2 border-slate-200 flex justify-center items-center overflow-hidden ">
          {!file && <MainIcon size={80} className="relative top-3" />}
          {file && <img src={URL?.createObjectURL(file)}></img>}
        </div>
        {/* {!file && (
          <div className=" bg-slate-700 w-[30px] h-[30px] rounded-full flex justify-center items-center relative left-[70%] bottom-[20%]">
            <BsCamera size={15} className="text-white" />
          </div>
        )} */}
      </section>

      <button
        className="rounded-lg px-4 text-white bg-slate-600 hover:bg-slate-700"
        onClick={(e) => {
          e.preventDefault();
          inputBtnRef?.current?.click();
        }}
      >
        Upload
      </button>
      <input
        ref={inputBtnRef}
        onChange={(e) => {
          uploadImage(e);
        }}
        type="file"
        className="h-0 w-0"
      ></input>
    </main>
  );
};

export default UploadImage;
