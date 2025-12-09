/*********************************************************************************
* WEB422 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: kamdin kianpour    Student ID: 134281229    Date: 7 dec
*
* Vercel App (Deployed) Link: https://web422-a3-books.vercel.app/register
*
********************************************************************************/

import Link from "next/link";
import { Card, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookCard({ workId, title, cover_i, first_publish_year }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const isFavourited = favouritesList && favouritesList.includes(workId);

  async function handleFavourite() {
    if (isFavourited) {
      const updated = await removeFromFavourites(workId);
      setFavouritesList(updated);
    } else {
      const updated = await addToFavourites(workId);
      setFavouritesList(updated);
    }
  }

  const coverUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : "https://via.placeholder.com/180x280?text=No+Cover";

  return (
    <Card>
      <Card.Img variant="top" src={coverUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>First published: {first_publish_year || "Unknown"}</Card.Text>
        <Link href={`/works/${workId}`} passHref legacyBehavior>
          <Button className="me-2">View Details</Button>
        </Link>
        <Button
          variant={isFavourited ? "primary" : "outline-primary"}
          onClick={handleFavourite}
        >
          {isFavourited ? "Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
