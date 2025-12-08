import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
const fetcher = (url) => fetch(url).then((r) => r.json());
export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useSWR(
    () => (id ? `https://fakestoreapi.com/products/${id}` : null),
    fetcher);
  if (error) return <p>Failed to load.</p>;
  if (isLoading || !data) return <p>Loading...</p>;
  const { title, price, description, category, image, rating } = data;
  return (
    <article>
      <p><Link href="/">&larr; Back to home</Link></p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <img src={image} alt={title} style={{ width: "100%", height: 300, objectFit: "contain" }} />
        </div>
        <div>
          <h2>{title}</h2>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Price:</strong> ${price.toFixed(2)}</p>
          <p><strong>Rating:</strong> {rating?.rate ?? "N/A"} ({rating?.count ?? 0} reviews)</p>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );}
