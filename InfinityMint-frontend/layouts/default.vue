<script setup lang="ts">
const links = [{
  label: 'Art',
  icon: 'i-heroicons-book-open',
  to: '/getting-started'
}, {
  label: 'Gaming',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/pro'
}, {
  label: 'Photographie',
  icon: 'i-heroicons-rocket-launch',
  to: '/releases'
}]
</script>


<template>
  <UHeader :links="links">
    <template #logo>
      InfinityMint
    </template>

    <template #center>
      <UHeaderLinks :links="links" />
    </template>

    <template #right>
      <UColorModeButton />
      <UButton to="https://github.com/nuxt/ui" target="_blank" icon="i-simple-icons-github" color="gray"
        variant="ghost" />
    </template>


  </UHeader>

  <UPage class="m-8">
    <UPageBody>
      
        <slot />

    </UPageBody>
  </UPage>


  

</template>
