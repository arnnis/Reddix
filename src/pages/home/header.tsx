import React from 'react'
import styled from "styled-components";

const Header = () => {
    return (
        <Container>
            <CategoryTitle>Best</CategoryTitle>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  height: 75px;
  width: 100%;

  align-items: center;

`

const CategoryTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
`

export default  Header