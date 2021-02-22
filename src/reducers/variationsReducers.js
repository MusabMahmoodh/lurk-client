// For functions
import {
  VARIATION_LIST_REQUEST,
  VARIATION_LIST_SUCCESS,
  VARIATION_LIST_FAIL,
  VARIATION_DETAILS_REQUEST,
  VARIATION_DETAILS_SUCCESS,
  VARIATION_DETAILS_FAIL,
  VARIATION_DELETE_REQUEST,
  VARIATION_DELETE_SUCCESS,
  VARIATION_DELETE_FAIL,
  VARIATION_CREATE_REQUEST,
  VARIATION_CREATE_SUCCESS,
  VARIATION_CREATE_FAIL,
  VARIATION_CREATE_RESET,
  VARIATION_UPDATE_REQUEST,
  VARIATION_UPDATE_SUCCESS,
  VARIATION_UPDATE_FAIL,
  VARIATION_UPDATE_RESET,
} from "../constants/variationsConst";
export const variationListReducer = (state = { variations: [] }, action) => {
  switch (action.type) {
    case VARIATION_LIST_REQUEST:
      return { loading: true, variations: [] };

    case VARIATION_LIST_SUCCESS:
      return {
        loading: false,
        variations: action.payload,
      };

    case VARIATION_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const variationsDetailsReducer = (state = { variation: {} }, action) => {
  switch (action.type) {
    case VARIATION_DETAILS_REQUEST:
      return { loading: true, ...state };

    case VARIATION_DETAILS_SUCCESS:
      return { loading: false, variation: action.payload };

    case VARIATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const variationsDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIATION_DELETE_REQUEST:
      return { loading: true };
    case VARIATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case VARIATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const variationsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VARIATION_CREATE_REQUEST:
      return { loading: true };
    case VARIATION_CREATE_SUCCESS:
      return { loading: false, success: true, variation: action.payload };
    case VARIATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case VARIATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const variationsUpdateReducer = (state = { variation: {} }, action) => {
  switch (action.type) {
    case VARIATION_UPDATE_REQUEST:
      return { loading: true };
    case VARIATION_UPDATE_SUCCESS:
      return { loading: false, success: true, variation: action.payload };
    case VARIATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case VARIATION_UPDATE_RESET:
      return { variation: {} };
    default:
      return state;
  }
};
