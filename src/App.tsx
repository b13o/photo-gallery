import {
  useState,
  Suspense,
  useDeferredValue,
  useCallback,
  startTransition,
} from "react";
import Hero from "./components/Hero";
import RandomList from "./components/RandomList";
import SearchResult from "./components/SearchResult";
import PhotoDetail from "./components/PhotoDetail";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleSelectPhoto = useCallback((photoId: string | null) => {
    startTransition(() => {
      setSelectedPhoto(photoId);
    });
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <main className="min-h-screen bg-background">
        <Hero
          query={searchQuery}
          handleSelectPhoto={handleSelectPhoto}
          handleSearch={handleSearch}
        />
        <div className="container mx-auto space-y-8 py-8">
          {/* 検索していない時はカテゴリーの一覧を表示 */}
          {!deferredQuery && (
            <RandomList handleSelectPhoto={handleSelectPhoto} />
          )}
          {/* 検索の場合 */}
          {deferredQuery && (
            <ErrorBoundary
              fallback={
                <p className="text-red-500 text-3xl">Something went wrong :(</p>
              }
            >
              <Suspense fallback={<p>Searching...</p>}>
                <div
                  className={
                    searchQuery !== deferredQuery ? "animate-pulse" : "" // バックグラウンドでレンダリング結果を準備
                  }
                >
                  <SearchResult
                    handleSelectPhoto={handleSelectPhoto}
                    query={deferredQuery}
                  />
                </div>
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
      </main>

      {/* クリック時の詳細 */}
      {selectedPhoto && (
        <PhotoDetail
          photoId={selectedPhoto}
          onClose={() => handleSelectPhoto(null)}
        />
      )}
    </>
  );
}

export default App;
