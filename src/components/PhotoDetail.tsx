import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { wrapPromise } from "@/utils/suspense";
import { Suspense } from "react";
import { Button } from "./ui/button";
import { DetailePhoto } from "@/types/photo";
import { usePhotoDetailResource } from "@/hooks/usePhotoResource";

interface PhotoDetailModalProps {
  imageResource: ReturnType<typeof wrapPromise<DetailePhoto>>;
  onClose: () => void;
}

function PhotoDetailModal({ imageResource, onClose }: PhotoDetailModalProps) {
  const photo = imageResource.read();
  // valueが存在する項目のみにフィルタリング
  const items = [
    {
      label: "Likes",
      value: photo.likes,
    },
    {
      label: "Downloads",
      value: photo.downloads,
    },
    {
      label: "Location",
      value: photo.location?.country,
    },
  ].filter((item) => item.value);

  return (
    <Dialog open={!!photo} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={photo.alt_description || "Photo Detail"}
        className="max-h-[90vh] max-w-4xl overflow-y-auto p-0"
      >
        <div className="relative h-[60vh] flex-shrink-0">
          <img
            src={photo.urls.regular}
            alt={photo.alt_description || "Photo Detail"}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="px-6 pb-6 space-y-6">
          <DialogTitle className="text-3xl font-bold">
            {photo.alt_description}
          </DialogTitle>
          <span className="text-muted-foreground">
            photo by @{photo.user.username}
          </span>

          <div className="flex flex-wrap gap-8">
            {items.map((item) => (
              <div key={item.label}>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-lg">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {photo.tags.map((tag) => (
              <Button variant="outline" size={"sm"} key={tag.title}>
                {tag.title}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

type PhotoDetailViewProps = {
  photoId: string;
  onClose: () => void;
};

export default function PhotoDetail({
  photoId,
  onClose,
}: PhotoDetailViewProps) {
  const photoDetails = usePhotoDetailResource(photoId!);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhotoDetailModal imageResource={photoDetails} onClose={onClose} />;
    </Suspense>
  );
}
