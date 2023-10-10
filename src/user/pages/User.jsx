import UsersList from "../components/UsersList";

const User = () => {
  const USERS = [
    {
      id: "u1",
      name: "Ahmad Rifaldi",
      img: "https://images.unsplash.com/photo-1549877452-9c387954fbc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      places: 1,
    },
    {
      id: "u2",
      name: "Ranamirah",
      img: "https://picsum.photos/200",
      places: 1,
    },
  
  ];
  return <UsersList items={USERS} />;
};

export default User;
