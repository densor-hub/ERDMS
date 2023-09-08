const Logo = () => {
  return (
    <main className="w-[60px] h-[60px] bg-transparent border-4 border-white border-r-0 rounded-full">
      <section className="relative left-[40%] top-[2px] py-1 pt-2 bg-slate-700 ">
        <LogoBars />
        <LogoBars />
        <LogoBars />
      </section>
    </main>
  );
};

export default Logo;

const LogoBars = () => {
  return <div className="w-[40px] h-1 bg-yellow-600 mb-2 rounded-lg"></div>;
};
