// components/Layout.jsx
import { Container } from "react-bootstrap";
import MainNav from "./MainNav"; // Adjust the path as needed

const Layout = ({ children }) => {
  // Destructure children from props
  return (
    <>
      <MainNav />
      <br />
      <Container>{children}</Container>{" "}
      {/* Now children will be available here */}
      <br />
    </>
  );
};

export default Layout;
