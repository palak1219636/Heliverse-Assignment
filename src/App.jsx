import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./components/Pagination";
import Card from "./components/Card";
import { mock_data } from "./hooks/data";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import { setCurrentPage, setData } from "./redux/mainSlice";

function App() {
  const data = useSelector((state) => state.mainState.data);
  const currentPage = useSelector((state) => state.mainState.currentPage);
  const dispatch = useDispatch();
  const currentRecords = data.slice(currentPage * 20 - 20, currentPage * 20);

  useEffect(() => {
    dispatch(setData(mock_data));
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <CardWrapper>
        {currentRecords.map((record) => (
          <Card record={record} key={record.id} />
        ))}
      </CardWrapper>
      <Pagination onPageChange={(page) => dispatch(setCurrentPage(page))} />
    </React.Fragment>
  );
}

export default App;

const CardWrapper = styled.div`
  margin: auto;
  margin-top: 150px;
  max-width: 95%;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 80%;
  }
  @media screen and (min-width: 1170px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1500px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
