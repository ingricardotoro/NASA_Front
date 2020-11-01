import { createStore, combineReducers } from 'redux'
import { pictureReducer } from '../reducers/pictureReducer';

const reducers = combineReducers({
    Pictures: pictureReducer
})

export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);