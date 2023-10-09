import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const UploadFile = forwardRef(
  ({ allowedExtensions, fallbackIcon, alt, onUpload }, ref) => {
    useImperativeHandle(ref, () => {
      return {
        setFile: setFile,
        file: file,
        uploadFileInputRef: uploadFileInputRef?.current,
      };
    });

    const [file, setFile] = useState("");
    const MainIcon = fallbackIcon;
    const uploadFileInputRef = useRef();
    const [feedback, setFeedback] = useState("");

    const allowedfiles = useRef(allowedExtensions);
    const uploadImage = (e) => {
      if (!e.target?.files) {
        setFeedback("Please select image");
      } else {
        if (e.target?.files?.length > 0) {
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
            onUpload(e.target.files);
          } else {
            setFeedback("Please select a valid image");
            setFile("");
          }
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
            {file && <img src={URL?.createObjectURL(file)} alt={alt}></img>}
          </div>
        </section>

        <button
          className="rounded-lg px-4 text-white bg-slate-600 hover:bg-slate-700"
          onClick={(e) => {
            e.preventDefault();
            uploadFileInputRef?.current?.click();
          }}
        >
          Upload
        </button>
        <input
          ref={uploadFileInputRef}
          onClick={(e) => {
            e.target.value = "";
          }}
          onChange={(e) => {
            uploadImage(e);
          }}
          name={alt}
          id={alt}
          type="file"
          className="h-0 w-0"
        ></input>
      </main>
    );
  }
);

export default UploadFile;
