// For functions
import {
  SUBVARIATION_LIST_REQUEST,
  SUBVARIATION_LIST_SUCCESS,
  SUBVARIATION_LIST_FAIL,
  SUBVARIATION_DETAILS_REQUEST,
  SUBVARIATION_DETAILS_SUCCESS,
  SUBVARIATION_DETAILS_FAIL,
  SUBVARIATION_DELETE_REQUEST,
  SUBVARIATION_DELETE_SUCCESS,
  SUBVARIATION_DELETE_FAIL,
  SUBVARIATION_CREATE_REQUEST,
  SUBVARIATION_CREATE_SUCCESS,
  SUBVARIATION_CREATE_FAIL,
  SUBVARIATION_CREATE_RESET,
  SUBVARIATION_UPDATE_REQUEST,
  SUBVARIATION_UPDATE_SUCCESS,
  SUBVARIATION_UPDATE_FAIL,
  SUBVARIATION_UPDATE_RESET,
} from "../constants/subVariationsConstants";
export const SubVariationListReducer = (
  state = { subVariations: [] },
  action
) => {
  switch (action.type) {
    case SUBVARIATION_LIST_REQUEST:
      return { loading: true, subVariations: [] };

    case SUBVARIATION_LIST_SUCCESS:
      return {
        loading: false,
        subVariations: action.payload,
      };

    case SUBVARIATION_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const SubVariationsDetailsReducer = (
  state = { subVariation: {} },
  action
) => {
  switch (action.type) {
    case SUBVARIATION_DETAILS_REQUEST:
      return { loading: true, ...state };

    case SUBVARIATION_DETAILS_SUCCESS:
      return { loading: false, subVariation: action.payload };

    case SUBVARIATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const SubVariationsDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBVARIATION_DELETE_REQUEST:
      return { loading: true };
    case SUBVARIATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SUBVARIATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const SubVariationsCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBVARIATION_CREATE_REQUEST:
      return { loading: true };
    case SUBVARIATION_CREATE_SUCCESS:
      return { loading: false, success: true, subVariation: action.payload };
    case SUBVARIATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SUBVARIATION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const SubVariationsUpdateReducer = (
  state = { subVariation: {} },
  action
) => {
  switch (action.type) {
    case SUBVARIATION_UPDATE_REQUEST:
      return { loading: true };
    case SUBVARIATION_UPDATE_SUCCESS:
      return { loading: false, success: true, subVariation: action.payload };
    case SUBVARIATION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SUBVARIATION_UPDATE_RESET:
      return { subVariations: {} };
    default:
      return state;
  }
};
