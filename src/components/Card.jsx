import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setSelectedMembers } from '../redux/mainSlice';

const Card = ({ record, noIcon }) => {
  const dispatch = useDispatch();
  const selectedMembers = useSelector(
    (state) => state.mainState.selectedMembers
  );
  const [icon, setIcon] = useState(!!record.available ? 'plus' : 'cross');

  const handleAddMember = () => {
    if (record.available) {
      let sameDomainArray = selectedMembers.filter(
        (element) => element.domain === record.domain
      );
      if (!sameDomainArray.length) {
        setIcon('minus');
        dispatch(setSelectedMembers([...selectedMembers, record]));
      } else if (sameDomainArray[0].id === record.id) {
        setIcon('plus');
        dispatch(
          setSelectedMembers(selectedMembers.filter((e) => e.id !== record.id))
        );
      } else {
        setIcon('cross');
      }
    }
  };

  return (
    <CardWrapper onClick={handleAddMember} availablity={!!record.available}>
      {!noIcon && (
        <AddButton>
          <Icon icon={icon} />
        </AddButton>
      )}
      <ImageArea>
        <InnerArea>
          <Avatar src={record.avatar} alt={`${record.first_name}'s Image `} />
        </InnerArea>
      </ImageArea>
      <Name>
        {record.first_name} {record.last_name}
      </Name>
      <OtherDetails>{record.email}</OtherDetails>
      <OtherDetails>
        {record.domain} | {record.gender}
      </OtherDetails>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  padding: 30px;
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  box-shadow: var(--card-shadow);
  transition: all ease-in-out 200ms;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.13);
  cursor: ${(props) => (props.availablity ? 'pointer' : 'not-allowed')};
  :hover {
    scale: 1.03;
  }
`;

const AddButton = styled.div`
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
`;

const Icon = styled.i`
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
    content: ' ';
    height: 22px;
    width: 2px;
    background-color: #fff;
    transition: 0.5s ease-in-out;
  }
  ${(props) =>
    props.icon === 'plus'
      ? `&:before {
    transform: rotate(90deg);
  }
  &:after {
    transform: rotate(0deg);
  }`
      : props.icon === 'cross'
      ? `&:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }`
      : `&:before {
    transform: rotate(270deg);
  }
  &:after {
    transform: rotate(270deg);
  }`}
`;

const ImageArea = styled.div`
  background-color: rgba(255, 255, 255, 0.13);
  height: 100px;
  width: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerArea = styled.div`
  background-color: rgba(255, 255, 255, 0.13);
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  border-radius: 50%;
`;

const Avatar = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
`;

const OtherDetails = styled.div`
  color: #d0d1d7;
  font-weight: 400;
  font-size: 1rem;
`;
