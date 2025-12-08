import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Pagination, Table } from 'react-bootstrap';
import PageHeader from '@/components/PageHeader';

const fetcher = (...a) => fetch(...a).then(r => r.json());

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const qs = new URLSearchParams(router.query).toString();
  const { data, error, isLoading } = useSWR(
    `https://openlibrary.org/search.json?${qs}&page=${page}&limit=10`,
    fetcher
  );

  useEffect(() => {
    setPage(1); 
  }, [qs]);

  useEffect(() => {
    if (data?.docs) setPageData(data.docs);
  }, [data]);

  const previous = () => setPage(p => (p > 1 ? p - 1 : p));
  const next = () => setPage(p => p + 1);

  const goToWork = (book) => {
    const workId = (book.key || '').split('/').pop();
    if (workId) router.push(`/works/${workId}`);
  };

  const subtext =
    Object.entries(router.query).filter(([, v]) => v)
      .map(([k, v]) => `${k}=${v}`).join(' • ') || 'Showing results';

  return (
    <>
      <PageHeader text="Search Results" subtext={subtext} />
      {error && <div className="alert alert-danger">Error loading results.</div>}
      {isLoading && <div className="alert alert-info">Loading…</div>}
      <Table striped hover responsive>
        <thead><tr><th>Title</th><th>Published</th></tr></thead>
        <tbody>
          {pageData.map((book) => (
            <tr key={book.key} onClick={() => goToWork(book)} style={{cursor:'pointer'}}>
              <td>{book.title}</td>
              <td>{book.first_publish_year ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev onClick={previous} disabled={page === 1} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next onClick={next} />
        </Pagination>
      </div>
    </>
  );
}
