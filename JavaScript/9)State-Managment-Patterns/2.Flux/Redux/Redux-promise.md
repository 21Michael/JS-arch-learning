# Redux-promise:  

**The redux-promise** is an npm package that acts as a middleware for Redux and returns the 
object if it gets resolved. But it won’t return anything if rejected.

**1) Creation:**
```js
import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { createStore, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux';
import promiseMiddleware from "redux-promise";
import rootReducer from './reducers'; 
import App from './App';

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware)); // !!!!!!!!!!!!!!!!!!!!!!! redux-promise

ReactDOM.render(   
    <Provider store={store}>     
       <App />   
    </Provider>,   
    document.getElementById('root') 
);
```

**2) Usage:**  

You will receive a payload that includes two arguments after applying the redux-promise:
  - Payload status as success to true if the promise gets resolved.
  - Payload status as success to false if the promise gets rejected.

```js

const createFetchDataAction = function(id) {
  return {
    type: FETCH_DATA,
    payload: api.fetchData (id) // напрямую использовать обещание в качестве полезной нагрузки !!!!!!!!!!!!!!!!!! redux-promise
  }
}

//reducer
const reducer = function(oldState, action) {
  switch (action.type) {
    case FETCH_DATA:
      if (action.status === 'success') { // !!!!!!!!!!!!!!!!!! redux-promise
        // Обновление магазина и другая обработка
      } else { // !!!!!!!!!!!!!!!!!! redux-promise
        // быстрое исключение
      }
  }
};
```