import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  flexDirection?: React.CSSProperties["flexDirection"];
  allCenter?: boolean;
  style?: React.CSSProperties;
}

const Flex: FC<Props> = ({
  justifyContent = "initial",
  alignItems = "initial",
  flexDirection = "initial",
  allCenter = false,
  children,
  style = null,
}) => {
  if (allCenter) {
    justifyContent = "center";
    alignItems = "center";
  }
  return (
    <Container style={{ justifyContent, alignItems, flexDirection, ...style }}>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export default Flex;
