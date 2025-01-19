import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { wrapPromise } from "@/utils/suspense";
import { fetchHeroPhoto } from "@/utils/api";
import SearchBar from "./SearchBar";

const imageResource = wrapPromise(fetchHeroPhoto("nature"));
const BGImage = () => {
  const photo = imageResource.read();
  return (
    <img
      src={photo.urls.regular}
      alt={photo.alt_description || "Header Photo"}
      className="h-full w-full object-cover"
    />
  );
};

type HeroProps = {
  query: string;
  handleSearch: (query: string) => void;
};

export default function Hero({ handleSearch, query }: HeroProps) {
  return (
    <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
      <ErrorBoundary
        fallback={<p className="text-red-500 text-8xl text-center">Error</p>}
      >
        <Suspense
          fallback={
            <div className="h-10 w-10 flex items-center justify-center animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          }
        >
          <BGImage />
        </Suspense>
      </ErrorBoundary>

      {/* グラデーションで上乗せ */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent">
        <div className="container mx-auto flex h-full max-w-screen-xl items-center">
          <div className="max-w-2xl space-y-8 text-white">
            <Button size="lg" className="bg-gray-500/50">
              <Info className="mr-2 h-5 w-5" />
              Header Info
            </Button>
            <h1 className="text-4xl font-bold md:text-6xl">MY Photo Gallery</h1>
            <p className="text-lg text-gray-200">
              世界中の素晴らしい写真家が提供する、高品質な画像を検索できます。
              <br />
              今日の気分から、次のアイデア探しまで、視覚的なイメージを得ましょう
              📸
            </p>
            <SearchBar value={query} onChange={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}
