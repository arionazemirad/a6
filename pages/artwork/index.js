/*********************************************************************************
*  WEB422 – Assignment 6
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Ario NazemiradStudent ID: 144647229 Date: Nov 29th
*
*  Vercel App (Deployed) Link: _____________________________________________________
*
********************************************************************************/ 

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Row, Col, Card, Pagination } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import validObjectIDList from "@/public/data/validObjectIDList.json";

const PER_PAGE = 12;

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

const Artwork = () => {
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const finalQuery = router.asPath.split("?")[1];

  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );

      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1); // Reset page to 1 whenever data changes
    }
  }, [data]);

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!artworkList || artworkList.length === 0) {
    return (
      <Card>
        <Card.Body>
          <h4>Nothing Here</h4>
          <p>Try searching for something else.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Row className='gy-4'>
        {artworkList[page - 1].map((currentObjectID) => (
          <Col lg={3} key={currentObjectID}>
            <ArtworkCard objectID={currentObjectID} />
          </Col>
        ))}
      </Row>

      <Row className='mt-4'>
        <Col>
          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>
        </Col>
      </Row>
    </>
  );
};

export default Artwork;
