import { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import { HamburgerMenu } from "../UI/Icon";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UI/Backdrop";

const MainNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toogleDrawerHandler = () => {
    setIsDrawerOpen((prevItem) => !prevItem);
  };
  return (
    <>
      {isDrawerOpen && <Backdrop toogleDrawer={toogleDrawerHandler} />}
      <SideDrawer show={isDrawerOpen} toogleDrawer={toogleDrawerHandler}>
        <nav className="h-full">
          <NavLinks toogleDrawer={toogleDrawerHandler} />
        </nav>
      </SideDrawer>
      <MainHeader>
        <div className="flex items-center gap-2">
          <HamburgerMenu
            onClick={toogleDrawerHandler}
            color="#fff"
            className="block md:hidden"
          />
          <h1 className="main-navigation__title text-white text-2xl font-semibold">
            <Link className="no-underline text-white" to="/">
              UrPlace
            </Link>
          </h1>
        </div>
        <nav className="hidden md:block">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
