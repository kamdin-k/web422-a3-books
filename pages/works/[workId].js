import { useRouter } from 'next/router';
import useSWR from 'swr';
import PageHeader from '@/components/PageHeader';
import BookDetails from '@/components/BookDetails';

const fetcher = (...a) => fetch(...a).then(r => r.json());

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;
  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null,
    fetcher
  );

  if (error) return <div className="alert alert-danger">Error loading work.</div>;
  if (isLoading || !data) return <div className="alert alert-info">Loading…</div>;

  return (
    <>
      <PageHeader text={data.title || 'Work'} />
      <BookDetails book={data} workId={workId} />
    </>
  );
}
