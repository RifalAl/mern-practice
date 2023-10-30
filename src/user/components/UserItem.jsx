import { Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Card, CardBody } from "@material-tailwind/react";

const UserItem = (props) => {
  const { id, name, image, placeCount } = props;
  return (
    <li className="w-full md:w-[45%] md:w-min-[17.5rem]" id={props.id}>
      <Card>
        <Link to={`/${id}/places`}>
          <CardBody className="flex group gap-2 items-center w-full h-full hover:bg-[#ffd900] text-white bg-[#292929] rounded-md">
            <div className="w-[4rem] h-[4rem]">
              <Avatar src={`${import.meta.env.VITE_ASSETS_URL}/${image}`} alt={name} size="lg" />
            </div>
            <div className="mr-4">
              <h2 className="text-2xl font-medium text-[#ffd900] group-hover:text-[#292929] cursor-pointer">
                {name}
              </h2>
              <h3 className="font-semibold text-lg mt-1 group-hover:text-[#292929]">
                {placeCount} {placeCount > 1 ? "Places" : "Place"}
              </h3>
            </div>
          </CardBody>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
