// pages/favourites.js
import { useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";
import { getFavourites } from "@/lib/userData";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  useEffect(() => {
    async function load() {
      const favs = await getFavourites();
      setFavouritesList(favs);
    }
    load();
  }, [setFavouritesList]);

  if (!favouritesList) return null;

  if (!favouritesList.length) {
    return (
      <PageHeader
        text="Nothing Here"
        subtext="Add some books to your favourites."
      />
    );
  }

  return (
    <>
      <PageHeader text="Favourites" subtext="Your Favourite Books" />
      <div className="row gy-4">
        {favouritesList.map((workId) => (
          <div className="col-lg-3 col-md-6" key={workId}>
            <BookCard workId={workId} />
          </div>
        ))}
      </div>
    </>
  );
}
