import { createStore } from 'redux';
import rootReducer from '@/app/(tabs)/redux/reducer';

const store = createStore(rootReducer);

export default store;
