import { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  useEffect(() => {
    if (isAuthenticated()) {
      getFavourites().then(favs => {
        setFavouritesList(Array.isArray(favs) ? favs : []);
      });
    } else {
      setFavouritesList([]);
    }
  }, []);

  if (!favouritesList || favouritesList.length === 0) {
    return (
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Nothing Here</Card.Title>
          <Card.Text>Add some books to your favourites.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Row className="mt-4">
      {favouritesList.map(workId => (
        <Col md={3} lg={2} key={workId} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{workId}</Card.Title>
              <Card.Text>This is a favourited work.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
