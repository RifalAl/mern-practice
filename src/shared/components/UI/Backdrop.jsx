import ReactDOM from 'react-dom';

const Backdrop = ({toogleDrawer}) => {

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-gray-900/[.8]" onClick={toogleDrawer}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
