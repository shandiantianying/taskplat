<template>
  <div class='root'>
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Root',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
  .root {
    overflow: auto;
    height: 100%;
    width: 100%;
  }
  .root::-webkit-scrollbar {
    border-width:1px;
  }
</style>
