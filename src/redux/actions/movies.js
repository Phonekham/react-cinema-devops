import {
  MOVIE_LIST,
  SET_ERROR,
  RESPONSE_PAGE,
  LOAD_MORE_RESULTS,
  MOVIE_TYPE,
} from "../types";
import { MOVIE_API_URL } from "../../services/movies.service";

export const getMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const response = await MOVIE_API_URL(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(MOVIE_LIST, results, dispatch);
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

const dispatchMethod = (type, payload, dispatch) => {
  dispatch({ type, payload });
};
