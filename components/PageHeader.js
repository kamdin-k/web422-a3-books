import { Card } from 'react-bootstrap';

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <div className="h5 mb-0">{text}</div>
          {subtext ? <div className="text-muted small mt-1">{subtext}</div> : null}
        </Card.Body>
      </Card>
      <br />
    </>
  );
}
