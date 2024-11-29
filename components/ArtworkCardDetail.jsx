import useSWR from "swr";
import Error from "next/error";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData"; // Import required functions

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = res.json();
      error.status = res.status;
      throw error;
    }
    return res.json();
  });

const ArtworkCardDetail = ({ objectID }) => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false); // Default value is false

  // Update "showAdded" whenever the "favouritesList" changes
  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  // Conditional fetching: Only fetch data if objectID is available
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  if (error) return <Error statusCode={404}></Error>;
  if (!data) return <div>Loading...</div>;

  // Async function to handle adding/removing the objectID from the favourites list
  const favouritesClicked = async () => {
    if (showAdded) {
      // Remove from favourites
      const updatedList = await removeFromFavourites(objectID);
      setFavouritesList(updatedList); // Update atom
    } else {
      // Add to favourites
      const updatedList = await addToFavourites(objectID);
      setFavouritesList(updatedList); // Update atom
    }
  };

  return (
    <Card style={{ width: "36rem" }}>
      {/* Only render Card.Img if primaryImage is available */}
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
        <Card.Text>
          <p>Date: {data.objectDate ? data.objectDate : "N/A"}</p>
          <p>
            Classification: {data.classification ? data.classification : "N/A"}
          </p>
          <p>Medium: {data.medium ? data.medium : "N/A"}</p>
          <br />
          <br />
          <p>
            Artist:{" "}
            {data.artistDisplayName ? (
              <>
                {data.artistDisplayName}{" "}
                <a
                  href={data.artistWikidata_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  wiki
                </a>
              </>
            ) : (
              "N/A"
            )}
          </p>
          <p>Credit Line: {data.creditLine ? data.creditLine : "N/A"}</p>
          <p>Dimensions: {data.dimensions ? data.dimensions : "N/A"}</p>
        </Card.Text>

        {/* Button to view more details */}
        <Link href={`/artwork/${objectID}`} passHref>
          <Button
            variant="secondary"
            style={{ marginBottom: "10px", display: "block" }}
          >
            View Details
          </Button>
        </Link>

        {/* Button to add/remove from favourites */}
        <Button
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={favouritesClicked}
          style={{ display: "block" }}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
