# Redux-toolkit:  

Link: https://reactdev.ru/libs/redux-toolkit/

**Redux Toolkit** - это пакет, облегчающий работу с Redux. Он был разработан для решения
трех главных проблем:

  - Слишком сложная настройка хранилища (store);
  - Для того, чтобы заставить Redux делать что-то полезное, приходится использовать 
    дополнительные пакеты;
  - Слишком много шаблонного кода (boilerplate);

Redux Toolkit предоставляет инструменты для настройки хранилища и выполнения наиболее
распространенных операций, а также содержит полезные утилиты, позволяющие упростить код.

**1) Methods:**  

  1.1) <ins>**configureStore():**</ins> обертка для createStore(), упрощающая настройку хранилища с 
    настройками по умолчанию. Позволяет автоматически комбинировать отдельные частичные 
    редукторы (slice reducers), добавлять промежуточные слои или посредников (middlewares),
    по умолчанию включает redux-thunk (преобразователя), позволяет использовать расширение 
    Redux DevTools (инструменты разработчика Redux);

**Метод configureStore включает:**
  - **reducer** — набор пользовательских редьюсеров;
  - **middleware** — опциональный параметр, задающий массив мидлваров, предназначенных для
    подключения к хранилищу;
  - **devTools** — параметр логического типа, позволяющий включить установленное в браузер
    расширение Redux DevTools (значение по умолчанию — true);
  - **preloadedState** — опциональный параметр, задающий начальное состояние хранилища;
  - **enhancers** — опциональный параметр, задающий набор усилителей;

Функция getDefaultMiddleware возвращает массив с включенными по умолчанию в библиотеку
Redux Toolkit мидлварами:
  - **immutableStateInvariant** (обнаружения мутаций данных);
  - **serializableStateInvariant** (я проверки дерева состояний на предмет наличия
    несериализуемых значений, таких как функции, Promise, Symbol и другие значения,
    не являющиеся простыми JS-данными);
  - **thunk**;

```js
  import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
  import rootReducer from './reducers';
  
  const defaultMiddleware = getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  });
  
  const store = configureStore({
    reducer: rootReducer, 
    middleware: [...defaultMiddleware],
    preloadedState,
    enhancers: [],
  });
  
  export default store;
```
  1.2) <ins>**createReducer():**</ins> позволяет использовать таблицу поиска (lookup table) операций для 
    редукторов случая (case reducers) вместо инструкций switch. В данном API используется 
    библиотека immer, позволяющая напрямую изменять иммутабельный код, например, 
    так: `state.todos[3].completed = true`;

  В качестве входных параметров функция createReducer принимает следующие аргументы:
  - начальное состояние хранилища;
  - объект, устанавливающий соответствие между типами действий и редьюсерами, каждый из 
    которых обрабатывает какой-то определенный тип;
    
**Before (Redux):**
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

**After (Redux-toolkit):**
```js
    const initialState = ["Apple iPhone 12 Pro", "Google Pixel 5"];
 
    const reducer = createReducer(initialState, {
        addItem: (state, action) => {
          state.push(action.text);
        },
        removeItem: (state, action) => {
          let index = state.indexOf(action.text);
          if (index > -1) {
            state.delete(index);
          };
        },
    });

  export default reducer;
```

  1.3) <ins>**createAction():**</ins> генерирует создателя операции (action creator) для 
  переданного типа операции. Функция имеет переопределенный метод toString(), что позволяет 
  использовать ее вместо константы типа;   

  **Before (Redux):**  
  Функция createAction объединяет в одно два объявления:
  - объявляется константа, определяющая тип действия;
```js
    const ActionTypes = { 
      ADD_ITEM: "ADD_ITEM",
      REMOVE_ITEM: "REMOVE_ITEM"
    };
    
    export default ActionTypes;
```

  - функция создателя действия этого типа;
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
  Может быть вызван либо без аргументов, либо с некоторым аргументом (payload), значение 
  которого будет помещено в поле payload, созданного действия.

**After (Redux-toolkit):**
```js
export const addItem = createAction('ADD_ITEM');
export const removeItem = createAction('REMOVE_ITEM');

// Usage:
dispatch(addItem()); // без аргументов
dispatch(removeItem({ text })); // c payload
```

  1.4) <ins>**createSlice():**</ins> автоматически генерирует типы и создателей операции на основе
  переданного названия редуктора. 
  В качестве входных параметров функция createSlice принимает объект со следующими полями:
  - **name** — пространство имен создаваемых действий (${name}/${action.type});
  - **initialState** — начальное состояние редьюсера;
  - **reducers** — объект с обработчиками. Каждый обработчик принимает функцию с аргументами state
    и action, action содержит в себе данные в свойстве payload и имя события в свойстве name. Кроме 
    того, имеется возможность предварительного изменения данных, полученных из события, перед их 
    попаданием в редьюсер (например, добавить id к элементам коллекции). Для этого вместо функции 
    необходимо передать объект с полями reducer и prepare, где reducer — это функция-обработчик 
    действия, а prepare — функция-обработчик полезной нагрузки, возвращающая обновленный payload;
  - **extraReducers** — объект, содержащий редьюсеры другого среза. Данный параметр может 
    потребоваться в случае необходимости обновления объекта, относящегося к другому срезу. 
    The extraReducers allows you to respond to an action in your slice reducer but does not 
    create an action creator function. Actions can be react by:
     - **Builder callback notation:**
    ```js
    createSlice({
      name: 'counter',
      initialState: 0,
      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(incrementBy, (state, action) => {
            // action is inferred correctly here if using TS
          })
          // You can chain calls, or have separate `builder.addCase()` lines each time
          .addCase(decrement, (state, action) => {})
          // You can match a range of action types
          .addMatcher(
            isRejectedAction,
            // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
            (state, action) => {}
          )
          // and provide a default case if no other handlers matched
          .addDefaultCase((state, action) => {})
      },
    })
    ```

    - **Map object notation:**
    ```js
    const incrementBy = createAction('incrementBy')
    
    createSlice({
      name: 'counter',
      initialState: 0,
      reducers: {},
      extraReducers: {
        [incrementBy]: (state, action) => {
          return state + action.payload
        },
        'some/other/action': (state, action) => {},
      },
    })
    ```
    
