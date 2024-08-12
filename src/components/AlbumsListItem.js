import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import PhotosList from "./PhotosList";
import { useRemoveAlbumMutation } from "../store";

export default function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleRemoveAlbum = () => removeAlbum(album);

  const header = (
    <>
      <Button
        className="mr-2"
        onClick={handleRemoveAlbum}
        disabled={results.isLoading}
        loading={results.isLoading}
      >
        <GoTrashcan />
      </Button>
      {album.title}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
}
