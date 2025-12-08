import Link from "next/link";
export default function Custom404() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Oops — page not found.</h2>
      <p>the page couldn’t find what you’re looking for.</p>
      <p><Link href="/">Back to home</Link></p>
    </div>
  );}
