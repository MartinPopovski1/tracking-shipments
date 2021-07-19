<template>
<div>
  <app-header :hide-logout-btn="true"></app-header>

<div class="login-page-wrapper">


  <form action="#" @keyup.enter="login" >
    <div class="form-avatar-container">
      <v-icon name="user-circle" scale="5"/>
    </div>

    <div class="form-inputs-container">

      <div class="form-input-wrapper">
        <label><b>Корисничко име</b>
          <input type="text" placeholder="Внесете корисничко име" v-model.trim="username" required>
        </label>
      </div>
      <div class="form-input-wrapper">
        <label><b>Лозинка</b>
          <input type="password" placeholder="Внесете лозинка" v-model.trim="password" required>
        </label>
      </div>


      <div class="form-error-messages" v-show="errorMessages">
        Грешни кориснички податоци! Обидете се повторно!
      </div>
      <button v-on:click.prevent="login">
        <div v-if="!isLoginSpinnerOn">Најави се</div>
        <app-spinner :show-spinner="isLoginSpinnerOn"></app-spinner>
      </button>

    </div>

<!--    <div class="forget-password-container" >
      <div >
        <a href="#"> Го заборавивте пасвордот?</a></div>
    </div>-->
  </form>
</div>

</div>
</template>

<script>
import AppHeader from "@/components/common/AppHeader/AppHeader";
import 'vue-awesome/icons/user-circle';
import {RepositoryFactory} from "@/backend/repositories/RepositoryFactory";
import {mapActions} from "vuex";
import AppSpinner from "@/components/common/AppSpinner/AppSpinner";

export default {

  name: "Login",
  components: {AppSpinner, AppHeader},

  data() {
    return {
      username: "",
      password: "",
      errorMessages: false,
      isLoginSpinnerOn: false
    }
  },

  computed: {


  },

  methods: {
    ...mapActions( 'user' ,[
      'setUser',
    ]),


    login() {

      if(!this.validateUsernameAndPassword()) {
        this.errorMessages = true;
        return;
      }
      this.errorMessages = false;
      this.isLoginSpinnerOn = true;

      let loginObject = {
        username: this.username,
        password: this.password
      }
      RepositoryFactory.get('user').login(loginObject).then((user) => {
        this.setUser(user);
        this.isLoginSpinnerOn = false;
      }).catch(() => {
        this.errorMessages = true;
        this.isLoginSpinnerOn = false;
      })
    },


    validateUsernameAndPassword() {
      return this.username.length > 1 && this.password.length > 1;
    }

  },

}
</script>

<style scoped>
@import './LoginPage.css';
</style>