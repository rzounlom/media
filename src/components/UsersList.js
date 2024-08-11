import { addUser, fetchUsers } from "../store";

import Button from "./Button";
import Skeleton from "./Skeleton";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useThunk } from "../hooks/useThunk";

export default function UsersList() {
  const [runFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [runAddUser, isAddingUser, addingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => state.users);

  useEffect(() => {
    runFetchUsers();
  }, [runFetchUsers]);

  const handleUserAdd = () => {
    runAddUser();
  };

  if (isLoadingUsers) {
    return <Skeleton times={6} className="h-10 w-full" />;
  }

  if (loadingUsersError) {
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
        {isAddingUser ? (
          "Creating user..."
        ) : (
          <Button primary onClick={handleUserAdd}>
            + Add User
          </Button>
        )}
        {addingUserError && <p>Error creating user...</p>}
      </div>
      {renderedUsers}
    </div>
  );
}
