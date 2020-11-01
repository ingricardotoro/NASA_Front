import { types } from "../types/types"

export const PrevDayAction = (selectedDate) => {

    return {
        type: types.PrevDay,
        payload: {
            selectedDate
        }

    }
}

export const NextDayAction = (selectedDate) => {
    return {
        type: types.NextDay,
        payload: {
            selectedDate
        }
    }
}

export const SelectedDayAction = (selectedDate, image, date, title, explanation, notFound) => {
    return {
        type: types.SelectedDay,
        payload: {
            selectedDate,
            image,
            date,
            title,
            explanation,
            notFound,
        }
    }
}

export const AddToFavoriteAction = (saved) => {
    return {
        type: types.AddToFavorite,
        payload: {
            saved
        }
    }
}

export const RemoveFromFavoritesAction = (saved) => {
    return {
        type: types.RemoveFromFavorite,
        payload: {
            saved
        }
    }
}