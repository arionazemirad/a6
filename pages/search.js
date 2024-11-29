import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
// Import addToHistory function from userData.js
import { addToHistory } from "@/lib/userData";

const Search = () => {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Modify submitForm to be async
  const submitForm = async (data) => {
    // Construct queryString in the format "title=true&q=searchValue"
    const queryString = `title=true&q=${encodeURIComponent(data.q)}`;

    try {
      // Update the search history asynchronously using addToHistory
      const updatedHistory = await addToHistory(queryString);

      // Set the updated search history using the result from addToHistory
      setSearchHistory(updatedHistory);

      // Redirect to the artwork page with the generated query string
      router.push(`/artwork?${queryString}`);
    } catch (error) {
      console.error("Error adding to history:", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="q"
                isInvalid={!!errors.q}
                {...register("q", { required: true })}
              />
              <Form.Control.Feedback type="invalid">
                This field is required.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select
              name="searchBy"
              className="mb-3"
              {...register("searchBy")}
            >
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="geoLocation"
                {...register("geoLocation")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (e.g., "Europe", "France", "Paris",
                "China", "New York"), with multiple values separated by the |
                operator
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                name="medium"
                {...register("medium")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (e.g., "Ceramics", "Furniture",
                "Paintings", "Sculpture", "Textiles"), with multiple values
                separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              name="isHighlight"
              {...register("isHighlight")}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              name="isOnView"
              {...register("isOnView")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Search;
