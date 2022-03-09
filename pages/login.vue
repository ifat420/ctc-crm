<template>
  <div class="flex h-screen justify-center items-center bg-white">
    <div
      class="
        max-w-lg
        w-full
        bg-white
        rounded-xl
        sm:shadow-lg
        px-6
        py-12
        sm:text-left
      "
    >
      <div
        class="w-full flex flex-col gap-y-4 items-center px-3"
      >
        <div class="shrink-0">
          <LogoMomin class="w-24 h-24" />
        </div>
        <h1 class="color-black text-xl antialiased mb-10">
          Sign in to your account
        </h1>
      </div>
      <div
        class="w-full"
      >
        <div class="mb-5">
          <input
            @blur="$v.user.email.$touch()"
            type="email"
            placeholder="Enter Email"
            v-model="user.email"
            class="
              appearance-none
              block
              w-full
              px-4
              py-3
              rounded-md
              shadow-gbtn
              placeholder-gray-400
              focus:outline-none focus:ring-primary focus:border-primary
              sm:text-lg
            "
            :class="{
              'border border-red-500':
                $v.user.email.$dirty && $v.user.email.$invalid,
            }"
          />
          <p
            v-if="!$v.user.email.required && $v.user.email.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Email is required.
          </p>
          <p
            v-if="!$v.user.email.email && $v.user.email.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Email is not vaild.
          </p>
        </div>

        <div class="mb-5">
          <input
            @blur="$v.user.password.$touch()"
            type="password"
            placeholder="Enter Password"
            v-model="user.password"
            class="
              appearance-none
              block
              w-full
              px-4
              py-3
              rounded-md
              shadow-gbtn
              placeholder-gray-400
              focus:outline-none focus:ring-primary focus:border-primary
              sm:text-lg
            "
            :class="{
              'border border-red-500':
                $v.user.password.$dirty && $v.user.password.$invalid,
            }"
          />
          <p
            v-if="!$v.user.password.required && $v.user.password.$dirty"
            class="text-red-500 text-xs mt-2"
            >*Password is required</p
          >
          <p
            v-if="!$v.user.password.minLength && $v.user.password.$dirty"
            class="text-red-500 text-xs mt-2"
            >*password shoul be at least 6 char long</p
          >
        </div>

        
        
        <button
              @click.prevent="login"
              class="
                w-full
                inline-flex
                justify-center
                items-center
                py-3
                px-4
                border border-transparent
                rounded-md
                shadow-sm
                font-medium
                text-white
                bg-primary
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
              "
            >
              <IconSpinAnimation v-if="is('loginAction')" />
              <span>Sign in</span>
            </button>

        <p
          class="error font-light text-center mt-2"
          v-if="isError('loginAction')"
          >{{ isError("loginAction").error }}</p
        >
        
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "vuelidate/lib/validators";
import { mapActions, mapState, mapGetters } from "vuex";
import LogoMomin from "~/components/shared/LogoMomin";
import InputField from "~/components/shared/InputField";
import InputCheckbox from "~/components/shared/InputCheckbox";
import IconSpinAnimation from "~/components/SpinAnimaiton";

export default {
  layout: "others",
  middleware: "authenticated",

  auth: 'guest',

  components: {
    LogoMomin,
    InputField,
    InputCheckbox,
    IconSpinAnimation
  },

  data() {
    return {
      buttonContent: "Sign in",
      user: {
        email: "",
        password: "",
      },

      error: null,
      loading: "loginAction",
    };
  },

  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },

  computed: {
    ...mapGetters(["is", "isError"]),
  },

  methods: {
    ...mapActions(["loginAction"]),

    updatedText(content) {
      this.user.email = content;
    },

    updatedPassword(content) {
      this.user.password = content;
    },

    async login() {
      this.$v.$touch();
      if (!this.$v.user.$invalid) {
        console.log(this.user)
        await this.loginAction(this.user);
      }
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>