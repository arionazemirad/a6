import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
    const [expanded, setExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    const token = readToken();
    const userName = token?.userName;

    function logout() {
        removeToken();
        router.push("/login");
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        const searchField = event.target.search.value;
        const queryString = `title=true&q=${searchField}`;
        setSearchHistory(await addToHistory(queryString));
        router.push(`/artwork?${queryString}`);
        setExpanded(false);
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" fixed="top" expand="lg" expanded={expanded} className="navbar-dark">
                <Container>
                    <Navbar.Brand href="/">Ario Nazemirad</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/" active={router.pathname === "/"} onClick={() => setExpanded(false)}>
                                Home
                            </Nav.Link>
                            {token && (
                                <Nav.Link href="/search" active={router.pathname === "/search"} onClick={() => setExpanded(false)}>
                                    Advanced Search
                                </Nav.Link>
                            )}
                        </Nav>
                        {token ? (
                            <>
                                <Form className="d-flex" onSubmit={handleSearch}>
                                    <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        name="search"
                                    />
                                    <Button type="submit" variant="success">
                                        Search
                                    </Button>
                                </Form>
                                <Nav>
                                    <NavDropdown title={userName || "User Name"} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/favourites" onClick={() => setExpanded(false)}>
                                            Favourites
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/history" onClick={() => setExpanded(false)}>
                                            Search History
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={logout}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                        ) : (
                            <Nav>
                                <Nav.Link href="/register" active={router.pathname === "/register"} onClick={() => setExpanded(false)}>
                                    Register
                                </Nav.Link>
                                <Nav.Link href="/login" active={router.pathname === "/login"} onClick={() => setExpanded(false)}>
                                    Log in
                                </Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}