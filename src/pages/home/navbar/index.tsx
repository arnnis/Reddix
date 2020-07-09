import React, { FC } from "react";
import styled from "styled-components";
import { ReactComponent as HotIcon } from "../../../assets/svg/fire.svg";

const NavBar: FC = () => {
  const renderAppLogo = () => (
    <LogoContainer>
      <LogoTilte>Reddix</LogoTilte>
    </LogoContainer>
  );

  const renderCategorySection = () => (
    <SectionContainer>
      <SectionTitleContainer>
        <SectionTitle>CATEGORY</SectionTitle>
      </SectionTitleContainer>
      <SectionDivider />
      <SectionItemContainer>
        <HotIcon style={{ marginLeft: -3 }} />
        <SectionItemTitle>Test</SectionItemTitle>
      </SectionItemContainer>
      <SectionItemContainer>
        <HotIcon style={{ marginLeft: -3 }} />
        <SectionItemTitle>Test</SectionItemTitle>
      </SectionItemContainer>
    </SectionContainer>
  );

  return (
    <Container>
      {renderAppLogo()}
      {renderCategorySection()}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 300px;
  height: 100%;
  background-color: #fff;
  flex-direction: column;
  box-shadow: 5px 0px 5px -4px rgba(0, 0, 0, 0.75);
`;

const LogoContainer = styled.div`
  display: flex;
  height: 150px;
  width: 100%;
  //background-color: navajowhite;
  align-items: center;
  padding-left: 40px;
`;

const LogoTilte = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const SectionContainer = styled.div`
  background-color: #fff;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 25px;
`;

const SectionTitleContainer = styled.div`
  display: flex;
  width: 100%;
`;

const SectionTitle = styled.span`
  font-size: 14px;
  color: #6d6f76;
  margin-bottom: 10px;
  font-weight: 500;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: darkgrey;
`;

const SectionItemContainer = styled.div`
  height: 40px;
  display: flex;
  width: 100%;
  align-items: center;
`;

const SectionItemTitle = styled.span`
  font-size: 14px;
  color: black;
  margin-left: 7.5px;
`;

export default NavBar;
