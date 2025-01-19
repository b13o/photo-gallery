import PhotoCard from "./PhotoCard";
import { memo, use } from "react";
import { searchPhotos } from "@/utils/api";

interface SearchResultProps {
  query: string;
  handleSelectPhoto: (photoId: string) => void;
}

const SeachResult = memo(({ query, handleSelectPhoto }: SearchResultProps) => {
  const photos = use(searchPhotos(query));

  return (
    <>
      <h2 className="mb-6 text-2xl font-semibold">
        Search Results for "{query}"
      </h2>

      <div className="grid grid-cols-2 gap-4 ">
        {photos?.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            handleSelectPhoto={handleSelectPhoto}
          />
        ))}
      </div>
    </>
  );
});

export default SeachResult;
