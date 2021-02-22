import axios from "axios";
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
  SUBVARIATION_UPDATE_REQUEST,
  SUBVARIATION_UPDATE_SUCCESS,
  SUBVARIATION_UPDATE_FAIL,
} from "../constants/subVariationsConstants";

export const listSubVariations = () => async (dispatch) => {
  try {
    dispatch({ type: SUBVARIATION_LIST_REQUEST });

    const { data } = await axios.get(`/api/variations/sub`);
    console.log(data);
    dispatch({
      type: SUBVARIATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBVARIATION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const subVariationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUBVARIATION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/variations/sub/${id}`);

    dispatch({
      type: SUBVARIATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBVARIATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteSubVariation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBVARIATION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/variations/sub/${id}/`, config);

    dispatch({
      type: SUBVARIATION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SUBVARIATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createSubVariations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBVARIATION_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/variations/sub`, {}, config);
    dispatch({
      type: SUBVARIATION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBVARIATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSubVariation = (subVariation) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: SUBVARIATION_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/variations/sub/${subVariation._id}`,
      subVariation,
      config
    );
    dispatch({
      type: SUBVARIATION_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUBVARIATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBVARIATION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
