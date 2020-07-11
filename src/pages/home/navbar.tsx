import React, { FC } from "react";
import styled from "styled-components";
import { ReactComponent as HotIcon } from "../../assets/svg/fire.svg";
import { ReactComponent as NewIcon } from "../../assets/svg/plus-box.svg";
import { ReactComponent as ChartIcon } from "../../assets/svg/chart-bar.svg";

const NavBar: FC = () => {
  const renderAppLogo = () => (
    <LogoContainer>
      <LogoTilte>Reddix</LogoTilte>
    </LogoContainer>
  );

  const renderHomeSection = () => (
    <Section title="Home">
      <SectionItem
        title="NEW"
        icon={
          <NewIcon style={{ marginLeft: -3, fill: "#CECECE", height: 19 }} />
        }
      />
      <SectionItem
        title="BEST"
        icon={<HotIcon style={{ marginLeft: -3, fill: "#494949" }} />}
        selected
      />
      <SectionItem
        title="TOP"
        icon={
          <ChartIcon style={{ marginLeft: -3, fill: "#CECECE", height: 19 }} />
        }
      />
    </Section>
  );

  return (
    <Container>
      {renderAppLogo()}
      {renderHomeSection()}
      {/*{renderCategorySection("SUBREDDITS")}*/}
    </Container>
  );
};

const Section: FC<{ title: string }> = ({ title, children }) => (
  <SectionContainer>
    <SectionTitleContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionDivider />
    </SectionTitleContainer>
    {children}
  </SectionContainer>
);

const SectionItem: FC<{
  icon: any;
  title: string;
  onPress?(): void;
  selected?: boolean;
}> = ({ icon, title, onPress, selected }) => (
  <SectionItemContainer selected={selected}>
    {icon}
    <SectionItemTitle selected={selected}>title</SectionItemTitle>
  </SectionItemContainer>
);

const Container = styled.div`
  display: flex;
  width: 300px;
  height: 100%;
  background-color: #fff;
  flex-direction: column;
  box-shadow: 10px 0px 15px -19px rgba(150, 150, 150, 1);
`;

const LogoContainer = styled.div`
  display: flex;
  height: 150px;
  width: 100%;
  //background-color: navajowhite;
  align-items: center;
  padding-left: 35px;
`;

const LogoTilte = styled.div`
  font-size: 19px;
  font-weight: bold;
  color: #e04e18;
`;

const SectionContainer = styled.div`
  background-color: #fff;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
`;

const SectionTitleContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 35px 0 35px;
  flex-direction: column;
  margin-bottom: 10px;
`;

const SectionTitle = styled.span`
  font-size: 14px;
  color: #6d6f76;
  margin-bottom: 10px;
  font-weight: 500;
`;

const SectionDivider = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: whitesmoke;
`;

const SectionItemContainer = styled.div<{ selected?: boolean }>`
  position: relative;
  height: 47.5px;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0px 35px 0 35px;
  cursor: pointer;
`;

const SectionItemTitle = styled.span<{ selected?: boolean }>`
  font-size: 13.5px;
  color: ${(props) => (props.selected ? "#494949" : "#CECECE")};
  margin-left: 15px;
  font-weight: bold;
`;

const SectionItemSelectedBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4.5px;
  background-color: #e04e18;
`;

export default NavBar;
