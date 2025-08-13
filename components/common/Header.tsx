const Header = () => (
  <header className="w-full flex justify-center">
    <div
      className="
      bg-[#292535] rounded-full flex items-center
      w-[95%] px-4 py-2
      md:py-2 md:px-3
      shadow relative
    ">
      <div className="flex-shrink-0 w-12 absolute left-0 h-12 md:w-12 md:h-12 bg-teal-200 rounded-full flex items-center justify-center">
        <img src="/logo.webp" alt="Logo" className="w-9 h-9 object-contain" />
      </div>
      <span
        className="
        text-white
        font-semibold
        text-lg md:text-xl
        flex-1 ml-12
      ">
        Text Mark
      </span>
      <a
        href="#about"
        className="
          text-white text-base md:text-lg font-medium
          hover:underline mr-3
        ">
        About
      </a>
    </div>
  </header>
);

export default Header;
