import axios from "axios";
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
  VARIATION_UPDATE_REQUEST,
  VARIATION_UPDATE_SUCCESS,
  VARIATION_UPDATE_FAIL,
} from "../constants/variationsConst";

export const listVariations = () => async (dispatch) => {
  try {
    dispatch({ type: VARIATION_LIST_REQUEST });

    const { data } = await axios.get(`/api/variations/`);
    // console.log(data);
    dispatch({
      type: VARIATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VARIATION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const variationDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VARIATION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/variations/${id}`);

    dispatch({
      type: VARIATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VARIATION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteVariation = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VARIATION_DELETE_REQUEST,
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

    const { data } = await axios.delete(`/api/variations/${id}/`, config);

    dispatch({
      type: VARIATION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: VARIATION_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createVariations = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VARIATION_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/variations/`, {}, config);
    dispatch({
      type: VARIATION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VARIATION_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateVariation = (variation) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VARIATION_UPDATE_REQUEST,
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
      `/api/variations/${variation._id}`,
      variation,
      config
    );
    dispatch({
      type: VARIATION_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: VARIATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VARIATION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
