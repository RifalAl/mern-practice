import UserItem from "./UserItem";
import { Card } from "@material-tailwind/react";

const UsersList = (props) => {
  const { items } = props;
  let content;

  if (items.length === 0) {
    content = (
      <div className="my-0 mx-auto p-0 w-[90%] max-w-[50rem] flex justify-center flex-wrap">
        <Card className="m-[1rem] w-[45%] text-center flex justify-center items-center p-5 mt-5">
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  } else {
    content = (
      <ul className="my-0 mx-auto p-0 w-[90%] max-w-[50rem] flex justify-center flex-wrap z-0 gap-4">
        {items.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.img}
            name={user.name}
            placeCount={user.places}
          />
        ))}
      </ul>
    );
  }

  return <>{content}</>;
};

export default UsersList;
