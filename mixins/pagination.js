export default {
  data: () => ({
    page: 1,
    limit: 10,
    next: `<svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 9.50012L5.5 5.25012L1 1.00012" stroke="black"/>
          </svg>`,
    prev: `<svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 1L1 5.25L5.5 9.5" stroke="black"/>
          </svg>`
  }),

  methods: {
    onPageChnage(page) {
      this.$router.push({ path: this.$route.path, query: { page: page } })
    }
  },

  watch: {
    '$route': function (v) {
      if (v.query && v.query.page) {
        this.page = +v.query.page
      } else {
        this.page = 1
      }
      this.fetchData()
    }
  },

  mounted() {
    if (this.$route.query && this.$route.query.page) {
      this.page = +this.$route.query.page
      this.fetchData()
    } else {
      this.page = 1
      this.fetchData()
    }
  }

}