import React, { useContext, useMemo } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

export function AppNavbar() {
  const { isAuthenticated, isAdminAuthenticated, loading, logoutUser, logoutAdmin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = useMemo(() => {
    const p = location.pathname;
    return p === "/login" || p === "/register" || p === "/admin-login";
  }, [location.pathname]);

  const handleLogout = () => {
    if (isAdminAuthenticated) {
      logoutAdmin();
      navigate("/admin-login", { replace: true });
      return;
    }
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="app-navbar border-bottom border-dark-subtle"
      sticky="top"
    >
      <Container fluid className="px-3 px-md-4">
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Tech Video
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="mt-2 mt-lg-0">
          <Nav className="me-auto gap-lg-2">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>

            {isAuthenticated && (
              <Nav.Link as={NavLink} to="/videos">
                Videos
              </Nav.Link>
            )}

            {isAdminAuthenticated && (
              <Nav.Link as={NavLink} to="/admin-home">
                Admin Dashboard
              </Nav.Link>
            )}
          </Nav>

          <div className="d-flex flex-column flex-lg-row gap-2 align-items-stretch align-items-lg-center">
            {!loading && !isAuthenticated && !isAdminAuthenticated && !isAuthPage && (
              <>
                <Button as={Link} to="/login" variant="outline-light">
                  User Sign In
                </Button>
                <Button as={Link} to="/admin-login" variant="danger">
                  Admin Sign In
                </Button>
              </>
            )}

            {!loading && (isAuthenticated || isAdminAuthenticated) && (
              <Button variant="outline-warning" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

