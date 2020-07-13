import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  flexDirection?: React.CSSProperties["flexDirection"];
  flex?: React.CSSProperties["flex"];
  allCenter?: boolean;
  style?: React.CSSProperties;
}

const Flex: FC<Props> = ({
  justifyContent = "initial",
  alignItems = "initial",
  flexDirection = "initial",
  flex = "initial",
  allCenter = false,
  children,
  style = null,
}) => {
  if (allCenter) {
    justifyContent = "center";
    alignItems = "center";
  }
  return (
    <Container
      style={{ justifyContent, alignItems, flexDirection, flex, ...style }}
    >
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: 1;
`;

export default Flex;
