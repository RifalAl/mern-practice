import Iframe from "react-iframe";

const MapViewer = ({ lat, long }) => {
  return (
    <Iframe
      src={`https://maps.google.com/maps?q=${lat},${long}&t=&z=17&ie=UTF8&iwloc=&output=embed`}
      width="99.9%"
      height="350"
      style="border:0;"
      allowFullScreen=""
      loading="lazy"
    />
  );
};

export default MapViewer;