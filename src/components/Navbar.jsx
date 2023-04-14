import React, { useRef, useState } from "react";
import styled from "styled-components";
import searchIcon from "/search.svg";
import filterIcon from "/filter.svg";
import teamIcon from "/team.svg";
import FilterMenu from "./FilterMenu";
import TeamMenu from "./TeamMenu";
import { useDispatch, useSelector } from "react-redux";
import { mock_data } from "../hooks/data";
import { resetData, setData } from "../redux/mainSlice";

const Navbar = () => {
  const searchBarRef = useRef();
  const dispatch = useDispatch();
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [teamMenuOpen, setTeamMenuOpen] = useState(false);
  const { domain, gender, availibility } = useSelector(
    (state) => state.mainState.selectedFilters
  );

  const handleSearch = () => {
    const searchQuery = searchBarRef.current.value.toLowerCase();
    if (searchQuery !== "" && searchQuery !== " ")
      dispatch(
        setData(
          mock_data.filter(
            (element) =>
              element.first_name.toLowerCase().includes(searchQuery) ||
              element.last_name.toLowerCase().includes(searchQuery)
          )
        )
      );
    else dispatch(resetData());
  };
  return (
    <React.Fragment>
      {filterMenuOpen && <FilterMenu closeMenu={setFilterMenuOpen} />}
      {teamMenuOpen && (
        <TeamMenu closeMenu={() => setTeamMenuOpen((p) => !p)} />
      )}
      <Container>
        <NavbarWrap className="navbarWrap">
          <Toolbar>
            <LogoBox>Heliverse</LogoBox>
            <SearchBar>
              <SearchButton onClick={handleSearch}>
                <img src={searchIcon} alt="search" />
              </SearchButton>
              <SearchInput
                type="text"
                placeholder="Type to Search..."
                ref={searchBarRef}
              />
            </SearchBar>
            <FilterButton onClick={() => setFilterMenuOpen((p) => !p)}>
              <img src={filterIcon} alt="search" />
            </FilterButton>
            <TeamButton onClick={() => setTeamMenuOpen((p) => !p)}>
              <img src={teamIcon} alt="search" />
            </TeamButton>
          </Toolbar>
        </NavbarWrap>
      </Container>
      <SelectedFilterList>
        {!!domain.length &&
          domain.map((d) => <FilterItem key={d}>{d} </FilterItem>)}
        {!!gender.length &&
          gender.map((g) => <FilterItem key={g}>{g} </FilterItem>)}
        {!!availibility && <FilterItem>{availibility}</FilterItem>}
      </SelectedFilterList>
    </React.Fragment>
  );
};
export default Navbar;

const Container = styled.header`
  min-width: 80%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 20px;
  translate: -50%;
  z-index: 9;
  @media screen and (max-width: 1170px) {
    max-width: 95%;
  }
`;

const NavbarWrap = styled.div`
  max-width: 90%;
  margin: auto;
`;

const Toolbar = styled.div`
  min-height: 64px;
  display: flex;
  align-items: center;
`;

const LogoBox = styled.div`
  font-weight: 300;
  font-size: 2rem;
  margin-right: auto;
  @media screen and (max-width: 830px) {
    display: none;
  }
`;

const SearchBar = styled.div`
  width: fit-content;
  height: fit-content;
  margin-right: 20px;
  position: relative;
`;

const SearchButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color: #ffffff;
  background-color: transparent;
  pointer-events: painted;
  &:focus ~ input {
    width: 300px;
    right: 50px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  }
`;

const SearchInput = styled.input`
  height: 50px;
  width: 50px;
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all 0.5s ease-in-out;
  background-color: transparent;
  color: #fff;
  padding-right: 40px;
  position: relative;
  z-index: 5;
  &::placeholder {
    color: rgba(255, 255, 255, 0.9);
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 400;
  }
  &:focus {
    width: 300px;
    right: 50px;
    border-radius: 0px;
    background-color: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    transition: all 500ms cubic-bezier(0, 0.11, 0.35, 2);
  }
  @media screen and (max-width: 700px) {
  }
`;

const FilterButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  color: #ffffff;
  background-color: transparent;
  margin-right: 20px;
  transition: 0.2s ease-in-out;
  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const TeamButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  color: #ffffff;
  background-color: transparent;
  transition: 0.2s ease-in-out;
  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const SelectedFilterList = styled.div`
  min-width: 80%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 100px;
  translate: -50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  @media screen and (max-width: 1170px) {
    max-width: 95%;
  }
  &:empty {
    display: none;
  }
`;

const FilterItem = styled.div`
  font-size: 1rem;
  margin-right: 10px;
`;
