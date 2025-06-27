import AnimeCard, { AnimeProp } from "@/components/AnimeHubCard";
import LoadMore from "../components/Loader";
import SearchBar from "@/components/SearchBar";
import { fetchTopAnime, convertJikanToAnimeProp } from "@/lib/jikan-api";

async function Home() {
  let initialAnime: AnimeProp[] = [];
  let error: string | null = null;

  try {
    const response = await fetchTopAnime(1);
    initialAnime = response.data.map(convertJikanToAnimeProp);
  } catch (err) {
    console.error("Error fetching initial anime:", err);
    error = "Failed to load anime. Please try again later.";
  }

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <SearchBar />

      <h2 className="text-3xl text-white font-bold">Top Anime</h2>

      {error ? (
        <div className="text-red-500 text-center py-10">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {initialAnime.map((item: AnimeProp, index) => (
              <AnimeCard key={item.id} anime={item} index={index} />
            ))}
          </section>
          <LoadMore initialAnime={initialAnime} />
        </>
      )}
    </main>
  );
}

export default Home;
