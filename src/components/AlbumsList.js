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
    content = <Skeleton times={3} className="h-10 w-full" />;
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
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button
          onClick={handleAddAlbum}
          disabled={results.isLoading}
          loading={results.isLoading}
        >
          + Add Album
        </Button>
      </div>

      <div>{content}</div>
    </div>
  );
}
