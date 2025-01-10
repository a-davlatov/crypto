<template>
  <a-layout-content>
    <a-result
      status="404"
      title="Under construction"
      sub-title="Sorry, the page is currently under construction."
      style="background-color: #fff"
    >
      <template #extra>
        <a-button type="primary"><router-link to="/">Back Home</router-link></a-button>
      </template>
    </a-result>
  </a-layout-content>
</template>