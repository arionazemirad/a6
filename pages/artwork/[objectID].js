import { useRouter } from "next/router";
import ArtworkCardDetail from "../../components/ArtworkCardDetail"; // Adjust path if necessary
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ArtworkById = () => {
  const router = useRouter();
  const { objectID } = router.query; // Retrieve objectID from route parameters

  // If objectID is not yet available (during initial load), don't render the component
  if (!objectID) return <div>Loading...</div>;

  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
};

export default ArtworkById;
