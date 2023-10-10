import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

const SideDrawer = ({ children, show, toogleDrawer }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={300}
      classNames={"slide-in-left"}
      mountOnEnter
      unmountOnExit
    >
      <aside onClick={toogleDrawer} className="side-drawer fixed left-0 top-0 z-30 h-screen w-[70%] bg-white shadow-lg">
        {children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
