import Button from "./Button";
import { GoTrashcan } from "react-icons/go";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/useThunk";

export default function UserListItem({ user }) {
  const [performDelete, isDeleting, deleteError] = useThunk(deleteUser);

  const handleDelete = () => {
    performDelete(user);
  };

  return (
    <div key={user.id} className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center cursor-pointer">
        {deleteError && <div>Error deleting user...</div>}
        {user.name}
        <Button onClick={handleDelete} loading={isDeleting} danger>
          <GoTrashcan />
        </Button>
      </div>
    </div>
  );
}
