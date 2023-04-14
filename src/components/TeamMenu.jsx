import styled from "styled-components";
import { useSelector } from "react-redux";
import Card from "./Card";

const TeamMenu = ({ closeMenu }) => {
  const selectedMembers = useSelector(
    (state) => state.mainState.selectedMembers
  );

  return (
    <Background>
      <Container>
        <CloseButton onClick={closeMenu}>
          <i />
        </CloseButton>
        <CardWrapper>
          {selectedMembers.map((record) => (
            <Card record={record} key={record.id} noIcon />
          ))}
        </CardWrapper>
      </Container>
    </Background>
  );
};

export default TeamMenu;

const Background = styled.div`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  position: relative;
  padding: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 30px;
  top: 30px;
  outline: none;
  color: #d0d1d6;
  font-size: 1rem;
  height: 3rem;
  width: 3rem;
  z-index: 4;
  background-color: rgba(255, 255, 255, 0.13);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  & > i {
    position: absolute;
    right: 50%;
    top: 50%;
    width: 22px;
    height: 22px;
    translate: 50% -50%;
    &:before,
    &:after {
      position: absolute;
      left: 10px;
      content: " ";
      height: 22px;
      width: 2px;
      background-color: #333;
      transition: 0.5s ease-in-out;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
`;

const CardWrapper = styled.div`
  margin: auto;
  max-width: 95%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1170px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
