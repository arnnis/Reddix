import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { finishLogin } from "../slices/app/thunks";

const OauthCallback = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  useEffect(() => {
    const code = query.get("code");
    if (code) {
      dispatch(finishLogin(code));
    } else {
      alert("Login failed. authorization code not available");
    }
  });

  return (
    <Container>
      <AlertText>Logging you in...</AlertText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertText = styled.span`
  font-weight: bold;
  font-size: 17px;
`;

export default OauthCallback;
