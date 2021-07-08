<template>
  <div v-if:"data">{{ data }}</div> // v-if:"" - declarative attribute of JSX (html);
</template>

// 1)Option API
<script>
  export default {
  data() {
  return { data: null }; // reactivity embedded to the framework;
},
};
</script>