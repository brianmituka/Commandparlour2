<template>
  <div>
    {{everything}}
    <br>
    {{freeMem}}
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    data () {
      return {
        everything: require('os').cpus(),
        freeMem: require('os').freemem()
      }
    },
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

 
</style>
