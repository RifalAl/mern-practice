const MainHeader = (props) => {
  const { children } = props;
  return (
    <header className="main-header w-full justify-between md:justify-between h-[4rem] flex gap-4  items-center fixed top-0 left-0 bg-[#ff0055] shadow-lg py-0 px-5 z-10">
      {children}
    </header>
  );
};

export default MainHeader;
