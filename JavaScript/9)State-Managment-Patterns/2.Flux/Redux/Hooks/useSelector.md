# useSelector:  

The selector is approximately equivalent to the mapStateToProps argument to connect 
conceptually. The selector will be called with the entire Redux store state as its only
argument.

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

    Redux + useSelector() hook:
    ```js
      import React from 'react';
      import { useSelector } from 'react-redux';
      import { incrementCount } from './store/counter/actions';
      
      export const AwesomeReduxComponent = () => {
          const { incrementCount } = props;
          const count = useSelector(state => state.counter.count); // !!!!!!!!!!!!!!!!!!!!!!!!
      
          return (
              <div>
                  <p>Count: {count}</p>
                  <button onClick={incrementCount}>Add +1</button>
              </div>
          );
      };
      
      const mapDispatchToProps = { incrementCount };
      
      export default connect(null, mapDispatchToProps)(AwesomeReduxComponent);
    ```

**2) Disadvantages:**  

  - **useSelector** использует по умолчанию **строгое равенство для сравнения 
    <ins>объектов</ins> (===),** которые возвращает селектор (из-за этого в случае возврата 
    нового объекта компонент постоянно будет перерисовываться) и нужно использовать свой 
    метод для сравнения (shallowEqual).   
    Метод connect(), использует **неглубокую проверку (shallow equality)** равенства результатов 
    вызовов mapState, чтобы определить, требуется ли повторный рендеринг (by comparing the 
    individual fields);
    
    ```js
      import React from 'react';
      import { useSelector, shallowEqual } from 'react-redux';
      import { incrementCount } from './store/counter/actions';
      
      export const AwesomeReduxComponent = () => {
          const { incrementCount } = props;
          const count = useSelector(state => state.counter.count, shallowEqual); // !!!!!!!!!!!!!!!!!!!!!!!!
      
          return (
              <div>
                  <p>Count: {count}</p>
                  <button onClick={incrementCount}>Add +1</button>
              </div>
          );
      };
      
      const mapDispatchToProps = { incrementCount };
      
      export default connect(null, mapDispatchToProps)(AwesomeReduxComponent);
    ```

    Decompose logic to the custom hook:
    ```js
      import { useSelector, shallowEqual } from 'react-redux';
      
      export function useShallowEqualSelector(selector) {
        return useSelector(selector, shallowEqual); // !!!!!!!!!!!!!!!!!!!
      }
    ```

    ```js
      import React from 'react';
      import { useSelector } from 'react-redux';
      import { useShallowEqualSelector } from './useShallowEqualSelector.js';
      import { incrementCount } from './store/counter/actions';
      
      export const AwesomeReduxComponent = () => {
      const { incrementCount } = props;
      const count = useShallowEqualSelector(state => state.counter.count); // !!!!!!!!!!!!!!!!!!!!!!!!
      
          return (
              <div>
                  <p>Count: {count}</p>
                  <button onClick={incrementCount}>Add +1</button>
              </div>
          );
      };
      
      const mapDispatchToProps = { incrementCount };
      
      export default connect(null, mapDispatchToProps)(AwesomeReduxComponent);
    ```

  -  useSelector **не предотвращает повторный ререндер компонента, когда перерисовывается
      родитель,** даже если пропы не изменились. Поэтому для оптимизации стоит использовать 
      **React.memo():**
      ```js
        import React, { useMemo }  from 'react';
        import { useSelector } from 'react-redux';
        import { incrementCount } from './store/counter/actions';
        import ChildComponent from './ChildComponent.js';
        
        export const AwesomeReduxComponent = () => {
            const { incrementCount } = props;
            const count = useMemo(useSelector(state => state.counter.count), []); // !!!!!!!!!!!!!!!!!!!!!!!!
        
            return (
                <div>
                  <ChildComponent count={count} /> // !!!!!!!!!!!!!!!!!!
                  <button onClick={incrementCount}>Add +1</button>
                </div>
            );
        };
        
        const mapDispatchToProps = { incrementCount };
        
        export default connect(null, mapDispatchToProps)(AwesomeReduxComponent);
      ```
