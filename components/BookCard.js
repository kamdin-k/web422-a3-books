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

import useSWR from 'swr';
import Link from 'next/link';
import Error from 'next/error';

const fetcher = (...a) => fetch(...a).then(r => r.json());

export default function BookCard({ workId }) {
  const { data, error } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    fetcher
  );
  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const coverId = data.covers?.[0];
  const imgSrc = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : 'https://placehold.co/300x450?text=No+Cover';

  return (
    <div className="card h-100">
      <img className="card-img-top" src={imgSrc} alt={data.title || ''} />
      <div className="card-body">
        <h5 className="card-title">{data.title || ''}</h5>
        <p className="card-text">{data.first_publish_date || 'N/A'}</p>
        <Link className="btn btn-outline-primary" href={`/works/${workId}`}>Details</Link>
      </div>
    </div>
  );
}
