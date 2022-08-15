# Redux-thunk:  

**Redux-Thunk** is a middleware that allows us to make some actions asynchronous.

**Middleware** in Redux evaluates the action; in other words, you can say that middleware is 
just a piece of code that triggers between the request to the server.

You can use middleware to see the triggered action, the request payload, the response coming 
from the server, response status, and other middleware...

![link](https://res.cloudinary.com/practicaldev/image/fetch/s--WMHUONcg--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3psu9opx7qovkdh4dkx8.png)

1) **Creation:**  
    ```js
      import React from 'react'; 
      import ReactDOM from 'react-dom'; 
      import { createStore, applyMiddleware } from 'redux'; 
      import { Provider } from 'react-redux'; 
      import thunk from 'redux-thunk';
      import rootReducer from './reducers'; 
      import App from './App';
      const store = createStore(rootReducer, applyMiddleware(thunk)); // !!!!!!!!!!!!!!!!!!!!!!! redux-thunk
      
      ReactDOM.render(   
        <Provider store={store}>     
           <App />   
        </Provider>,   
        document.getElementById('root') 
      );
    ```

2) **Usage:**  
    ```js
      const createFetchDataAction = function(id) {
          return function(dispatch, getState) { // !!!!!!!!!!!!!!!!!!!!!!! redux-thunk
              // Запустить запрос, отправить действие FETCH_DATA_START
              dispatch({
                  type: FETCH_DATA_START, 
                  payload: id
              })
              api.fetchData(id) 
                  .then(response => {
                      // Запрос выполнен успешно, отправьте действие FETCH_DATA_SUCCESS
                      dispatch({
                          type: FETCH_DATA_SUCCESS,
                          payload: response
                      })
                  })
                  .catch(error => {
                      // Запрос не выполнен, отправьте действие FETCH_DATA_FAILED   
                      dispatch({
                          type: FETCH_DATA_FAILED,
                          payload: error
                      })
                  }) 
          }
      }
       
      //reducer
      const reducer = function(oldState, action) {
        switch(action.type) {
          case FETCH_DATA_START:   // разобраться с загрузкой и т. д.
          case FETCH_DATA_SUCCESS: // обновить магазин и т. д.
          case FETCH_DATA_FAILED:  // быстрое исключение
        }
      }
    ```
