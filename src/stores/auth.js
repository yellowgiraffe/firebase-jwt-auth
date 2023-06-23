import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = 'AIzaSyAyd-Tc1ttkyNUfj_vVNduJvFaDWLZ2cOA'

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref({
    userId: '',
    email: '',
    password: '',
    token: '',
    refreshToken: '',
    expiresIn: ''
  });
  const error = ref('')
  const isLoading = ref(false)
  const signup = async (payload) => {
    error.value = ''
    isLoading.value = true
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
        {
          ...payload,
          returnSecureToken: true
        }
      )
      userInfo.value = {
        userId: response.data.localId,
        email: response.data.email,
        token: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn
      }
      console.log(response.data);
    } catch(err) {
      console.log(err.response);
      switch(err.response.data.error.message) {
        case('EMAIL_EXISTS'):
          error.value = 'Email exists'
          break;
        case('OPERATION_NOT_ALLOWED'):
          error.value = 'Operation not allowed'
          break;
        case('TOO_MANY_ATTEMPTS_TRY_LATER'):
          error.value = 'Too many attempts. Try again later'
          break;
        default:
          error.value = 'Unknown error'
          break;
      }
    }
    isLoading.value = false
  }
  return { signup, userInfo, error, isLoading }
})