**Slice example:**
```js
const itemsSlice = createSlice({
  name: 'items',
  initialState: ["Apple iPhone 12 Pro", "Google Pixel 5"],
  reducers: {
    addItem:(state, action) => { state.push(action.text); },
    removeItem:(state, action) => {
      let index = state.indexOf(action.text);
      if (index > -1) {
        state.delete(index);
      };
    },
  },
});
```

Результатом работы функции является объект, называемый slice, со следующими полями:
  - **name** — имя slice,
  - **reducer** — редьюсер,
  - **actions** — набор действий.
```js
{ name, reducer, actions, caseReducers }
```

  1.5) <ins>**createAsyncThunk():**</ins> принимает тип операции и функцию, возвращающую промис, и 
  генерирует thunk, отправляющий типы операции pending/fulfilled/rejected на основе промиса;
```js
    import {
      createAsyncThunk,
      createSlice,
    } from '@redux/toolkit';
    import { userAPI } from './userAPI';
    
    // Asynch action
    const fetchUserById = createAsyncThunk(
      'user/fetchByIdStatus',
      async (userId, thunkAPI) => {
        const response = await userAPI.fetchById(userId);
        return response.data;
      }
    );
    
    // Slice
    const usersSlice = createSlice({
      name: 'users',
      initialState: { entries: [], loading: false, error: false },
      reducers: { ... },
      extraReducers: {
          [fetchUserById.pending]: (state, action) => {
              state.loading = true;
          },
          [fetchUserById.fullfilled]: (state, action) => {
              state.entries.push(action.payload);
              state.loading = false;
          },
          [fetchUserById.rejected]: (state, action) => {
              state.error = true;
              state.loading = false;
          },
      },
    });
    
    // Usage in components:
    dispatch(fetchUserById(123));
```

  1.6) <ins>**createEntityAdapter():**</ins> генерирует набор переиспользуемых редукторов и селекторов 
  для управления нормализованными данными в хранилище;

  Наподобие **нормализации** данных в БД, на клиенте тоже может быть применена нормализация 
  для преобразования сложной вложенности или удаления избыточных данных.

**Before (Нормализация полученных данных):**  
  -  **handy (by yourself):**
```js
extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action) => {
        // преобразуем (reduce) коллекцию по свойству `id` в форму { 1: { ...user }}
        const byId = action.payload.users.reduce(
          (byId, user) => {
            byId[user.id] = user;
            return byId;
          },
          {}
        );
        state.entities = byId;
        state.ids = Object.keys(byId);
      }
    );
  }
```

  - **Normalizr API:**  
    Normalizr is a small, but powerful utility for taking JSON with a schema definition and 
    returning nested entities with their IDs, gathered in dictionaries.
```js
import { normalize, schema } from 'normalizr';

const userEntity = new schema.Entity('users');

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async () => {
    const response = await userAPI.fetchAll();
    // Нормализация данных до их передачи в редуктор
    const normalized = normalize(response.data, [
      userEntity,
    ]);
    return normalized.entities;
  }
);
```

**After (createEntityAdapter):**
```js
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import userAPI from './userAPI';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async () => {
    const response = await userAPI.fetchAll();
    // В данном случае `response.data` будет выглядеть так:
    // [{id: 1, first_name: 'Example', last_name: 'User'}]
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateOne',
  async (arg) => {
    const response = await userAPI.updateUser(arg);
    // В данном случае `response.data` будет выглядеть так:
    // { id: 1, first_name: 'Example', last_name: 'UpdatedLastName'}
    return response.data;
  }
);

export const usersAdapter = createEntityAdapter();

// По умолчанию `createEntityAdapter()` возвращает `{ ids: [], entities: {} }`
// Для отслеживания 'loading' или других ключей, их необходимо инициализировать:
// `getInitialState({ loading: false, activeRequestId: null })`
const initialState = usersAdapter.getInitialState();

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeUser: usersAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      usersAdapter.upsertMany
    );
    builder.addCase(
      updateUser.fulfilled,
      (state, { payload }) => {
        const { id, ...changes } = payload;
        usersAdapter.updateOne(state, { id, changes });
      }
    );
  },
});
```

  1.7) <ins>**Утилита createSelector()**</ins> из библиотеки Reselect;

##**Scheme:**
![link](https://drive.google.com/uc?id=1DIaZL_QA84cGKgKtKBkE4mJGooh4B8Cw)
