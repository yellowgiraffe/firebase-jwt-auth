<script setup>
import ProgressSpinner from 'primevue/progressspinner'
</script>
<template>
  <ProgressSpinner
    style="width: 50px; height: 50px;"
    stroke-width="3"
    fill="var(--surface-ground)"
    animation-duration=".5s"
    aria-label="Custom ProgressSpinner"
  />
</template>