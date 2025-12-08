import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import PageHeader from '@/components/PageHeader';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      author: '',
      title: '',
      subject: '',
      language: '',
      first_publish_year: ''
    }
  });

  function onSubmit(data) {
    // keep only non-empty fields
    const entries = Object.entries(data).filter(([, v]) => v !== '' && v !== null && v !== undefined);
    router.push({ pathname: '/books', query: Object.fromEntries(entries) });
  }

  return (
    <>
      <PageHeader text="Search" subtext="Find books on Open Library" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12}>
            <Form.Group controlId="formAuthor" className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                isInvalid={!!errors.author}
                {...register('author', { required: true })}
              />
              <Form.Control.Feedback type="invalid">
                Author is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                {...register('title')}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="formSubject" className="mb-3">
              <Form.Label>Subject (contains)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject keyword"
                {...register('subject')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col lg={6}>
            <Form.Group controlId="formLanguage" className="mb-3">
              <Form.Label>Language Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter language code (e.g. eng)"
                maxLength={3}
                {...register('language')}
              />
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group controlId="formPublishYear" className="mb-3">
              <Form.Label>First Published (Year)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter published year"
                {...register('first_publish_year')}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <Button variant="primary" type="submit" className="w-100 py-3 fs-5">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
