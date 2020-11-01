import { types } from "../types/types";

const initialState = { selectedDate: 'INICIO' }

export const pictureReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.PrevDay:

            return {
                ...state,
                selectedDate: action.payload.selectedDate
            }

        case types.NextDay:

            return {
                ...state,
                selectedDate: action.payload.selectedDate
            }

        case types.SelectedDay:

            return {
                ...state,
                selectedDate: action.payload.selectedDate,
                image: action.payload.image,
                date: action.payload.date,
                title: action.payload.title,
                explanation: action.payload.explanation,
                notFound: action.payload.notFound,
            }

        case types.AddToFavorite:

            return {
                ...state,
                setSaved: action.payload.saved
            }

        case types.RemoveFromFavorite:

            return {
                ...state,
                setSaved: action.payload.saved
            }

        default:
            return state;
    }
}