"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  fetchTopAnime,
  convertJikanToAnimeProp,
  AnimeProp,
} from "@/lib/jikan-api";
import AnimeCard from "./AnimeHubCard";

export interface LoadMoreProps {
  initialAnime: AnimeProp[];
}

function LoadMore({ initialAnime }: LoadMoreProps) {
  const [anime, setAnime] = useState<AnimeProp[]>(initialAnime);
  const [page, setPage] = useState(2); // Start from page 2 since page 1 is loaded initially
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadMoreAnime = async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);
    try {
      const response = await fetchTopAnime(page);
      const newAnime = response.data.map(convertJikanToAnimeProp);

      setAnime((prev) => [...prev, ...newAnime]);
      setPage((prev) => prev + 1);
      setHasNextPage(response.pagination.has_next_page);
    } catch (error) {
      console.error("Error loading more anime:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreAnime();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasNextPage, page]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {anime.slice(initialAnime.length).map((item: AnimeProp, index) => (
          <AnimeCard
            key={item.id}
            anime={item}
            index={index + initialAnime.length}
          />
        ))}
      </section>

      {loading && (
        <section className="flex justify-center items-center w-full">
          <div>
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        </section>
      )}

      {!hasNextPage && anime.length > 0 && (
        <section className="flex justify-center items-center w-full">
          <p className="text-white text-lg">No more anime to load!</p>
        </section>
      )}
    </>
  );
}

export default LoadMore;
