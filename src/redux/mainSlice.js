import { createSlice } from '@reduxjs/toolkit';
import { mock_data } from '../hooks/data';

const initialState = {
  data: [],
  currentPage: 1,
  dataLength: 0,
  selectedFilters: { domain: [], gender: [], availibility: null },
  selectedMembers: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.dataLength = action.payload.length;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedFilters: (state, { payload }) => {
      state.selectedFilters = payload;
      let { domain, gender, availibility } = payload;
      const avai =
        availibility === 'Available'
          ? true
          : availibility === 'Unavailable'
          ? false
          : null;
      if (!!domain.length) {
        if (!!gender.length) {
          if (!!availibility) {
            state.data = mock_data.filter(
              (element) =>
                domain.includes(element.domain) &&
                gender.includes(element.gender) &&
                element.available === avai
            );
          } else {
            state.data = mock_data.filter(
              (element) =>
                domain.includes(element.domain) &&
                gender.includes(element.gender)
            );
          }
        } else {
          if (!!availibility) {
            state.data = mock_data.filter(
              (element) =>
                domain.includes(element.domain) && element.available === avai
            );
          } else {
            state.data = mock_data.filter((element) =>
              domain.includes(element.domain)
            );
          }
        }
      } else {
        if (!!gender.length) {
          if (!!availibility) {
            state.data = mock_data.filter(
              (element) =>
                gender.includes(element.gender) && element.available === avai
            );
          } else {
            state.data = mock_data.filter((element) =>
              gender.includes(element.gender)
            );
          }
        } else {
          if (!!availibility) {
            state.data = mock_data.filter(
              (element) => element.available === avai
            );
          } else state.data = mock_data;
        }
      }
    },
    setSelectedMembers: (state, action) => {
      state.selectedMembers = action.payload;
    },
    resetData: (state) => {
      state.docs = mock_data;
      state.dataLength = mock_data.length;
    },
  },
});

export const {
  setData,
  setCurrentPage,
  setSelectedFilters,
  setSelectedMembers,
  resetData,
} = mainSlice.actions;

export default mainSlice.reducer;
