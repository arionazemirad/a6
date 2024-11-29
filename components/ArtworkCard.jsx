import useSWR from "swr";
import Error from "next/error";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Link from "next/link";

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
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  if (error) return <Error statusCode={404}></Error>;
  if (!data) return <div>Loading...</div>;

  return (
    <Card
      style={{
        width: "18rem",
        height: "30rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card.Img
        variant='top'
        src={
          data.primaryImage
            ? data.primaryImage
            : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
        }
        style={{ height: "12rem", objectFit: "cover" }}
      />
      <Card.Body style={{ flexGrow: 1 }}>
        <Card.Title
          style={{
            fontSize: "1rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.title ? data.title : "N/A"}
        </Card.Title>
        <Card.Text
          style={{
            fontSize: "0.85rem",
            maxHeight: "6rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <p>Date: {data.objectDate || "N/A"}</p>
          <p>Classification: {data.classification || "N/A"}</p>
          <p>Medium: {data.medium || "N/A"}</p>
        </Card.Text>
        {data.artistDisplayName && (
          <p
            style={{
              fontSize: "0.85rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Artist:{" "}
            <a href={data.artistWikidata_URL} target='_blank' rel='noreferrer'>
              {data.artistDisplayName}
            </a>
          </p>
        )}
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant='primary'>{objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
