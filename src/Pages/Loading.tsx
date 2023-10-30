import React from "react";

const Loading: React.FC = () => {
  return (
    <main className="absolute top-0 left-0 right-0 bottom-0 bg-[0,0,0,0.5]">
      <div className="relative top-[50%] translate-y-[-50%] w-20 h-20 rounded-full bg-transparent border-0 border-l-8 border-white animate-spin"></div>
    </main>
  );
};

export default Loading;
