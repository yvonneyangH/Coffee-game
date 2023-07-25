import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';

import coffee from './coffee';

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth: auth,

    coffee:coffee,
  }
});

export default store;
export * from './auth';

export * from './coffee';

