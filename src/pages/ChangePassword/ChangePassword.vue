<template>
<div>
  <app-header :hide-logout-btn="true"></app-header>

<div class="change-password-page-wrapper">


  <form action="#" @keyup.enter="changePassword" >

    <div class="form-inputs-container">
      <div class="form-avatar-container">
        <v-icon name="user-circle" scale="5"/>
      </div>

      <div class="form-input-wrapper">
        <label><b>Стара лозинка</b>
          <input type="password" placeholder="Внесете ја старата лозинка" v-model.trim="oldPassword" required>
        </label>
      </div>
      <div class="form-input-wrapper">
        <label><b>Нова лозинка</b>
          <input type="password" placeholder="Внесете нова лозинка" v-model.trim="newPasswordFirstTime" required>
        </label>
      </div>
      <div class="form-input-wrapper">
        <label><b>Повторно нова лозинка</b>
          <input type="password" placeholder="Внесете нова лозинка" v-model.trim="newPasswordSecondTime" required>
        </label>
      </div>


      <div class="form-error-messages" v-show="errorMessages">
        Погрешно внесени податоци! Обидете се повторно!
      </div>
      <button v-on:click.prevent="changePassword">
        <div v-if="!isChangePasswordSpinnerOn">Потврди</div>
        <app-spinner :show-spinner="isChangePasswordSpinnerOn"></app-spinner>
      </button>

    </div>


  </form>
</div>

</div>
</template>

<script>
import AppHeader from "@/components/common/AppHeader/AppHeader";
import 'vue-awesome/icons/user-circle';
import {RepositoryFactory} from "@/backend/repositories/RepositoryFactory";
import AppSpinner from "@/components/common/AppSpinner/AppSpinner";

export default {

  name: "changePassword",
  components: {AppSpinner, AppHeader},

  data() {
    return {
      oldPassword: "",
      newPasswordFirstTime: "",
      newPasswordSecondTime: "",
      errorMessages: false,
      isChangePasswordSpinnerOn: false
    }
  },

  computed: {
  },

  methods: {

    changePassword() {

      if(!this.validatePasswords()) {
        this.errorMessages = true;
        return;
      }
      this.errorMessages = false;
      this.isChangePasswordSpinnerOn = true;

      let changePasswordObject = {
        oldPassword: this.oldPassword,
        newPassword: this.newPasswordFirstTime
      }
      RepositoryFactory.get('user').changePassword(changePasswordObject).then(() => {
        this.isChangePasswordSpinnerOn = false;
        this.$router.push({name:"FirstPage"})
      }).catch(() => {
        this.errorMessages = true;
        this.isChangePasswordSpinnerOn = false;
      })
    },


    validatePasswords() {
      return this.oldPassword.length > 1 && this.newPasswordFirstTime.length > 1
          && this.newPasswordFirstTime === this.newPasswordSecondTime
    }

  },

}
</script>

<style scoped>
@import 'ChangePassword.css';
</style>