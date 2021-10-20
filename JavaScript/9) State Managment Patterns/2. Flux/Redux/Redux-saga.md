# Redux-saga:

**Redux Saga** - это библиотека, используемая для обработки побочных эффектов в Redux. Когда вы 
запускаете действие, что-то меняется в состоянии приложения, и вам может потребоваться сделать 
что-то, вытекающее из этого изменения состояния (side effects).

**Побочный эффект функции (side-effect)** – возможность в процессе выполнения своих вычислений: 
читать и модифицировать значения глобальных переменных, осуществлять операции ввода-вывода, 
реагировать на исключительные ситуации, вызвать их обработчиков. Если вызвать функцию с 
побочным эффектом дважды с одним и тем же набором значений входных аргументов, может случиться
так, что в качестве результата будут возвращены разные значения. Такие функции называются 
недетерминированными функциями с побочными эффектами.

**Side effects:**
  - сделать HTTP-вызов на сервер;
  - отправить событие WebSocket;
  - получить данные из GraphQL сервер;
  - сохранить что-нибудь в кеш или локальное хранилище браузера;
  - ...

![link](https://miro.medium.com/max/1838/1*-e3KouNos-rfx4GSKGzxnQ.png)

When using redux-saga, you typically end up with two sagas for one particular action. The 
first saga is quite primitive and is only listening whether an action with a specific type,
e.g. FETCH_DATA is dispatched and extracts the action’s payload if needed. If the **watcher 
saga** detects the action it is looking for, it creates a **worker saga.**

![link](https://drive.google.com/uc?id=1SruAXYF6yUkH_sZlGLKcBFEgvHKy84C6)

**The watcher saga** can either wait for the result of the worker saga and then resume 
listening for new actions. It could also perform a fire and forget approach. That is, 
it is creating (forking) a worker saga and immediately resumes listening for new actions. 
Both approaches make sense depending on what you want to do.

Once our **worker saga** gets the result back (either success or failure), it is dispatching 
an action with the server’s response (F). This action then flows into the reducer where the
next state is calculated.

![link](https://productioncoder.com/wp-content/uploads/2018/10/redux-saga-fork-worker-saga-1024x561.jpg)


**1) Usage:**

**1.1 Initialization:**
```js
  import { createStore, applyMiddleware } from 'redux';
  import createSagaMiddleware from 'redux-saga';
  import { rootSagas } from './sagas';
  
  const sagaMiddleware = createSagaMiddleware(); // !!!!!!!!!!!!!!!!!!!!!

  const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware) // !!!!!!!!!!!!!!!!!!!!!
  );

  sagaMiddleware.run(rootSagas); // !!!!!!!!!!!!!!!!!!!!!

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
```
**1.2 Effects:**

В redux-saga саги реализованы с использованием функций генераторов. Чтобы выразить логику 
сагов, мы используя ключевоео слово yield и передаем простые объекты JavaScript из генератора.
Мы называем их объекты Effects. Effect это простой объект, содержащие инструкции и middleware
redux-saga будет заботиться о выполнении этих поручений и результат их выполнения для 
генератора. Таким образом, при тестировании Генератора, все, что нам нужно сделать, это 
проверить, что он отдает ожидаемую инструкцию, просто вызывая deepEqual на данном объекте.

  - **take():** ждет вызова определенного action при его вызове создает worker и ждет пока он
    выполниться и вернет результат;
  - **call(fn, ...args):** создает простой объект, описывающий вызов функции. Middleware в 
    Redux-saga заботится о выполнении вызова функции и возобновлении работы генератора с 
    полученым ответом.
```js
{
  call: {
    fn: Api.fetch,
    args: []
  }
}
```
  - **all():** analog to Promise.all(); all() won’t be resolved until all calls return.
```js
    import { all, call } from 'redux-saga/effects'
    
    const [todos, user]  = yield all([
    call(fetch, '/api/todos'),
    call(fetch, '/api/user')
    ])
```
  - **race():** analog to Promise.race(); Not waiting for all of the helpers calls to 
    return. It just waits for one to return, and it’s done.
  - **put():** Dispatches an action to the Redux store. Instead of passing in the Redux 
    store or the dispatch action to the saga.
    
Example:
```js
  import { take, call, put } from 'redux-saga/effects';
  import Api from './path/to/api';

  const API = {
    POST: (path, payload) => axios.post(path, payload).then((res) => res),
    GET: (path) => axios.get(path).then((res) => res),
    ...
  };
  
  function* mySaga(payload) {
    // Block: метод take состоит в ожидании действия ADD_VALUE
    yield take(ADD_VALUE);
    // блокировка: метод put будет инициировать действие синхронно
    yield put(SHOW_LOADING, { isLoading: true });
    
    try {
      // Блокировка: будет ждать окончания FetchFn и ждать возвращенного обещания
      const data = yield call(API.post, 'https://my.server.com/getdata', payload);
      // блокировка: действие будет инициировано синхронно (используйте только что возвращенный Promise.then)
      yield put(LOADING_SUCCESS, data);
    } catch (error) {
      // блокировка: действие будет инициировано синхронно (используйте только что возвращенный Promise.then)
      yield put(LOADING_FAILED, error);
    }
  }
```

**1.3 Methods helpers:**
  - **takeEvery():** helper function is very similar to redux-thunk in its behaviour and methodology.
    It allows multiple instances of a defined action (such as fetchSomeThing) to be started 
    concurrently/simultaniously. You can start a new fetchSomeThing task while one or more
    previous instances of fetchSomeThing have not yet been completed/terminated, therefore 
    are still pending. <ins>**Keep in mind that there is no guarantee that the tasks will 
    terminate/complete in the same order they were started.**</ins>
    
  - **takeLatest():**  helper function in contrast only <ins>**gets the response of the latest 
    request that was fired**</ins> and can be seen as a wrapper for yield take of a pattern or 
    channel and an additional if-statement checking if a lastTask is present (a previous 
    task that is still pending), which will then be terminated via a yield cancel and a 
    subsequent yield fork that will spawn the current task/action.
    
Example:
```js
  import { take, call, put, takeEvery } from 'redux-saga/effects';
  import Api from './path/to/api';

  const API = {
    POST: (path, payload) => axios.post(path, payload).then((res) => res),
    GET: (path) => axios.get(path).then((res) => res),
    ...
  };
  
  function* sagaWorkerAddValue(payload) {
    // блокировка: метод put будет инициировать действие синхронно
    yield put(SHOW_LOADING, { isLoading: true });
    
    try {
      // Блокировка: будет ждать окончания FetchFn и ждать возвращенного обещания
      const data = yield call(API.post, 'https://my.server.com/getdata', payload);
      // блокировка: действие будет инициировано синхронно (используйте только что возвращенный Promise.then)
      yield put(LOADING_SUCCESS, data);
    } catch (error) {
      // блокировка: действие будет инициировано синхронно (используйте только что возвращенный Promise.then)
      yield put(LOADING_FAILED, error);
    }
  }
  
  function* sagaWatcherAddValue() {
     // Block: метод take состоит в ожидании действия ADD_VALUE
     yield takeEvery(ADD_VALUE, sagaWorkerAddValue);
  }
```

**2) Redux-saga advantages:**  
  - Тестируемость: очень легко проверить саги, так как call() возвращает чистый объект.
  - множеством полезных вспомогательных функций;
  - позволяет создавать чистые функции вместо reducer;
  - стиля кодирования и читабельность;

**3) Redux-thunk vs Redux-saga:**  

**Избыточного-thunk:**  

![link](https://russianblogs.com/images/390/36d732b0981549d3c4995ae38fab89f6.JPEG)

**Тот-же код на redux-saga:**

![link](https://russianblogs.com/images/237/db54c49f2161f2d9148b97525f0d8345.JPEG)

![link](https://miro.medium.com/max/1200/1*Xiz76SMFZVIObXrGfYBPlw.png)