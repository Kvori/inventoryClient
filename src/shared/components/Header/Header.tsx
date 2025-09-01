import { Container, Navbar } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ReactionButton from "../ReactionButton/ReactionButton";
import { Link, useNavigate } from "react-router-dom";
import routes from "@/app/config/routesConfig";
import { useLogoutMutation } from "@/features/user/userApi";
import { memo, useEffect } from "react";
import { clearUser } from "@/features/user/userSlice";
import MemoNavButton from "./components/NavButton";

function Header() {


  return (
    <Navbar className="bg-body-tertiary mb-5" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to={'/'}>Inventories</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
              <MemoNavButton />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;