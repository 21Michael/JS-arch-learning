/*
Reactivity - is the ability of a web framework to update your view whenever the application state has changed.
 */

//==========================1)JS==========================//
const root = document.getElementById('app');
root.innerHTML = `
  <span>0</span>
  <button>+</button>
`;

const decrementBtn = root.querySelector('button');
const span = root.querySelector('span');

let count = 0;
decrementBtn.addEventListener('click', () => {
  count--;
  span.innerText = count; // in reaction to event (click) update the span
});

//==========================2)React==========================//

// 1)React classes
class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { counter: '' }; // variable isn't reactive, we can change it only by special method (setState);
  }

  handleClick(evt) {
    this.setState((state, props) => ({ counter: state.counter + 1 }));
  }

  render() {
    return (
      <>
        <button onClick={this.handleClick}>-</button>
        <span>{ this.state.counter }</span>
      </>
    );
  }
}

// 2)React function + hooks
function App() {
  const [counter, setCounter] = React.useState(0);  // variable isn't reactive, we can change it only by special method (setCounter);
  return (
    <>
      <button onClick={() => setCounter(counter => counter + 1)}>-</button>
      <span>{ counter }</span>
    </>
  );
}

//==========================3)Vue==========================//

  <template>
    <div>
      <button v-on:click="counter -= 1">-</button>
      <span>{{ counter }}</span>
      <button v-on:click="counter += 1">+</button>
    </div>
  </template>

// 1)Option API
  <script>
    export default {
      data() {
        return { counter: 0 }; // reactivity embedded to the framework;
      },
    };
  </script>

// 2)Composition API
  <script>
    import {ref} from 'vue';

    export default {
    setup() {
      const counter = ref(0); // make variable reactive by special method (ref(), reactive());

      return { counter };
    },
  };
  </script>
