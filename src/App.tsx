import Hero from "./components/Hero";
import RandomList from "./components/RandomList";

function App() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <Hero query="" handleSearch={(query) => console.log(query)} />
        <div className="container mx-auto space-y-8 py-8">
          {/* 検索していない時はカテゴリーの一覧を表示 */}
          <RandomList />
          {/* 検索の場合 */}
        </div>
      </main>
    </>
  );
}

export default App;
