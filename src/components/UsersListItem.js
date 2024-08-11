import AlbumsList from "./AlbumsList";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/useThunk";

export default function UserListItem({ user }) {
  const [performDelete, isDeleting, deleteError] = useThunk(deleteUser);

  const handleDelete = () => {
    performDelete(user);
  };

  const header = (
    <>
      <Button onClick={handleDelete} loading={isDeleting} danger>
        <GoTrashcan />
      </Button>
      {deleteError && <div>Error deleting user...</div>}
      <span className="ml-2">{user.name}</span>
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}
