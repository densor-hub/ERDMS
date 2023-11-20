import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Button from "../../Button.tsx";

interface iUploadFile {
  fallbackIcon: React.FC<any> | undefined;
  alt: string;
  onUpload: Function;
  REF: (element: any) => void;
  allowedExtensions: string[] | undefined;
}

const UploadFile = forwardRef(
  (
    { allowedExtensions, fallbackIcon, alt, onUpload, REF }: iUploadFile,
    ref
  ) => {
    useImperativeHandle(ref, () => {
      return {
        setFile: setFile,
        uploadFileInputRef: uploadFileInputRef?.current,
      };
    });

    const Icon = fallbackIcon;

    const [file, setFile] = useState<Blob>();
    const uploadFileInputRef = useRef<HTMLInputElement | null>(null);

    const [feedback, setFeedback] = useState<string>("");

    const allowedfiles = useRef(allowedExtensions);
    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target?.files) {
        setFeedback("Please select image");
      } else {
        if (e.target?.files?.length > 0) {
          if (
            e.target?.files[0].type?.split("/")[0]?.toLowerCase() === "image" &&
            allowedfiles?.current?.find((ext) => {
              return (
                ext?.toLowerCase()?.trim() ===
                e.target?.files[0]?.type?.split("/")[1]?.toLowerCase()?.trim()
              );
            })
          ) {
            setFile(e.target?.files[0]);
            onUpload(e.target.files);
          } else {
            setFeedback("Please select a valid image");
            setFile(undefined);
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
            {!file && (
              <Icon
                size={90}
                color="black"
                style={{ position: "relative", top: "15px" }}
              />
            )}
            {file && (
              <img src={URL?.createObjectURL(file)} alt={alt} ref={REF}></img>
            )}
          </div>
        </section>

        <Button
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            uploadFileInputRef.current.value = "";
            uploadFileInputRef?.current?.click();
          }}
          style={{
            fontSize: "small",
            padding: "1px 5px",
          }}
          type={"button"}
        >
          {"Upload"}
        </Button>
        <input
          ref={uploadFileInputRef}
          onClick={(e: any) => {
            e.target.value = "";
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
