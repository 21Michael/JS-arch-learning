//==========================1)React==========================//
const ParentComponent  = () => {
  const { name, setName } = useState('');
  const _onClick = (evt) => {
    setName(evt.target.value);
  };

  return (
    <ChildComponent clickHandler={_onClick} inputValue={name}/>
  );
};

const ChildComponent = ({ clickHandler, inputValue }) => {
  return (
    <input value={inputValue} onChange={clickHandler}/>//two way data binding
  );
};

//==========================2)Vue==========================//

//1)Parent component
<template>
  <div>
    <ChildComponent v-model="name"/> //:modelValue="name" @input="update:modelValue"
  </div>
</template>

<script>
  import ChildComponent from '';
  export default {
    components: ['ChildComponent'],
    data() {
      return {
        name: ''
      }
    }
  };
</script>

//2)Child component
<template>
  <input :value="name" @input="clickHandler"/> //two way data binding
</template>

<script>
  export default {
    props: ['name'],
    emits: ['update:modelValue'],
    methods: {
      clickHandler(option) {
        this.$emit('update:modelValue', option);
      },
    },
  };
</script>