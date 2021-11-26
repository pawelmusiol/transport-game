import CombinedReducers from './reducers'
import { createStore } from 'redux'
// eslint-disable no-underscore-dangle 
export default createStore(
    CombinedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
// eslint-enable