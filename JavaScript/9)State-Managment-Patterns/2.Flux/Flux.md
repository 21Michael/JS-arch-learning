# Flux (oneway-directional):  

After learning a few highlights regarding the instability and complexity of the MVC architecture,
the Facebook development team made some important changes in the system and released Flux as 
an alternative to MVC architecture. The Flux architecture is based on the following components:

  - **Store / Stores:** Serves as a container for the app state & logic;
  - **Action:** Enables data passing to the dispatcher;
  - **View:** Same as the view in MVC architecture, but in the context of React
    components (React = V);
  - **Dispatcher** – Coordinates actions & updates to stores;
    
![link](https://miro.medium.com/max/875/1*WNMEPdtK9TlayHJ1wcUZPQ.png)  

 From the first sight, there is no actual benefits of using the Flux. For some cases it's true
(when MVC used in separate components with isolated store) for example inside React component for
own component's state there is no profit of using Flux.  

[![](../../../images/087fb20b-edae-40d4-ae41-8298a3af5ae4-original.png)](../../../images/087fb20b-edae-40d4-ae41-8298a3af5ae4-original.png)

But the problems came when the data from store has to be used inside different components.   
**The problems:**   
- changing the data that required inside one component effect all store and starting cascading
  effect of re-rendering all other components that used the data from the same store;
- difficult to debug;
- broke the MVC pattern (one way direction);

[![](../../../images/8fdb1917-90da-4070-b3d7-c7269417c67d-original.png)](../../../images/8fdb1917-90da-4070-b3d7-c7269417c67d-original.png)

**1) Преимущество Flux над MVC:**  
  - **The Flow:** Flux очень требователен к потоку данных в приложении. Dispatcher данных
    устанавливает строгие правила и исключения для управления потоком. В MVC нет такой вещи,
    и потоки реализуются по-разному.
  - **Однонаправленный поток в Flux:** то время как MVC двунаправленный в своем потоке, 
    во Flux все изменения проходят через одно направление, через Dispatcher данных. Store 
    не может быть изменено само по себе, и тот же самый принцип работает для других Actions.
    Изменения, которые необходимо внести, должны пройти через Dispatcher, через Actions.
  - **Store:** в то время как MVC не может моделировать отдельные объекты, Flux может 
    делать это для того, чтоб хранить любые связанные с приложением данные

**2) Пример:**

![link](https://drive.google.com/uc?id=1L1pN-U-Dq6s62lG0dWCa90pVlZGkijvM)

**Action types:**  
```js
    const ActionTypes = { 
      ADD_ITEM: "ADD_ITEM", 
      REMOVE_ITEM: "REMOVE_ITEM"
    };
    
    export default ActionTypes;
```

**Dispatcher (singleton, pub-sub event pattern):**
```js
    import {Dispatcher} from "flux";
     
    export default new Dispatcher();
```

**Actions:**
```js
    import ActionTypes from "./ActionTypes.js";
    import PhonesDispatcher from "./PhonesDispatcher.js";
     
    const Actions = {
      addItem(text) {
        PhonesDispatcher.dispatch({
          type: ActionTypes.ADD_ITEM,
          text,
        });
      },
      removeItem(text) {
        PhonesDispatcher.dispatch({
          type: ActionTypes.REMOVE_ITEM,
          text,
        });
      }
    };
     
    export default Actions;
```

**Store:**
```js
import Immutable from "immutable";
import {ReduceStore} from "flux/utils";
import Actions from "./Actions.js";
import ActionTypes from "./ActionTypes.js";
import PhonesDispatcher from "./PhonesDispatcher.js";
 
class PhonesStore extends ReduceStore {
    constructor()
    {
        super(PhonesDispatcher);
    }
    getInitialState() {
        return Immutable.List.of("Apple iPhone 12 Pro", "Google Pixel 5");
    }
 
    reduce(state, action) {
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
    }
}
export default new PhonesStore();
```

**View:**
```js
import React from "react";
 
class AppView extends React.Component {
    constructor(props) {
      super(props);
      this.state = { newItem: "" }; 
         
      this.onInputChange = this.onInputChange.bind(this);
      this.onClick = this.onClick.bind(this);
    }
    onInputChange(e) {
      this.setState({ newItem: e.target.value }); // make reactive
    }
    onClick(e) {
      if(this.state.newItem) {
        this.props.onAddItem(this.state.newItem); // flux !!!!!!!!!!!!!!!!!!!
        // Flux can't force React DOM rerender after changing state therefore we have to
        // doublicate state in eact component for making it reactive;
        this.setState({ newItem: " " }); 
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
                this.props.phones.map(function(item) { // flux !!!!!!!!!!!!!!!!!!!!!!
                  return <Phone key={item} text={item} onRemove={remove} />
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
      this.props.onRemove(this.state.text);
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

export default AppView;
```

**Container** (для соединения хранилищ, действий и представлений во Flux применяются):

```js
import AppView from "../views/AppView.js";
import {Container} from "flux/utils";
import React from "react";
import PhoneStore from "../data/PhoneStore.js";
import Actions from "../data/Actions.js";

class AppContainer extends React.Component
{
    static getStores() {
      return [PhoneStore];
    }
    static calculateState(prevState) {
      return {
        phones: PhoneStore.getState(),
        onAddItem: Actions.addItem,
        onRemoveItem: Actions.removeItem
      };
    }
    render() {
      return <AppView 
        phones={this.state.phones}
        onRemoveItem={this.state.onRemoveItem}
        onAddItem={this.state.onAddItem} 
      />;
    }
}

export default Container.create(AppContainer);
```

**3) Недостатки Flux vs Redux:**  

![link](https://i.stack.imgur.com/HbS0b.jpg)
