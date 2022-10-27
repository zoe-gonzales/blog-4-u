// Header.tsx
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { linkStyles, textColor } from "./styled";

const Nav = styled.nav`
  display: flex;
  padding: 2rem;
  align-items: center;
`;

const StyledLink = styled.a`
  ${linkStyles}
  text-decoration: none;
  display: inline-block;
  cursor: pointer;

  .bold {
    font-weight: bold;
  }

  & + & {
    margin-left: 1rem;
  }
`;

const UserDetails = styled.p`
  display: inline-block;
  font-size: 13px;
  padding-right: 1rem;
`;

const RightNav = styled.div`
  margin-left: auto;

  a {
    border: 1px solid var(--geist-foreground);
    padding: 0.5rem 1rem;
    border-radius: 3px;
  }

  button {
    border: none;
  }
`;

const LeftNav = styled.div`
  a[data-active="true"] {
    color: ${textColor};
    font-weight: 800;
  }
`;

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <LeftNav>
      <Link href="/">
        <StyledLink className="bold" data-active={isActive("/")}>
          Feed
        </StyledLink>
      </Link>
    </LeftNav>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <LeftNav>
        <Link href="/">
          <StyledLink className="bold" data-active={isActive("/")}>
            Feed
          </StyledLink>
        </Link>
      </LeftNav>
    );
    right = (
      <RightNav>
        <p>Validating session ...</p>
      </RightNav>
    );
  }

  if (!session) {
    right = (
      <RightNav>
        <Link href="/api/auth/signin">
          <StyledLink data-active={isActive("/signup")}>Log in</StyledLink>
        </Link>
      </RightNav>
    );
  }

  if (session) {
    left = (
      <LeftNav>
        <Link href="/">
          <StyledLink className="bold" data-active={isActive("/")}>
            Feed
          </StyledLink>
        </Link>
        <Link href="/drafts">
          <StyledLink data-active={isActive("/drafts")}>My drafts</StyledLink>
        </Link>
      </LeftNav>
    );
    right = (
      <RightNav>
        <UserDetails>
          {session.user.name} ({session.user.email})
        </UserDetails>
        <Link href="/create">
          <button>
            <StyledLink>New post</StyledLink>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <StyledLink>Log out</StyledLink>
        </button>
      </RightNav>
    );
  }

  return (
    <Nav>
      {left}
      {right}
    </Nav>
  );
};

export default Header;
