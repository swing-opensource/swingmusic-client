<template>
  <div class="generictabs">
    <RouterLink
      v-for="(item, index) in items"
      :key="index"
      class="tab"
      :class="{ active: active(item) }"
      :to="{
        name: route,
        params: item.params,
        replace: true,
        query: item.query,
      }"
    >
      {{ item.title }}
      <div class="indicator"></div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: { title: string; params: any, query?: any }[];
  active: (item: any) => boolean;
  route: string;
}>();
</script>

<style lang="scss">
.generictabs {
  display: flex;
  border-bottom: solid 1px $gray;

  .tab {
    padding: $medium;
    position: relative;
    color: $gray1;
  }

  .indicator {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: $white;
    height: 3px;
    border-radius: 1rem;
    opacity: 0;
  }

  .tab.active {
    color: $white;

    .indicator {
      width: 3rem;
      opacity: 1;
    }
  }
}
</style>
