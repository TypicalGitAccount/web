import React from "react";
import styled from "styled-components";

import CustomLink from "../CustomLink/CustomLink";
import { gradientAnimation } from "../GlobalStyles";
import useAuthContext from "../../сontext/hooks";

export const Header = () => {
  const { user, logoutUser } = useAuthContext();

  return (
    <HeaderArea>
      <NavLinkContainer>
        <CustomLink label="Home" route="/web" />
        {user && (
          <>
            <CustomLink label="Create" route="/web/polls/create" />
            <CustomLink label="Manage Polls" route="/web/polls/manage" />
          </>
        )}
      </NavLinkContainer>
      <NavAccountLinks>
        {user ? (
          <>
            <StyledUserName>Hello, {user.name}</StyledUserName>
            <CustomLink label="Log out" route="/web" onClick={logoutUser} />
          </>
        ) : (
          <>
            <CustomLink label="Log in" route="/web/login" />
            <CustomLink label="Sign up" route="/web/signup" />
          </>
        )}
      </NavAccountLinks>
    </HeaderArea>
  );
};

const HeaderArea = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 150px;
  height: 100px;

  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const NavLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavAccountLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledUserName = styled.div`
  display: inline-block;
  color: #000;
  padding: 0 40px 0 0;
  font-size: 26px;
`;
