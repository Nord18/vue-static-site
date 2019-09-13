<template>
  <div class="header">
    <div class="header__content col col-lg-6 col-xl-4">
      <h1 class="header__title">Test assignment for Frontend Developer position</h1>
      <p class="header__descr">We kindly remind you that your test assignment should be submitted as a link to github/bitbucket repository. Please be patient, we consider and respond to every application that meets minimum requirements. We look forward to your submission. Good luck!</p>
      <a v-smooth-scroll href="#signUp" class="header__btn">Sign Up</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped lang="scss">
.header {
  height: 100vh;
  background: url('../assets/header-bg.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  padding-left: 47px;
  &__content {
    word-wrap: break-word;
  }
  &__title {
    font-family: 'Overpass', sans-serif;
    font-size: 50px;
    color: #ffffff;
    margin-bottom: 32px;
  }
  &__descr {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 20px;
    color: #ffffff;
    margin-top: 0;
    margin-bottom: 46px;
  }
  &__btn {
    padding: 12px 113px;
    background: #ef6c00;
    transition: all .2s;
    font-family: 'Source Sans Pro', sans-serif;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    border-radius: 4px;
    margin-top: 0;
    text-decoration: none;
    &:hover {
      background: #fc831f;
    }
  }
}

@media screen and(min-width: 1920px) {
  .header {
    justify-content: center;
    padding-left: 0;
  }
}

@media screen and(max-width: 576px) {
  .header {
    padding-left: 0;
    height: 80vh;
    &__content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__title {
      font-size: 30px;
      text-align: center;
      margin-bottom: 18px;
    }
    &__descr {
      font-size: 16px;
      text-align: center;
    }
    &__btn {
      font-size: 16px;
    }
  }
}
</style>