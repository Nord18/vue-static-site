<template>
  <div class="users">
    <h2 class="users__title">Our cheerful users</h2>
    <div class="container">
      <h3 class="users__subtitle">Attention! Sorting users by registration date</h3>
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-4 users__item" v-for="(user, index) in LoadUsers" :key="index">
          <div>
            <img class="users__pic" :src="user.photo" alt="user">
          </div>
          <div class="users__inner">
            <h4 class="users__name">{{user.name}}</h4>
            <p class="users__position">{{user.position}}</p>
            <p class="users__email">{{user.email}}</p>
            <p class="users__phone">{{user.phone}}</p>
          </div>
        </div>
      </div>
      <div class="users__bottom">
        <a @click.prevent="loadMoreUsers" href="#" class="users__btn">Show more</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppUsers',
  data() {
    return {
      page: 2,
    }
  },
  computed: {
    LoadUsers() {
      return this.$store.state.users
    }
  },
  methods: {
    loadMoreUsers() {
      this.$store.dispatch('fetchUsers', {
        page: this.page++,
        btn: this.$refs.userBtn
      })
    }
  }
}
</script>

<style scoped lang="scss">

.users {
  padding: 143px 0;
  &__bottom {
    display: flex;
    justify-content: center;
  }
  &__item {
    display: flex;
    margin-bottom: 62px;
    word-wrap: break-word;
    word-break: break-all;
  }
  &__inner {
    margin-left: 9px;
  }
  &__name {
    font-family: 'Overpass', sans-serif;
    font-size: 22px;
    color: #000000;
    margin:  29px 0 20px 0;
    text-transform: capitalize;
  }
  &__position,
  &__email,
  &__phone {
    font-size: 14px;
    font-family: 'Source Sans Pro', sans-serif;
    color: #4c4b4b;
    margin: 0;
  }
  &__title {
    font-family: 'Overpass', sans-serif;
    font-size: 42px;
    text-align: center;
    margin: 0 0 30px 0;
  }
  &__subtitle {
    font-family: 'Overpass', sans-serif;
    font-size: 18px;
    text-align: center;
    margin: 0 0 56px 0;
  }
  &__pic {
    width: 84px;
    height: 80px;
    border-radius: 50%;
  }
  &__btn {
    text-align: center;
    padding: 12px 113px;
    border: 2px solid #ef6c00;
    transition: all .2s;
    font-family: 'Source Sans Pro', sans-serif;
    color: #ef6c00;
    font-size: 20px;
    font-weight: 700;
    border-radius: 4px;
    margin-top: 0;
    text-decoration: none;
    &--off {
      cursor: not-allowed;
      pointer-Events: none;
      background: #d7d7d7;
      color: #8d8c8c;
      border: none;
      &:hover {
        background: #d7d7d7;
      }
    }
    &:hover {
      background: #fee6d2;
    }
  }
}

@media screen and(max-width: 1024px) {
  .users {
    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__inner {
      margin-left: 0;
    }
    &__position,
    &__email,
    &__phone,
    &__name {
      text-align: center;
    }
  }
}

@media screen and(max-width: 576px) {
  .users {
    padding: 71px 0;
    &__btn {
      font-size: 16px;
      padding: 12px 96px;
    }
    &__item {
      margin-bottom: 30px;
    }
    &__inner {
      margin-left: 0;
    }
    &__title {
      font-size: 26px;
    }
    &__subtitle {
      margin: 0 0 32px 0;
      font-size: 16px;
    }
    &__name {
      margin:  16px 0 15px 0;
    }
  }
}
</style>