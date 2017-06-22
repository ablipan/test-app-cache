<template>
  <div id="app">
  Build Time: {{buildTimeStr}}
  </div>
</template>

<script>
function addZero(val) {
  return ('0' + val).slice(-2)
}
const buildTimeDate = process.env.BUILD_TIME ? new Date(process.env.BUILD_TIME) : new Date()
const buildTimeStr = `${buildTimeDate.getFullYear()}-${addZero(buildTimeDate.getMonth() + 1)}-${buildTimeDate.getDate()} ${addZero(buildTimeDate.getHours())}:${addZero(buildTimeDate.getMinutes())}:${addZero(buildTimeDate.getSeconds())}`
export default {
  name: 'app',
  data () {
    return {
      buildTimeStr
    }
  }
}
</script>

<style>

</style>
