
//==========================1)React==========================//

//1) Class
class Form extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = function(event) {
      console.log(`${ field } changed to ${ event.target.value }`);
    }.bind(this);
  }
  render() {
    return (
      <div>
        <button onClick={ this._onClick }>Button</button>
      </div>
    );
  }
};

//2) Function
const Form = () => {
  const _onClick = function(event) {
    console.log(`${field} changed to ${event.target.value}`);
  };

  return (
    <div>
      <button onClick={ _onClick }>Button</button>
    </div>
  );
};

//==========================2)Vue==========================//

<template>
  <div>
    <button  @click="_onNClick">Button</button>
  </div>
</template>

// 1)Option API
<script>
  export default {
  methods: {
    _onNClick: (val) => {
      console.log(val);
    }
  }
};
</script>

// 2)Composition API
<script>
  export default {
  setup() {
    const _onNClick = (val) => {
      console.log(val);
    };

    return { _onNClick };
  },
};
</script>
