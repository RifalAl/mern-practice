import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Masjid Jami Tua Palopo",
    description:
      "Masjid Jami Tua Palopo merupakan masjid peninggalan Kerajaan Luwu yang berlokasi di Kota Palopo, Sulawesi Selatan. Masjid ini didirikan oleh Raja Luwu yang bernama Datu Payung Luwu XVI Pati Pasaung Toampanangi Sultan Abdullah Matinroe pada tahun 1604 M",
    address: "Jl. Andi Djemma No.88, Batupasi, Kec. Wara Utara, Kota Palopo",
    image:
      "https://www.djkn.kemenkeu.go.id/files/images/2021/06/Masjid-Jami-Tua-Palopo1.jpeg",
    location: { lat: -2.9941691069265093, long: 120.19532275826946 }, 
    creator: "u1",
  },
  {
    id: "p2",
    title: "Istana Luwu Palopo",
    description:
      "Kedatuan Luwu adalah salah satu kerajaan Bugis tertua. Pada 1889, Gubernur Hindia Belanda di Makassar menyatakan bahwa masa kejayaan Luwu antara abad ke-10 sampai 14",
    address: "Jl. Landau No.18, Batupasi, Kec. Wara Utara, Kota Palopo",
    image:
      "https://www.celebes.co/wp-content/uploads/2020/04/Istana-Langkanae-Luwu.jpg",
    location: { lat: -2.9944561590805225, long: 120.1964905521137 },
    creator: "u2",
  },
];
const UserPlace = () => {
  const userId = useParams().userId;
  const filterData = DUMMY_PLACES.filter(place => place.creator === userId)
  return <PlaceList items={filterData} userId={userId}/>;
};

export default UserPlace;
