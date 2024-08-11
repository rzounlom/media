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

  let content;

  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return (
        <div key={user.id} className="mb-2 border rounded">
          <div className="flex p-2 justify-between items-center cursor-pointer">
            {user.name}
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3 items-center">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isAddingUser} primary onClick={handleUserAdd}>
          + Add User
        </Button>
      </div>
      {addingUserError && <div>Error adding user...</div>}
      {content}
    </div>
  );
}
