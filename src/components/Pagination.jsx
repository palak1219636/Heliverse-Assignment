import styled from 'styled-components';
import { usePagination } from '../hooks/usePagination';
import { useSelector } from 'react-redux';

const Pagination = ({ onPageChange }) => {
  const currentPage = useSelector((state) => state.mainState.currentPage);

  const paginationRange = usePagination(currentPage);

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <PaginationWrapper>
      {paginationRange.map((pageNumber, index) => {
        return pageNumber === '...' ? (
          <DotsWrapper key={index}>
            <Dots />
          </DotsWrapper>
        ) : (
          <Numericals
            onClick={() => onPageChange(pageNumber)}
            key={index}
            active={currentPage === pageNumber}
          >
            {pageNumber}
          </Numericals>
        );
      })}
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.footer`
  max-width: max-content;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin: 20px auto;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  font-size: 1.2rem;

  @media screen and (max-width: 1170px) {
    max-width: 95%;
  }
`;

const ArrowIcon = styled.i`
  position: relative;
  margin: ${(props) =>
    props.icon === 'left' ? '0 10px 0 20px' : '0 20px 0 10px'};
  cursor: pointer;
  &:hover {
    &::before,
    &::after {
      animation: ${(props) =>
          props.icon === 'left' ? 'arrow-move-left' : 'arrow-move-right'}
        2s infinite;
    }
    &::after {
      animation-delay: -0.5s;
    }
  }
  &:before,
  &::after {
    content: '';
    display: block;
    width: 0.7rem;
    height: 0.7rem;
    rotate: 135deg;
    ${(props) =>
      props.icon === 'left'
        ? `
    border-bottom: 2px solid white;
    border-right: 2px solid white;`
        : `
    border-top: 2px solid white;
    border-left: 2px solid white;`}
  }
  &::after {
    position: absolute;
    top: 0;
  }

  @keyframes arrow-move-left {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      translate: -20px;
    }
  }
  @keyframes arrow-move-right {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      translate: 20px;
    }
  }
`;

const DotsWrapper = styled.span`
  width: 32px;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
  &:hover {
    & > i:before {
      right: -15px;
    }
    & > i:after {
      left: -15px;
    }
  }
`;

const Dots = styled.i`
  position: relative;
  &,
  &::before,
  &::after {
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #fff;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
  }
  &:before {
    right: 15px;
    transition: right 0.3s ease-out;
  }
  &:after {
    left: 15px;
    transition: left 0.3s ease-out;
  }
`;

const Numericals = styled.span`
  margin: 0 1rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  width: 2rem;
  text-align: center;
  &:hover {
    font-size: 2rem;
  }
  ${(props) => (props.active ? `font-size: 2rem` : ``)}
`;
