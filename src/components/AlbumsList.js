import { useAddAlbumMutation, useFetchAlbumsQuery } from "../store";

import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import Skeleton from "./Skeleton";

export default function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;

  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error: loading Albums</div>;
  } else {
    content = data.map((album) => (
      <ExpandablePanel key={album.id} header={album.title}>
        List of photos in album
      </ExpandablePanel>
    ));
  }
  return (
    <div>
      <div>Albums for {user.name}</div>
      <Button onClick={handleAddAlbum} disabled={results.isLoading}>
        + Add Album
      </Button>
      <div>{content}</div>
    </div>
  );
}
