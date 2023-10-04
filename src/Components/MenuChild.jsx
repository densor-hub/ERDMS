const MenuChild = (prop) => {
  const Icon = prop?.icon;
  return (
    <button
      onClick={() => {
        prop.onClick(
          prop.content.find((element) => {
            return element?.id.toLowerCase() === prop.label.toLowerCase();
          })
        );
      }}
      className={
        prop.label?.toLowerCase() === prop?.currentContent?.id?.toLowerCase()
          ? "w-full h-20 bg-yellow-600"
          : "w-full h-20 bg-slate-700"
      }
    >
      <main className="flex justify-center flex-col items-center text-center text-sm text-white ">
        <div>
          <Icon size={30} />
        </div>
        <div>{String(prop.label)}</div>
      </main>
    </button>
  );
};

export default MenuChild;
