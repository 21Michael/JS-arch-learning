# Dva:  

**DVA** представляет собой небольшой фреймворк, который построен поверх redux и 
redux-saga. Он обладает всеми возможностями библиотеки redux-saga, но позволяет 
сделать код более структурированным и повысить его читаемость.

Ключевой особенностью данного фреймворка является **модель состояния (state).**   
Она представляет собой совокупность:
  - **Namespace:** который будет определять название этого самого кусочка нашего 
    глобального store.
  - **State:** представляет собой простой объект и является состоянием, 
    которое будет в дальнейшем маппится на какой-либо компонент, соответствующее 
    initialState как в reducer из Redux;
  - **Reducer:** представляет собой объект с функциями действиями, которые будут 
    вызываться с помощью функции dispatch () при взаимодействии пользователя с 
    компонентом. В данном свойстве описывается синхронный функционал, который не
    производит side-эффектов, так как редьюсеры должны быть чистыми функциями.
  - **Effects** определяет функции генераторы, в которых и будут все наши 
    асинхронные side-эффекты (которые мы обычно пишем в redux-saga.) и уже из
    них вызываться функции reducer с помощью передачи соответствующего действия.
  - **Subscriptions:** которые могут быть использованы для наблюдения за внешними 
    событиями, типа смены роута или нажатия каких-либо клавиш на клавиатуре, временем,
    открытию websocket, изменению геолокации...
    
```js
app.model({
     // namespace-соответствует значению ключа редуктора при объединении с rootReducer
  namespace: 'products',
     // состояние, соответствующее initialState редуктора
  state: {
    list: [],
    loading: false,
  },
  subscriptions: {
      function(dispatch) {
          dispatch({type: 'products/query'});
      },     // подписка-выполнение после того, как Дом готов
      keyboardWatcher({dispatch}) {
          key('⌘+up, ctrl+up', () => {
              dispatch({type: 'add'})
          });     // подписка-выполнение после нажатия кнопки:  ctrl+up
      },
  },
     // эффект-соответствует саге и упрощает использование
  effects: {
    ['products/query']: function*() {
      yield call(delay(800));
      yield put({
        type: 'products/query/success',
        payload: ['ant-tool', 'roof'],
      });
    },
  },
     // редукторы-традиционные редукторы
  reducers: {
    ['products/query'](state) {
      return { ...state, loading: true, };
    },
    ['products/query/success'](state, { payload }) {
      return { ...state, loading: false, list: payload };
    },
  },
});
```

![link](https://smyt.ru/blog/media/articles/images/2019/01/15/srfspjx_zjgo-nvpnzdoifw.png)

**1) Usage:**  

Initialization:
```js
import dva from 'dva'
import 'babel-polyfill'
import Loading from 'dva-loading'

// 1. Initialize
const app = dva()

// 2. Add plugin
app.use(Loading(opt))

// 3. Model
app.model(require('./models/count'))

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')
```

Usage in components:
```js
const CountApp = ({count, dispatch}) => { // dispatch is props !!!!!!!!!!!!!!!!!!!!!
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div className={styles.button}>
        <button onClick={() => { dispatch({type: 'count/add'}); }}>+</button> // action !!!!!!!!!!!!!!!!!!!!!
      </div>
      <div className={styles.button}>
        <button onClick={() => { dispatch({type: 'count/addAsync'}); }}>+ async</button> // action !!!!!!!!!!!!!!!!!!!!!
      </div>
    </div>
  );
};

function mapStateToProps(state) { // same as in react-redux !!!!!!!!!!!!!!!!!
  return { count: state.count };
}
const HomePage = connect(mapStateToProps)(CountApp);
```

Вся структура не сильно изменилась, самое важное - объединить store и saga в концепцию 
модели (что-то похожее на модуль Vuex), записанную в js-файле. Добавлены подписки для 
сбора действий из других источников, таких как операции с сочетаниями клавиш.