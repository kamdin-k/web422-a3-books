import { Container, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { favouritesAtom } from '@/store';

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const people = book?.subject_people?.length ? book.subject_people.join(', ') : null;
  const places = book?.subject_places?.length ? book.subject_places.join(', ') : null;
  const links = Array.isArray(book?.links) ? book.links : [];

  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(workId ? favourites.includes(workId) : false);

  useEffect(() => {
    if (workId) setShowAdded(favourites.includes(workId));
  }, [favourites, workId]);

  function favouritesClicked() {
    if (!workId) return;
    if (showAdded) {
      setFavourites(list => list.filter(id => id !== workId));
      setShowAdded(false);
    } else {
      setFavourites(list => [...list, workId]);
      setShowAdded(true);
    }
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br /><br />
          {showFavouriteBtn && workId && (
            <button
              className={`btn ${showAdded ? 'btn-primary' : 'btn-outline-primary'} w-100`}
              onClick={favouritesClicked}
            >
              {showAdded ? '+ Favourite (added)' : '+ Favourite'}
            </button>
          )}
        </Col>
        <Col lg="8">
          <h3>{book?.title}</h3>

          {book?.description && (
            <p>{typeof book.description === 'string' ? book.description : book.description.value}</p>
          )}

          {people && (<><h5>Characters</h5>{people}<br /><br /></>)}
          {places && (<><h5>Settings</h5>{places}<br /><br /></>)}

          {links.length > 0 && (
            <>
              <h5>More Information</h5>
              {links.map((lnk, i) => (
                <span key={i}>
                  <a href={lnk.url} target="_blank" rel="noreferrer">{lnk.title || lnk.url}</a><br />
                </span>
              ))}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
