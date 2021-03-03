import { createActions, createReducer } from 'reduxsauce';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  error: '',
};

const { Types, Creators } = createActions({
  getApiData: null,
  apiSuccess: ['data'],
  apiFailure: ['error'],
});

export const apiActions = {
  Types,
  Creators,
};
const getApiData = (state) => {
  return {
    ...state,
    isLoading: true,
    error: '',
  };
};

const apiSuccess = (state, { data }) => {
  return {
    ...state,
    data,
    isLoading: false,
    error: '',
  };
};
const apiFailure = (state, error) => {
  return {
    ...state,
    isLoading: false,
    error: error,
  };
};

export const apiReducer = createReducer(INITIAL_STATE, {
  [Types.GET_API_DATA]: getApiData,
  [Types.API_SUCCESS]: apiSuccess,
  [Types.API_FAILURE]: apiFailure,
});
