import PageHeader from '@/components/PageHeader';
import BookDetails from '@/components/BookDetails';

export async function getStaticProps() {
  const WORK_ID = 'OL453657W'; // The Colour of Magic (example)
  try {
    const res = await fetch(`https://openlibrary.org/works/${WORK_ID}.json`);
    const book = await res.json();
    return { props: { book }, revalidate: 3600 };
  } catch (err) {
    // Fallback content if fetch fails
    return {
      props: {
        book: {
          title: 'About This App',
          description: 'WEB422 Assignment — Books app.',
        },
      },
      revalidate: 3600,
    };
  }
}

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer — Kamdin Kianpour" />
      <p>
        I chose <strong>The Colour of Magic</strong> by Terry Pratchett because it reminded me of
        stories like <em>The Lord of the Rings</em>. It’s a fun mix of sci-fi and fantasy with humor
        and creative world-building. I liked how it pokes fun at classic adventure stories while
        still being interesting to read.
      </p>
      <BookDetails book={book} showFavouriteBtn={false} />
    </>
  );
}
