<template>
  <div id="app" class="app">
    <div v-if="token">
      <router-view/>
    </div>
    <login v-else/>
  </div>
</template>

<script>
import Login from './pages/Login/LoginPage.vue'
import {subscribe} from './backend/services/pub-sub'
import {mapState} from 'vuex'


export default {
  name: 'App',
  components: {
    Login
  },

  computed: {
    ...mapState('user',{
      token: state => state.user.token,
    }),
  },

  mounted() {


    const errorHandler = function(errorData) {
      if(errorData.Message) {
        this.$toasted.error(errorData.Message, {
          theme: "toasted-primary",
          position: "top-center",
          duration: 4000
        })
      }
      if(errorData.ResultMessages) {
        errorData.ResultMessages.forEach((error) => {
          this.$toasted.error(error.Message, {
            theme: "toasted-primary",
            position: "top-center",
            duration: 4000
          })
        })
      }
      else if(errorData.errors) {
        for (let error in errorData.errors) {
          if (Object.prototype.hasOwnProperty.call(errorData.errors, error)) {
            if(!Array.isArray(errorData.errors[error])) return;
            errorData.errors[error].forEach((errorMessage) => {
              this.$toasted.error(errorMessage, {
                theme: "toasted-primary",
                position: "top-center",
                duration: 4000
              })
            })
          }
        }
      }
    }.bind(this);
    subscribe('error-message', errorHandler)


  }
}
</script>

<style>



html {
  box-sizing: border-box;
  font-size: 16px;
}

div.app{
  min-height: 100vh;
}

html, body {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  /*  height: 100vh;*/
  /*max-height: 100vh;*/
  min-width: 0;
  width: 100vw;
  max-width: 100%;
  font-size: 16px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  background-color: #EEEEEE;
}

.page-spinner-wrapper .app-spinner-wrapper{
  display: flex;
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  margin-top: 30vh;

}

</style>
