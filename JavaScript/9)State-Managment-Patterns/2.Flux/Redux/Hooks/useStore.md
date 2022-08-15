# useStore:  

This hook returns a reference to the same Redux store that was passed in to the <Provider>
component.

1) **Usage:**

    Redux without hooks:
    ```js
      import React from 'react';
      import { connect } from 'react-redux';
      import { incrementCount } from './store/counter/actions';
      
      export function AwesomeReduxComponent(props) {
          const { count, incrementCount } = props;
      
          return (
              <div>
                  <p>Count: {count}</p>
                  <button onClick={incrementCount}>Add +1</button>
              </div>
          );
      }
      
      const mapStateToProps = state => ({ count: state.counter.count }); // !!!!!!!!!!!!!!!!!!!!!!!!
      const mapDispatchToProps = { incrementCount };
      
      export default connect(mapStateToProps, mapDispatchToProps)(AwesomeReduxComponent);
    ```
    
    Redux + useStore() hook:
    ```js
      import React from 'react';
      import { useStore } from 'react-redux';
      import { incrementCount } from './store/counter/actions';
      
      export function AwesomeReduxComponent(props) {
          const { dispatch, getState, subscribe } = useStore();  // !!!!!!!!!!!!!!!!!!!!!!
          const count = getState().counter.count; // !!!!!!!!!!!!!!!!!!!!!!!!
       
          useEffect(() => subscribe(console.log), []); // !!!!!!!!!!!!!!!!!!!!!!!!
        
          return (
              <div>
                  <p>Count: {count}</p>
                  <button onClick={() => dispatch(incrementCount())}>Add +1</button> // !!!!!!!!!!!!!!!!
              </div>
          );
      }
      
      export default AwesomeReduxComponent;
    ```

2) **Disadvantages:**  
    - same as for useDispatch() and useSelector();
