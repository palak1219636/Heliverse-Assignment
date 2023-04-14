import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mock_data } from "../hooks/data";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFilters } from "../redux/mainSlice";

const FilterMenu = ({ closeMenu }) => {
  const selectedFilters = useSelector(
    (state) => state.mainState.selectedFilters
  );
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Domain");
  const DomainList = [...new Set(mock_data.map((item) => item.domain))];
  const GenderList = [...new Set(mock_data.map((item) => item.gender))];

  const [selectedFilter, setSelectedFilter] = useState({
    domain: [],
    gender: [],
    availibility: null,
  });

  useEffect(() => {
    setSelectedFilter(selectedFilters);
  }, []);

  const handleClose = () => {
    dispatch(setSelectedFilters(selectedFilter));
    closeMenu((p) => !p);
  };

  return (
    <Background>
      <Container>
        <CloseButton onClick={handleClose}>
          <i />
        </CloseButton>
        <LeftSection>
          <TabsWrapper>
            {["Domain", "Gender", "Availability"].map((item, index) => (
              <Tabs
                className={item === selectedTab ? "active" : ""}
                key={index}
              >
                <input
                  type="radio"
                  name="tabs"
                  onChange={() => setSelectedTab(item)}
                />
                {item}
              </Tabs>
            ))}
          </TabsWrapper>
        </LeftSection>
        <RightSection>
          <ItemWrapper>
            {selectedTab === "Domain" &&
              DomainList.map((item, index) => (
                <Item
                  className={
                    selectedFilter.domain.includes(item) ? "active" : ""
                  }
                  key={index}
                >
                  <input
                    type="checkbox"
                    name="tabs"
                    onChange={() =>
                      setSelectedFilter(
                        selectedFilter.domain.includes(item)
                          ? {
                              ...selectedFilter,
                              domain: selectedFilter.domain.filter(
                                (d) => d !== item
                              ),
                            }
                          : {
                              ...selectedFilter,
                              domain: [...selectedFilter.domain, item],
                            }
                      )
                    }
                  />
                  {item}
                </Item>
              ))}
            {selectedTab === "Gender" &&
              GenderList.map((item, index) => (
                <Item
                  className={
                    selectedFilter.gender.includes(item) ? "active" : ""
                  }
                  key={index}
                >
                  <input
                    type="checkbox"
                    name="tabs"
                    onChange={() =>
                      setSelectedFilter(
                        selectedFilter.gender.includes(item)
                          ? {
                              ...selectedFilter,
                              gender: selectedFilter.gender.filter(
                                (d) => d !== item
                              ),
                            }
                          : {
                              ...selectedFilter,
                              gender: [...selectedFilter.gender, item],
                            }
                      )
                    }
                  />
                  {item}
                </Item>
              ))}
            {selectedTab === "Availability" &&
              ["Available", "Unavailable"].map((item, index) => (
                <Item
                  className={
                    selectedFilter.availibility === item ? "active" : ""
                  }
                  key={index}
                >
                  <input
                    type="checkbox"
                    name="tabs"
                    onChange={() =>
                      setSelectedFilter(
                        selectedFilter.availibility === item
                          ? {
                              ...selectedFilter,
                              availibility: null,
                            }
                          : {
                              ...selectedFilter,
                              availibility: item,
                            }
                      )
                    }
                  />
                  {item}
                </Item>
              ))}
          </ItemWrapper>
        </RightSection>
      </Container>
    </Background>
  );
};

export default FilterMenu;

const Background = styled.div`
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Container = styled.div`
  width: 730px;
  height: 63vh;
  margin-top: 100px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  gap: 30px;
  position: relative;
  @media screen and (max-width: 750px) {
    width: 500px;
    height: 68vh;
  }
  @media screen and (max-width: 530px) {
    margin-top: 100px;
    width: 350px;
  }
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
      background-color: #fff;
      transition: 0.5s ease-in-out;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
  @media screen and (max-width: 750px) {
    height: 2rem;
    width: 2rem;
    position: absolute;
    top: 15px;
  }
  @media screen and (max-width: 530px) {
    height: 1.6rem;
    width: 1.6rem;
    position: absolute;
    top: 10px;
  }
`;

const LeftSection = styled.div`
  width: 250px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px;
  gap: 20px;
  @media screen and (max-width: 750px) {
    width: 220px;
  }
  @media screen and (max-width: 530px) {
    width: 200px;
  }
`;

const TabsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const Tabs = styled.label`
  width: 100%;
  height: 48px;
  font-size: 1.5rem;
  text-align: right;
  line-height: 48px;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  transition: all ease-in-out 0.3s;
  color: rgba(255, 255, 255, 0.7);
  position: relative;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 0.2em;
    background: black;
    left: 0;
    bottom: 0;
    transition: all ease-in-out 0.3s;
    background-image: linear-gradient(to right, #5e42a6, #b74e91);
  }
  &.active {
    color: #fff;
  }

  &:not(.active)::after {
    opacity: 0.2;
  }

  &:not(.active):hover {
    color: rgba(255, 255, 255, 1);
  }
  & > input {
    display: none;
  }
  @media screen and (max-width: 750px) {
    font-size: 1.1rem;
  }
  @media screen and (max-width: 530px) {
    width: 80px;
    font-size: 0.85rem;
    line-height: 48px;
    letter-spacing: 0.06rem;
    text-align: left;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 0.2em;
      left: -2px;
      bottom: 0;
    }
  }
`;

const RightSection = styled.div`
  max-width: 75%;
  @media screen and (max-width: 530px) {
    width: 60%;
  }
`;
const ItemWrapper = styled(TabsWrapper)``;

const Item = styled(Tabs)`
  text-align: left;
  letter-spacing: 0.1rem;
  &::after {
    background-image: linear-gradient(
      91deg,
      rgba(72, 154, 78, 1) 5.2%,
      rgba(251, 206, 70, 1) 95.9%
    );
    transition: all ease-in 0.1s;
  }
  &:not(.active):hover::after {
    opacity: 0.7;
  }
  @media screen and (max-width: 750px) {
    width: 200px;
  }
`;
