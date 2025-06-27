"use client";

import { useState } from "react";
import {
  searchAnime,
  convertJikanToAnimeProp,
  AnimeProp,
} from "@/lib/jikan-api";
import AnimeCard from "./AnimeHubCard";
import Image from "next/image";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeProp[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await searchAnime(query.trim());
      const searchResults = response.data.map(convertJikanToAnimeProp);
      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex gap-4 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anime..."
          className="flex-1 px-4 py-2 rounded-lg bg-[#161921] text-white border border-gray-600 focus:border-red-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors"
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {hasSearched && (
          <button
            type="button"
            onClick={clearSearch}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
      </form>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      )}

      {hasSearched && !loading && (
        <div className="mb-10">
          <h3 className="text-2xl text-white font-bold mb-4">
            Search Results ({results.length})
          </h3>
          {results.length > 0 ? (
            <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
              {results.map((item: AnimeProp, index) => (
                <AnimeCard key={item.id} anime={item} index={index} />
              ))}
            </section>
          ) : (
            <p className="text-gray-400 text-center py-10">
              No anime found for "{query}". Try a different search term.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
