# useDispatch:  

This hook returns a reference to the dispatch function from the Redux store.

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

    Redux + useDispatch() hook:
    ```js
        import React from 'react';
        import { useDispatch, connect } from 'react-redux';
        import { incrementCount } from './store/counter/actions';
        
        export function AwesomeReduxComponent(props) {
            const { count } = props;
            const dispatch = useDispatch(); // !!!!!!!!!!!!!!!!!!!!!!
          
            return (
                <div>
                    <p>Count: {count}</p>
                    <button onClick={() => dispatch(incrementCount())}>Add +1</button> // !!!!!!!!!!!!!!!!
                </div>
            );
        }
        
        const mapStateToProps = state => ({ count: state.counter.count });
        
        export default connect(mapStateToProps)(AwesomeReduxComponent);
    ```

2) **Disadvantages:**  
      - При передаче callback-a с dispatch дочерним компонентам следует оборачивать метод в 
        useCallback, что бы дочерние компоненты не рендерились без необходимости:
        ```js
            import React, { useCallback } from 'react';
            import { useDispatch, connect } from 'react-redux';
            import { incrementCount } from './store/counter/actions';
            
            export function AwesomeReduxComponent(props) {
                const { count } = props;
                const dispatch = useDispatch(); // !!!!!!!!!!!!!!!!!!!!!!
              
                return (
                    <div>
                        <p>Count: {count}</p>
                        <button onClick={useCallback(() => dispatch(incrementCount()), [dispatch])}>Add +1</button> // !!!!!!!!!!!!!!!!
                    </div>
                );
            }
            
            const mapStateToProps = state => ({ count: state.counter.count });
            
            export default connect(mapStateToProps)(AwesomeReduxComponent);
        ```
