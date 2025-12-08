import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

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
