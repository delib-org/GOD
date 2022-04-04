import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

export const apiSlice = createSlice({
  name: 'api',
  initialState: {},
  reducers: {
    setPending: (state, action) => ({ ...state, [action.payload]: { status: 'pending' } }),
    setFulfilled: (state, action) => ({ ...state, [action.payload]: { status: 'fulfilled' } }),
    setRejected: (state, action) => {
      const { apiKey, error } = action.payload;
      return {
        ...state,
        [apiKey]: { status: 'failed', error },
      };
    },
  },
});

export const apiMiddleware = (store: any) => (next: any) => (action: any) => {
  const status = action.meta?.requestStatus;

  if (!_.isNil(status)) {
    const { setPending, setFulfilled, setRejected } = apiSlice.actions;

    const apiKey = action.type.replace(`/${status}`, '');

    switch (status) {
      case 'pending':
        store.dispatch(setPending(apiKey));
        break;
      case 'fulfilled':
        store.dispatch(setFulfilled(apiKey));
        break;
      case 'rejected':
        store.dispatch(setRejected({ apiKey, error: action.error }));
        break;
      default:
    }
  }
  return next(action);
};

export const apiSelector = (apiKey: string) => (state: any) => _.get(state, ['api', apiKey], {});
