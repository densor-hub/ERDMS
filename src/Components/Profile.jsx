import { useEffect, useRef, useState } from "react";
import Image from "./Image";
import UploadImage from "./UploadFile";
import { FaUser } from "react-icons/fa";

const Profile = ({ profileData }) => {
  const content = useRef({
    generalDetails: "general",
    contactDetails: "contact",
    employmentDetails: "employment",
  });

  const [currentContent, setCurrentContent] = useState();

  return (
    <main className="flex border-2 border-red-500 w-full">
      <section>
        {profileData?.image ? (
          <Image
            scr={
              profileData?.image?.data instanceof Array
                ? profileData?.image
                : URL.createObjectURL(profileData?.image)
            }
            alt={profileData?.full_name}
          />
        ) : (
          <FaUser size={50}></FaUser>
        )}
      </section>

      <section className="border-2 border-green-500 px-10">
        <section className="text-slate-400 text-sm">
          <div className="font-semibold text-2xl text-slate-500">
            {profileData?.full_name}
          </div>
          <div>{`${Number(
            new Date().getFullYear() -
              new Date(profileData?.date_of_birth).getFullYear()
          )} years old`}</div>
          <div>{profileData?.role}</div>
        </section>
      </section>
    </main>
  );
};

export default Profile;
