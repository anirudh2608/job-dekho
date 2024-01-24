import { createStore, compose, applyMiddleware } from "redux"

import { logger } from "redux-logger"

import createSagaMiddleware from "redux-saga"

import { rootReducer } from "./root-reducer"
import { rootSaga } from "./saga-store"

const sagaMiddleware = createSagaMiddleware()

const middleWare = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware,
  ].filter(Boolean);

const composeEnhancer = compose(applyMiddleware(...middleWare))

export const store = createStore(rootReducer, undefined, composeEnhancer)

sagaMiddleware.run(rootSaga)