import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const MENU = [
    { url: "/", title: "ALL USERS" },
    { url: "/u1/places", title: "MY PLACES" },
    { url: "/places/new", title: "ADD PLACES" },
    { url: "/login", title: "LOGIN" },
  ];

  return (
    <ul className="nav-links list-none m-0 p-0 w-full h-screen md:h-full flex md:flex-row flex-col justify-center items-center gap-6 md:gap-4">
      {MENU.map((menu, i) => {
        return (
          <li key={i}>
            <NavLink
              className="border-solid border-2 border-transparent border-gr text-[#202020] md:text-white no-underline p-2 hover:bg-[#f8df00] hover:border-[#292929] hover:text-[#202020] hover:rounded-md hover:p-2"
              to={menu.url}
              exact
            >
              {menu.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;