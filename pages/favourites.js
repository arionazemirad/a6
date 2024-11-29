import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail"; // Import the ArtworkCardDetail component

const Favourites = () => {
  // Get the favourites list from the atom
  const [favouritesList] = useAtom(favouritesAtom);

  // Prevent rendering if the favouritesList is not yet loaded
  if (!favouritesList) return null;

  return (
    <div className="container">
      <h1>Your Favourite Artwork</h1>

      {/* Check if favouritesList is empty and show a message */}
      {favouritesList.length === 0 ? (
        <div>
          <p>Nothing Here, try adding some new artwork to the list.</p>
        </div>
      ) : (
        <Row>
          {/* Loop through each item in the favourites list and render it using ArtworkCardDetail */}
          {favouritesList.map((objectID) => (
            <Col key={objectID} md={4} className="mb-4">
              <ArtworkCardDetail objectID={objectID} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Favourites;
