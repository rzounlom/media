import { addUser, fetchUsers } from "../store";
import { useDispatch, useSelector } from "react-redux";

import Button from "./Button";
import Skeleton from "./Skeleton";
import { useEffect } from "react";

export default function UsersList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserAdd = () => {
    dispatch(addUser());
  };

  if (isLoading) {
    return <Skeleton times={6} className="h-10 w-full" />;
  }

  if (error) {
    return <p>Error fetching data...</p>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button primary onClick={handleUserAdd}>
          + Add User
        </Button>
      </div>
      {renderedUsers}
    </div>
  );
}
