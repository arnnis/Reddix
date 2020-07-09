import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  flexDirection?: React.CSSProperties["flexDirection"];
}

const Flex: FC<Props> = ({
  justifyContent = "initial",
  alignItems = "initial",
  flexDirection = "initial",
  children,
}) => {
  return (
    <Container style={{ justifyContent, alignItems, flexDirection }}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export default Flex;
