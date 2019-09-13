<template>
  <div class="signup">
    <h2 class="signup__title">Register to get a work</h2>
    <div class="container">
      <p class="signup__subtitle">Attention! After successful registration and alert, update the list of users in the block from the top</p>
      <form novalidate @submit.prevent="postUser" class="row">
        <label class="col-sm-12 col-md-4 signup__box">
          <input v-model.trim="$v.name.$model" :class="{ 'error': $v.name.$error }" class="signup__textfield" type="text" name="name" placeholder="Your name">
          <span class="signup__label" :class="{ 'error-label': $v.name.$error }">Name</span>
          <span v-if="$v.name.$error" class="error-message">Error</span>
        </label>
        <label class="col-sm-12 col-md-4 signup__box">
          <input v-model.trim="$v.email.$model" :class="{ 'error': $v.email.$error }" class="signup__textfield" type="email" name="email" placeholder="Your email">
          <span class="signup__label" :class="{ 'error-label': $v.email.$error }">Email</span>
          <span v-if="$v.email.$error" class="error-message">Error</span>
        </label>
        <label class="col-sm-12 col-md-4 signup__box signup__box--phone">
          <input v-model.trim="$v.phone.$model" :class="{ 'error': $v.phone.$error }" class="signup__textfield" type="tel" name="phone" placeholder="+38 (___) ___ ___">
          <span class="signup__label" :class="{ 'error-label': $v.phone.$error }">Phone</span>
          <span v-if="$v.phone.$error" class="error-message">Error</span>
        </label>
        <label class="col-sm-12 col-md-6 signup__box">
          <select v-model="selected" class="signup__select" name="select" :class="{ 'error': $v.selected.$error }">
            <option class="signup__options" value="" disabled>Select your position</option>
            <option v-for="user in getPositions" :key="user.id" :value="user.id" class="signup__options">{{user.name}}</option>
          </select>
          <span v-if="$v.selected.$error" class="error-message">Error</span>
        </label>
        <label class="col-sm-12 col-md-6 signup__box signup__box--file">
          <div class="signup__box--file-inner" tabindex="0" :class="{ 'error': file }">
            <span>Upload your photo</span>
            <div class="signup__inner">
              <span class="signup__text">Upload</span>
            </div>
            <input @change="loadFile" class="signup__file" type="file" name="file" ref="file">
            <span class="signup__info">File format jpg  up to 5 MB, the minimum size of 70x70px</span>
          </div>
          <span v-if="file" class="error-message">Error</span>
        </label>
        <div class="col signup__bottom">
          <button class="signup__btn">Sign Up</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

const pattern = /^\+?3?8?(0\d{9})$/;

export default {
  name: 'AppSignUp',
  props: {
    alert: Boolean
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      selected: '',
      file: false,
      positions: []
    }
  },
  computed: {
    getPositions() {
      return this.$store.state.positions
    }
  },
  methods: {
    loadFile() {
      let img = new Image();
      img.src = window.URL.createObjectURL(this.$refs.file.files[0]);
      img.addEventListener('load', evt => {
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        if (width < 70 || height < 70 || this.$refs.file.files[0].size > 5242880 || this.$refs.file.files[0].type !== 'image/jpeg') {
          this.file = true
        } else {
          this.file = false
        }
      })
    },
    postUser() {
      this.$v.$touch();
      if (!this.$v.$invalid && this.$refs.file.files[0]) {
        this.$store.dispatch('postUser', {
          position: this.selected,
          name: this.name,
          email: this.email,
          phone: this.phone,
          photo: this.$refs.file.files[0]
        });
        this.$emit('postUser', true);
        this.$store.commit('clearUsers');
        setTimeout(() => {
          this.$store.dispatch('fetchUsers', {
            page: 1,
            btn: null
          })
        }, 500)
      } else if (this.$refs.file.files[0]) {
        if (this.$refs.file.files[0].size > 5242880 || this.$refs.file.files[0].type !== 'image/jpeg') {
          this.file = true
        } else {
          this.file = false
        }
      } else {
        this.file = true
      }
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(60)
    },
    email: {
      required,
      email
    },
    phone: {
      required,
      minLength: minLength(13),
      telPattern(phone) {
        return pattern.test(phone)
      }
    },
    selected: {
      required
    }
  }
}
</script>

<style scoped lang="scss">

.error {
  border: 1px solid red !important;
  &-label {
    color: red !important;
  }
  &-message {
    color: red;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 12px;
    margin-top: 3px;
  }
}

.signup {
  padding-bottom: 139px;
  &__title {
    margin: 0 0 23px 0;
    text-align: center;
    font-size: 42px;
    font-family: 'Overpass', sans-serif;
    color: #000000;
  }
  &__subtitle {
    font-family: 'Overpass', sans-serif;
    font-size: 18px;
    color: #000000;
    margin: 0 0 58px 0;
    text-align: center;
  }
  &__box {
    position: relative;
    margin-bottom: 42px;
    &--phone {
      padding-right: 0;
    }
    &--file {
      &-inner {
        font-family: 'Source Sans Pro', sans-serif;
        font-size: 16px;
        color: #b7b7b7;
        border-radius: 4px;
        border: 1px solid #b7b7b7;
        padding: 21px 0px 21px 18px;
        position: relative;
      }
      cursor: pointer;
    }
  }
  &__textfield {
    width: 100%;
    padding: 21px 0 21px 18px;
    border-radius: 4px;
    border: 1px solid #b7b7b7;
    &::placeholder {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 16px;
      color: #b7b7b7;
    }
  }
  &__label {
    position: absolute;
    display: block;
    top: -8px;
    left: 25px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #ffffff;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 12px;
    color: #b7b7b7;
  }
  &__select {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #b7b7b7;
    padding: 21px 0px 21px 18px;
    font-size: 16px;
    color: #000000;
    font-family: 'Source Sans Pro', sans-serif;
    appearance: none;
    background: url('../assets/arrow.svg') no-repeat right;
    background-position-x: 97%;
  }
  &__file {
    display: none;
  }
  &__bottom {
    margin-top: 41px;
    display: flex;
    justify-content: center;
  }
  &__btn {
    text-align: center;
    padding: 12px 113px;
    transition: all .2s;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 20px;
    font-weight: 700;
    border-radius: 4px;
    margin-top: 0;
    background: #d7d7d7;
    color: #8d8c8c;
    border: none;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.1);
    }
  }
  &__inner {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    height: 100%;
    padding: 0px 34px;
    display: flex;
    align-items: center;
    border: 2px solid #ef6c00;
  }
  &__text {
    font-family: 'Source Sans Pro', sans-serif;
    color: #ef6c00;
    font-size: 20px;
    font-weight: 700;
  }
  &__info {
    position: absolute;
    bottom: -30px;
    left: 18px;
    font-size: 12px;
    cursor: auto;
  }
}

@media screen and(max-width: 576px) {
  .signup {
    padding-bottom: 71px;
    &__box {
      &--phone {
        padding-right: 15px;
      }
    }
    &__btn {
      font-size: 16px;
    }
    &__title {
      font-size: 26px;
    }
    &__subtitle {
      margin: 0 0 32px 0;
      font-size: 16px;
    }
    &__bottom {
      margin-top: 29px;
    }
    &__info {
      bottom: -40px;
    }
  }
}
</style>