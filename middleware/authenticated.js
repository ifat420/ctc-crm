export default function ({ app, redirect }) {
    if (app.$auth.$state.loggedIn) {
        redirect('/')
    }
  }