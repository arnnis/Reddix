import React from 'react'
import styled from "styled-components";

const Header = () => {
    return (
        <Container>
            <span>Best</span>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  height: 75px;
  width: 100%;
  background-color: green;
  align-items: center;
  padding: 10px;
  
`

export default  Header