import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { buttonStyles, linkStyles, textColor } from "./styled";

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
`;

const LeftNav = styled.div`
  a[data-active="true"] {
    color: ${textColor};
    font-weight: 800;
  }
`;

const LeftNavButton = styled.button`
  ${buttonStyles}
  border: none;
  margin: 0 5px;
  padding: 5px 10px;
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
        <Link href="/s">
          <StyledLink data-active={isActive("/s")}>Browse spaces</StyledLink>
        </Link>
        <Link href="/s/create">
          <StyledLink data-active={isActive("/s/create")}>New space</StyledLink>
        </Link>
      </LeftNav>
    );
    right = (
      <RightNav>
        <UserDetails>
          {session.user.name} ({session.user.email})
        </UserDetails>
        <Link href="/create">
          <LeftNavButton>
            <StyledLink>New post</StyledLink>
          </LeftNavButton>
        </Link>
        <LeftNavButton onClick={() => signOut()}>
          <StyledLink>Log out</StyledLink>
        </LeftNavButton>
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
