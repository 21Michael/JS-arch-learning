# React-Redux:  

Link: https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/react-redux.html#/0

Redux itself is a standalone library that can be used with any UI layer or framework, 
including React, Angular, Vue, Ember, and vanilla JS. Although Redux and React are commonly 
used together, they are independent of each other.

If you are using Redux with any kind of UI framework, you will normally use a "UI binding"
library to tie Redux together with your UI framework, rather than directly interacting with
the store from your UI code.

**!!! React Redux is the official Redux UI binding library for React. !!!**

1) **Rewritten example from Redux section:**  

    **Action types:**
    ```js
        const ActionTypes = { 
          ADD_ITEM: "ADD_ITEM",
          REMOVE_ITEM: "REMOVE_ITEM"
        };
        
        export default ActionTypes;
    ```

    **Actions:**
    ```js
        import ActionTypes from "./ActionTypes.js";
         
        const Actions = {
          addItem(text) {
            type: ActionTypes.ADD_ITEM, 
            text
          }, 
          removeItem(text) {
            type: ActionTypes.REMOVE_ITEM,
            text
          }
        };
         
        export default Actions;
    ```

    **Reducer:**
    ```js
        import ActionTypes from "./ActionTypes.js";
     
        const initialState = ["Apple iPhone 12 Pro", "Google Pixel 5"];
     
        const reducer = (state = initialState, action) => {
            switch (action.type) {
                case ActionTypes.ADD_ITEM:
                    if (action.text) {
                      return state.push(action.text);
                    }
                    return state;
                case ActionTypes.REMOVE_ITEM:
                    let index = state.indexOf(action.text);
                    if (index > -1) {
                        return state.delete(index);
                    }
                    return state;
                default:
                    return state;
            }
        };
    
      export default reducer;
    ```

    **Combine reducers:**
    ```js
      import { combineReducers } from 'redux';
      import Reducer1 from "../reducer1.js"
      
       const rootReducer = combineReducers({
        Reducer1,
      });
  
      export default rootReducer;
    ```

    **Store:**
    ```js
      import { createStore } from 'redux';
      import rootReducer from '../rootReducer.js'
  
      const store = createStore(rootReducer);
      
      export default store;
    ```

    **View:**
    ```js
      import React from "react";
      import Actions from "./Actions.js";
      import { connect } from 'react-redux'
      
      class AppView extends React.Component {
          constructor(props) {
            super(props);
            this.state = { newItem: "" };
               
            this.onInputChange = this.onInputChange.bind(this);
            this.onClick = this.onClick.bind(this);
          }
          onInputChange(e) {
            this.setState({ newItem:e.target.value });
          }
          onClick(e) {
            if(this.state.newItem) {
              this.props.removeItem(this.state.newItem); 
            }
          }
          render() {
            let remove = this.props.onRemoveItem;
            
            return <div>
              <input type="text" value={this.state.newItem} onChange={this.onInputChange} />    
              <button onClick={this.onClick}>Добавить</button>                
                <h2>Список смартфонов</h2>
                  <div>
                    {
                      this.props.phones.map(function(item) { 
                        return <Phone key={item} text={item} />
                      })
                    }
                  </div>
            </div>;
          }
      }
      
      // -------------------------------------CHILD-----------------------------------
      class Phone extends React.Component{
          constructor(props) {
            super(props);
            this.state = { text: props.text };
            this.onClick = this.onClick.bind(this);
          }
          onClick(e) {
              this.props.removeItem(this.state.text); 
          }
          render() {
            return <div>
              <p>
                <b>{this.state.text}</b><br />
                <button onClick={this.onClick}>Удалить</button> 
              </p>
            </div>;
          }
      }
      // -------------------------------------CHILD-----------------------------------
      
      const mapStateToProps = state => ({ // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! react-redux
        phones: state.phones
      })
      
      const mapDispatchToProps = dispatch => ({ // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! react-redux
        addItem: text => dispatch(Actions.addItem(text)),
        removeItem: text => dispatch(Actions.removeItem(text)),
      })
      
      
      export default connect( // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! react-redux
        mapStateToProps,
        mapDispatchToProps
      )(AppView);
    ```

    **Add store to the App**:
    
    ```js
      import AppView from "../views/AppView.js";
      import React from "react";
      import { Provider } from 'react-redux' 
      import store from '../store.js';
      
      class AppContainer extends React.Component
      {
          render() {
            return <Provider store={store}> // !!!!!!!!!!!!!!!!! react-redux
                     <AppView />;
                   </Provider>
          }
      }
      
      export default Container.create(AppContainer);
    ```
