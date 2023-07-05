import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const apiKey = import.meta.env.VITE_API_KEY

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
  const auth = async (payload, type) => {
    error.value = ''
    isLoading.value = true
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${apiKey}`,
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
      console.log('Error', err.response);
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
        case('EMAIL_NOT_FOUND'):
          error.value = 'Email not found'
          break;
          case('INVALID_PASSWORD'):
          error.value = 'Invalid password'
          break;
          case('USER_DISABLED'):
          error.value = 'This user is disabled by administrator'
          break;
        default:
          error.value = 'Unknown error'
          break;
      }
      throw error.value
    } finally {
      isLoading.value = false
    }
  }
  return { auth, userInfo, error, isLoading }
})
