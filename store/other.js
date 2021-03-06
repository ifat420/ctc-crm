export const state = () => ({
  highlights: [],
  publishedResults: {},
  exams: [
    {
      name: "All Exams",
      value: "all"
    },
    {
      name: "Half Yearly",
      value: "half-yearly"
    },
    {
      name: "Year Final",
      value: "year-final"
    },
    {
      name: "Pre test",
      value: "pre-test"
    },
    {
      name: "Test",
      value: "test"
    },
  ],
  groups: [
    {
      name: "All Groups",
      value: "all"
    },
    {
      name: "Science",
      value: "Science"
    },
    {
      name: "Humanities",
      value: "humanities"
    }
  ]
})

export const getters = {
  getHighlights(state) {
    return state.highlights
  },
  getPublishedResult(state) {
    return state.publishedResults
  },
  getExams(state) {
    return state.exams
  },
  getGroups(state) {
    return state.groups
  }
}

export const mutations = {
  SET_HIGHLIGHTS(state, payload) {
    state.highlights = payload
  },
  SET_PUBLISHED_RESULT(state, payload) {
    state.publishedResults = payload
  }
}

export const actions = {
  async fetchHighlights({ dispatch, commit }) {
    const id = 'fetchHighlights';
    const obj = {}
    obj.id = id
    obj.error = null
    obj.has_error = false

    try {
      dispatch('start', id, { root: true });
      let res = await this.$axios.$get(`/highlights`);
      commit("SET_HIGHLIGHTS", res)
    } catch (error) {
      obj.has_error = true
      obj.error = error.response.data.message
    } finally {
      dispatch('end', id, { root: true })
      dispatch('setError', obj, { root: true })
    }
  },

  async fetchPublishedResult({ dispatch, commit }, payload) {
    const id = 'fetchPublishedResult';
    const obj = {}
    obj.id = id
    obj.error = null
    obj.has_error = false

    try {
      dispatch('start', id, { root: true });
      let res = await this.$axios.$get(`/exam-published`, { params: payload });
      commit("SET_PUBLISHED_RESULT", res)
    } catch (error) {
      obj.has_error = true
      obj.error = error.response.data.message
    } finally {
      dispatch('end', id, { root: true })
      dispatch('setError', obj, { root: true })
    }
  },
}