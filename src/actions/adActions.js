import axios from "axios";
import {
  AD_LIST_REQUEST,
  AD_LIST_SUCCESS,
  AD_LIST_FAIL,
  AD_DETAILS_REQUEST,
  AD_DETAILS_SUCCESS,
  AD_DETAILS_FAIL,
  AD_DELETE_REQUEST,
  AD_DELETE_SUCCESS,
  AD_DELETE_FAIL,
  AD_CREATE_REQUEST,
  AD_CREATE_SUCCESS,
  AD_CREATE_FAIL,
  AD_UPDATE_REQUEST,
  AD_UPDATE_SUCCESS,
  AD_UPDATE_FAIL,
} from "../constants/adConstants";
import { SERVER_URL } from "../constants/serverAPI";
export const listAds = () => async (dispatch) => {
  try {
    dispatch({ type: AD_LIST_REQUEST });

    const { data } = await axios.get(`${SERVER_URL}/api/promotions`);
    // console.log(data);
    dispatch({
      type: AD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AD_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const AdDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: AD_DETAILS_REQUEST });

    const { data } = await axios.get(`${SERVER_URL}/api/promotions/${id}`);

    dispatch({
      type: AD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteAd = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AD_DELETE_REQUEST,
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
    const { data } = await axios.delete(
      `${SERVER_URL}/api/promotions/${id}/`,
      config
    );

    dispatch({
      type: AD_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: AD_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createAd = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AD_CREATE_REQUEST,
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

    const { data } = await axios.post(
      `${SERVER_URL}/api/promotions`,
      {},
      config
    );
    dispatch({
      type: AD_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AD_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateAd = (ad) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AD_UPDATE_REQUEST,
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
      `${SERVER_URL}/api/promotions/${ad._id}`,
      ad,
      config
    );
    dispatch({
      type: AD_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: AD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AD_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
