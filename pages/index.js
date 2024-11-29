/*********************************************************************************
*  WEB422 – Assignment 5
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Ario Nazemirad Student ID: 144647229 Date: Nov 13 2024
*
********************************************************************************/


import { Container, Row, Col, Image } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Image
        src='https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg'
        alt='The Metropolitan Museum of Art'
        fluid
        rounded
        className='mt-4 mb-4'
      />
      <Row>
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art of New York City, colloquially "the
            Met", is the largest art museum in the Americas. Its permanent
            collection contains over two million works, divided among 17
            curatorial departments. The main building, at 1000 Fifth Avenue,
            along the Museum Mile on the eastern edge of Central Park in
            Manhattan's Upper East Side, is by area one of the world's largest
            art museums. The first part of the museum opened on February 20,
            1872, in a building located at 681 Fifth Avenue.
          </p>
        </Col>
        <Col md={6}>
          <p>
            A much larger building was constructed at the current site in 1880.
            The Museum has also reached beyond its main building, opening The
            Met Cloisters in Fort Tryon Park in Upper Manhattan in 1938. The Met
            presents over 5,000 years of art from around the world for everyone
            to experience and enjoy.
          </p>
          <p>
            For more information, visit the full Wikipedia entry
            <a
              href='https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art'
              target='_blank'
              rel='noreferrer'
            >
              {" "}
              here
            </a>
            .
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
