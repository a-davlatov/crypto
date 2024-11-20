<template>
  <a-result
    status="403"
    title="403"
    sub-title="Sorry, you are not authorized to access this page."
    style="background-color: #fff"
  >
    <template #extra>
      <a-button type="primary"><router-link to="/">Back Home</router-link></a-button>
    </template>
  </a-result>
</template>