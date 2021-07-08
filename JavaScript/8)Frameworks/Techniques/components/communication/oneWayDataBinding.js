//==========================1)React==========================//
const ParentComponent = () => {
  const state = {
    data: 'fajhfj faghkafhjl;a fadkgfgk gf;g df'
  };
  return (
    <ChildComponent data={data}/>
  );
};

const ChildComponent = ({ data }) => {
  return (
    <div>{ data }</div> //one way data binding
  );
};

//==========================2)Vue==========================//

//1)Parent component
<template>
  <div>
    <ChildComponent :data="data"/>
  </div>
</template>

<script>
  import ChildComponent from '';
  export default {
    components: ['ChildComponent'],
    data() {
      return {
        data: 'hgahg hghjkgh dhgjgkj fakdhghgslf'
      }
    }
  };
</script>

//2)Child component
<template>
  <div>{{ data }}</div>
</template>

<script>
  export default {
    props: ['data']
  };
</script>