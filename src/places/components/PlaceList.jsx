import { Card, Button } from "@material-tailwind/react";

import PlaceItem from "./PlaceItem";
const PlaceList = ({ items, userId }) => {
  let content;

  if (items.length === 0) {
    content = (
      <div className="my-0 mx-auto p-0 w-[90%] max-w-[50rem] flex justify-center flex-wrap">
        <Card className="m-[1rem] w-[45%] text-center flex justify-center items-center p-5 mt-5">
          <h2>No places found. Maybe create one?</h2>
          <Button className="mt-4" variant="text">Share Place</Button>
        </Card>
      </div>
    );
  } else {
    content = (
      <ul className="list-none mx-auto my-1 p-0 w-[90%] max-w-[40rem]">
        {items.map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            address={place.address}
            description={place.description}
            creatorId={userId}
            coordinates={place.location}
          />
        ))}
      </ul>
    );
  }

  return <>{content}</>;
};

export default PlaceList;
