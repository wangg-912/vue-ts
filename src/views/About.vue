<template>
  <div class="about">
    <h1>{{text}}</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { getUseInfo, updateUser, getUsers } from "@/api/app";

@Component
export default class About extends Vue {
  text: string = "This is an about page!!";
  created(): void {
    this.init();
  }
  private init() {
    getUseInfo("123")
      .then((res: any) => {})
      .catch((error: any) => {});
    updateUser({
      name: "123",
      age: "12"
    })
      .then((res: any) => {})
      .catch((error: any) => {});

    getUsers({ name: "123", age: "12", address: "北京成都" })
      .then((res: any) => {})
      .catch((error: any) => {});
  }
}
</script>

