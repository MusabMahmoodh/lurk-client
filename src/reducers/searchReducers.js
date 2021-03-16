// For functions
import {
  SEARCH_DETAILS_REQUEST,
  SEARCH_DETAILS_SUCCESS,
  SEARCH_DETAILS_FAIL,
  SEARCH_DELETE_REQUEST,
  SEARCH_DELETE_SUCCESS,
  SEARCH_DELETE_FAIL,
  SEARCH_CREATE_REQUEST,
  SEARCH_CREATE_SUCCESS,
  SEARCH_CREATE_FAIL,
  SEARCH_CREATE_RESET,
  SEARCH_UPDATE_REQUEST,
  SEARCH_UPDATE_SUCCESS,
  SEARCH_UPDATE_FAIL,
  SEARCH_UPDATE_RESET,
} from "../constants/categoryConstants";

export const searchDetailsReducer = (
  state = { category: {}, variation: {}, subVariation: {} },
  action
) => {
  switch (action.type) {
    case SEARCH_DETAILS_REQUEST:
      return { loading: true, ...state };

    case SEARCH_DETAILS_SUCCESS:
      return { loading: false, SEARCH: action.payload };

    case SEARCH_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const searchDeleteReducer = (
  state = { category: {}, variation: {}, subVariation: {} },
  action
) => {
  switch (action.type) {
    case SEARCH_DELETE_REQUEST:
      return { loading: true };
    case SEARCH_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SEARCH_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchCreateReducer = (
  state = { category: {}, variation: {}, subVariation: {} },
  action
) => {
  switch (action.type) {
    case SEARCH_CREATE_REQUEST:
      return { loading: true };
    case SEARCH_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case SEARCH_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SEARCH_CREATE_RESET:
      return { category: {}, variation: {}, subVariation: {} };
    default:
      return state;
  }
};

export const searchUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case SEARCH_UPDATE_REQUEST:
      return { loading: true };
    case SEARCH_UPDATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case SEARCH_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SEARCH_UPDATE_RESET:
      return { category: {} };
    default:
      return state;
  }
};
