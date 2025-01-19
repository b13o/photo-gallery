import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BasicPhoto } from "@/types/photo";

interface PhotoCardProps {
  photo: BasicPhoto;
  className?: string;
  handleSelectPhoto: (photoId: string) => void;
}

function PhotoCard({ className, photo, handleSelectPhoto }: PhotoCardProps) {
  return (
    <div
      className={cn(
        "relative aspect-[3/2] overflow-hidden rounded-lg bg-muted transition-transform duration-300 scale-95 hover:scale-100",
        className
      )}
      onClick={() => handleSelectPhoto(photo.id)}
    >
      <img
        src={photo.urls.regular}
        alt={photo.alt_description || "Unsplash Photo"}
        className="h-full w-full object-cover transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100">
        <div className="absolute bottom-0 p-4 text-white">
          <Button size="sm" className="gap-2">
            <Play className="h-4 w-4" />
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PhotoCard;
