import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import coffee from './coffee';
import bonusCoffee from './bonusCoffee';

const store = configureStore({
  // middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth: auth,
    coffee:coffee,
    bonusCoffee:bonusCoffee,

  }
});

export default store;
export * from './auth';
export * from './bonusCoffee';
export * from './coffee';

