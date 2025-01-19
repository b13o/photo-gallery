import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { useCategoryPhotoResource } from "@/hooks/usePhotoResource";
import { wrapPromise } from "@/utils/suspense";
import { BasicPhoto } from "@/types/photo";
import PhotoCard from "./PhotoCard";

interface PhotoRowProps {
  category: string;
  imageResource: ReturnType<typeof wrapPromise<BasicPhoto[]>>;
  handleSelectPhoto: (photoId: string) => void;
}

function PhotoRow({
  imageResource,
  category,
  handleSelectPhoto,
}: PhotoRowProps) {
  const photos = imageResource.read();
  return (
    <div className="relative py-4">
      <h2 className="mb-4 text-3xl font-semibold">{category}</h2>
      <div className="group relative">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth">
          {photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              className="min-w-[300px]"
              photo={photo}
              handleSelectPhoto={handleSelectPhoto}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function RowSkeleton() {
  return (
    <div className="group relative">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative flex h-48 w-80 flex-col space-y-4 rounded-md bg-muted p-4"
          ></div>
        ))}
      </div>
    </div>
  );
}

interface RandomListProps {
  handleSelectPhoto: (photoId: string) => void;
}
export default function RandomList({ handleSelectPhoto }: RandomListProps) {
  const resourceMap = {
    Discover: useCategoryPhotoResource(""),
    Nature: useCategoryPhotoResource("nature"),
    Minimalism: useCategoryPhotoResource("Minimalism"),
  };

  return (
    <ErrorBoundary
      fallback={
        <p className="text-red-500 text-3xl">Something went wrong :(</p>
      }
    >
      <Suspense fallback={<RowSkeleton />}>
        {Object.entries(resourceMap).map(([category, resource]) => (
          <PhotoRow
            key={category}
            category={category}
            imageResource={resource}
            handleSelectPhoto={handleSelectPhoto}
          />
        ))}
      </Suspense>
    </ErrorBoundary>
  );
}
