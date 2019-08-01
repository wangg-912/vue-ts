<template>
  <h1 class="home">{{text}}</h1>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Home",
  components: {}
})
export default class extends Vue {
  text: string = "Welcome to TypeScript App";
}
</script>
