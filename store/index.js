export const state = () => ({
    singleStudentInfo: [],
    studentsFileUploadResponse: [],
    subjectFileUploadResponse: [],
    marksFileUploadResponse: [],
    registrationResponse: [],
    registrationFailureStatus: {},
    publishResultResponse: [],
    publishedResultResponse: {},
    studentsList: [],
    result: {},
    wait: [],
    error: {},
    session: [],
    group: [],
    exams: [],
    class: [],
    aStudent: [],
    aSubject: [],
    aExam:[],
    getAllStudentResponse: [],
    getAllSubjectResponse: [],
    getAllExamsResponse: [],
    sidebar: false,
    optionalSubjectResponse: [],
    requiredSubjectResponse: [],
    marksResponse: [],
    createSubjectResponse: [],
    marksOnSubjectResponse: []
})

export const getters = {

    is(state) {
        return payload => {
            return state.wait[payload];
        };
    },

    any(state) {
        for (let key in state.wait) {
            if (state.wait[key]) return true;
        }
    },

    isError(state) {
        return payload => {
            return state.error[payload];
        };
    },

    sidebarStatus(state) {
        return state.sidebar;
    }
}

export const mutations = {

    SET_SIDEBAR(state, payload) {
        state.sidebar = payload;
    },

    START_LOADING(state, payload) {
        var obj = {};
        obj[payload] = true;
        state.wait = Object.assign({}, state.wait, obj);
    },

    STOP_LOADING(state, payload) {
        var obj = {};
        obj[payload] = false;
        state.wait = Object.assign({}, state.wait, obj);
    },

    SET_ERROR(state, payload) {
        var obj = {};
        obj[payload.id] = {}
        obj[payload.id].has_error = payload.has_error;
        obj[payload.id].error = payload.error;

        state.error = Object.assign({}, state.error, obj);
    },

    SET_RESULT(state, payload) {
        state.result = payload;
    },

    SET_SINGLE_STUDENT_INFORMATION (state, payload) {
        state.singleStudentInfo = payload;
    },

    SET_STUDENT_FILE_UPLOAD_INFORMATION (state, payload) {
        state.studentsFileUploadResponse = payload;
    },

    SET_SUBJECT_FILE_UPLOAD_INFORMATION (state, payload) {
        state.subjectFileUploadResponse = payload;
    },

    SET_MARKS_FILE_UPLOAD_INFORMATION (state, payload) {
        state.marksFileUploadResponse = payload;
    },

    SET_REGISTRATION_RESPONSE (state, payload) {
        state.registrationResponse = payload;
    },

    SET_REGISTRATION_FAILURE( state, error) {
        state.registrationFailureStatus = error;
    },

    SET_PUBLISH_RESULT_RESPONSE( state, payload) {
        state.publishResultResponse = payload;
    },

    SET_PUBLISHED_RESULT_RESPONSE( state, payload ) {
        state.publishedResultResponse = payload;
    },

    SET_GET_STUDENTS_LIST( state, payload ) {
        state.studentsList = payload;
    },

    SET_POST_A_STUDENT(state, payload) {
        state.aStudent = payload;
    },

    SET_GET_ALL_STUDENT(state, payload) {
        state.getAllStudentResponse = payload;
    },

    SET_GET_ALL_SUBJECT(state, payload) {
        state.getAllSubjectResponse = payload;
    },

    SET_POST_A_SUBJECT(state, payload) {
        state.aSubject = payload;
    },

    SET_POST_A_EXAM(state, payload) {
        state.aExam = payload;
    },

    SET_GET_ALL_EXAMS(state, payload) {
        state.getAllExamsResponse = payload;
    },

    SET_SESSION(state, payload) {
        state.session = payload
    },

    SET_EXAMS(state, payload) {
        state.exams = payload
    },

    SET_GROUP(state, payload) {
        state.group = payload
    },

    SET_CLASS(state, payload) {
        state.class = payload
    },

    CLEAR_RESULT(state) {
        state.result = {};
    },

    SET_GET_OPTIONAL_SUBJECT(state, payload) {
        state.optionalSubjectResponse = payload;
    },

    SET_GET_REQUIRED_SUBJECT(state, payload) {
        state.requiredSubjectResponse = payload;
    },
    
    SET_CREATE_MARKS_RESPONSE (state, payload) {
        state.marksResponse = payload
    },

    SET_CREATE_SUBJECTS_RESPONSE(state, payload) {
        state.createSubjectResponse = payload
    },

    SET_CREATE_MARKS_ON_SUBJECT_RESPONSE(state, payload) {
        state.marksOnSubjectResponse = payload;
    }

}

export const actions = {

    openSidebar({ commit }) {
        commit("SET_SIDEBAR", true);
    },

    closeSidebar({ commit }) {
        commit("SET_SIDEBAR", false);
    },

    start({ commit }, payload) {
        commit("START_LOADING", payload);
    },

    end({ commit }, payload) {
        commit("STOP_LOADING", payload);
    },

    setError({commit}, payload) {
        commit("SET_ERROR", payload)
    },

    // async createSuperAdmin({ dispatch }, payload) {
    //     const id = 'createSuperAdmin';

    //     try {
    //         dispatch('start', id);
    //         await this.$axios.$post(`/admin/super`, payload);
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         dispatch("end", id);
    //     }
    // },

    /**
     * 描述
     * @date 2021-12-16
     * @param {any} {dispatch}
     * @param {Object} payload // file with formdata
     * @returns {any}
     */
    async uplaodXLfile({ dispatch }, payload) {
        const id = 'uplaodXLfile';

        try {
            dispatch('start', id);
            await this.$axios.$post(`/upload`, payload);
        } catch (error) {
            console.log(error)
        } finally {
            dispatch("end", id);
        }
    },

    /**
     * 描述
     * @date 2021-12-16
     * @param {any} {dispatch}
     * @param {any} payload // Student Result
     * @returns {any}
     */
    // async getResult({ dispatch, commit }, payload) {
    //     const id = 'getResult'; 

    //     try {   
    //         dispatch('start', id);
    //         let r = await this.$axios.$post(`/show`, payload);
    //         commit('SET_RESULT', r);
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         dispatch("end", id);
    //     }
    // },

    clearResult({ commit }) {
        commit('CLEAR_RESULT');
    },


    async getSession({ dispatch, commit }) {
        const id = 'getSession';

        try {
            dispatch('start', id);
            let r = await this.$axios.$get(`/session`);
            commit('SET_SESSION', r);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch("end", id);
        }
    },

    async getExams({ dispatch, commit }) {
        const id = 'getExams';

        try {
            dispatch('start', id);
            let response = await this.$axios.$get(`/exams`);
            commit('SET_EXAMS', response);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch("end", id);
        }
    },

    async getGroup({ dispatch, commit }) {
        const id = "getGroup";

        try {
            dispatch('start', id);
            let response = await this.$axios.$get(`/group`);
            commit('SET_GROUP', response);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch("end", id);
        }
    },

    async getClass({ dispatch, commit }) {
        const id = "getClass";

        try {
            dispatch("start", id);
            let response = await this.$axios.$get(`/class`);
            commit("SET_CLASS", response);
        } catch (error) {
            console.log(error);
        } finally {
            dispatch("end", id);
        }
    },

    async postResult({ dispatch, commit }, payload) {
        const id = 'postResult';
        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let r = await this.$axios.$post(`/final-result-allpass`, payload);
            console.log("response", r);
            commit('SET_RESULT', r);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("students file upload error",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj)
        }
    },

    async postStudentInformation({ dispatch, commit }, payload) {
        const id = 'postStudentInformation';

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let r = await this.$axios.$post(`/marksheet-a-studnet`, payload);
            console.log("responseInfo", r);
            commit('SET_SINGLE_STUDENT_INFORMATION', r);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("students file upload error",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj)
        }
    },

    async studentsFileUpload({dispatch, commit}, payload) {
        const id = "studentsFileUpload";
        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start',id);
            dispatch('setError', obj)
            let response = await this.$axios.$post(`/student-sheet`,payload);
            console.log("student file response",response);
            commit('SET_STUDENT_FILE_UPLOAD_INFORMATION',response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("students file upload error",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj)
        }
    },


    async subjectFileUpload({dispatch, commit}, payload) {
        const id = "subjectFileUpload";
        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start',id);
            let response = await this.$axios.$post(`/subject-sheet`,payload);
            console.log("subject file response",response);
            commit('SET_SUBJECT_FILE_UPLOAD_INFORMATION',response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("subject file upload error",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj)
        }
    },

    async marksFileUpload({dispatch, commit}, payload) {
        const id = "marksFileUpload";
        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start',id);
            let response = await this.$axios.$post(`/marktable-sheet`,payload);
            console.log("marks file response",response);
            commit('SET_MARKS_FILE_UPLOAD_INFORMATION',response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async loginAction({ dispatch }, payload) {
        const id = 'loginAction'; 

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {   
            dispatch('start', id);
            await this.$auth.loginWith('local', {
                data: payload
            });
            // this.$router.push('/');
            
        } catch (error) {
            console.log(error.response)
            obj.has_error = true
            obj.error = error.response.data.message
            console.log(obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async registrationAction ({ dispatch,commit }, payload) {
        const id = "registrationAction";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post(`/signup`, payload);
            this.$router.push('/login');
            commit ('SET_REGISTRATION_RESPONSE', response);
        } catch (error) {
            commit('SET_REGISTRATION_FAILURE',error);
            obj.has_error = true
            obj.error = error.response.data.message
            console.log(obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async postPublishResult ({ dispatch,commit }, payload) {
        const id = "postPublishResult";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post(`/publish-result`, payload);
            commit('SET_PUBLISH_RESULT_RESPONSE', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("post publish result ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async getPublishedResult ({ dispatch,commit }, payload) {
        const id = "getPublishedResult";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$get(`/published-result`, payload);
            commit('SET_PUBLISHED_RESULT_RESPONSE', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("get published result ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async getStudentsList({ dispatch,commit }, payload) {
        const id = "getStudentsList";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post(`/students-list`, payload);
            console.log("response students list inside store:",response);
            commit('SET_GET_STUDENTS_LIST', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async postCreateStudent({ dispatch,commit }, payload) {
        const id = "postCreateStudent";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post(`/student`, payload);
            console.log("response student info inside store:",response);
            commit('SET_POST_A_STUDENT', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async getAllStudent({ dispatch,commit }, payload) {
        const id = "getAllStudent";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$get('/student', {params: payload});
            console.log("response get all student info inside store:",response);
            commit('SET_GET_ALL_STUDENT', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async postCreateSubject({ dispatch,commit }, payload) {
        const id = "postCreateSubject";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post('/subject', payload);
            commit('SET_POST_A_SUBJECT', response);
            this.$router.push("/subjects/show-all-subjects");
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async getAllSubject({ dispatch,commit }, payload) {
        const id = "getAllSubject";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$get('/subjects', {params: payload});
            console.log("response get all subject info inside store:",response);
            commit('SET_GET_ALL_SUBJECT', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async postCreateExam({ dispatch,commit }, payload) {
        const id = "postCreateExam";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post('/exam', payload);
            console.log("response post a exam info inside store:", response);
            commit('SET_POST_A_EXAM', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async getAllExams ({ dispatch,commit }, payload) {
        const id = "getAllExams";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$get('/exam', {params: payload});
            console.log("response get all exams info inside store:",response);
            commit('SET_GET_ALL_EXAMS', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async getOptionalSubject ({ dispatch,commit }, payload) {
        const id = "getOptionalSubject";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post('/subject-optional', payload);
            console.log("response get optional subjects inside store:",response);
            commit('SET_GET_OPTIONAL_SUBJECT', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async getRequiredSubject ({ dispatch,commit }, payload) {
        const id = "getRequiredSubject";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post('/subject-required', payload);
            console.log("response get required subjects inside store:",response);
            commit('SET_GET_REQUIRED_SUBJECT', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async createMarks ({ dispatch,commit }, payload) {
        const id = "createMarks";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post('/marktable-list', payload);
            console.log("response get required subjects inside store:",response);
            commit('SET_CREATE_MARKS_RESPONSE', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async createSubjects ({ dispatch,commit }, payload) {
        const id = "createSubjects";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post('/marktable-list-subject', payload);
            console.log("response all subjects inside store:",response);
            commit('SET_CREATE_SUBJECTS_RESPONSE', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

    async createMarksOnSubject ({ dispatch,commit }, payload) {
        const id = "createMarksOnSubject";

        const obj = {}
        obj.id = id
        obj.error = null
        obj.has_error = false

        try {
            dispatch('start', id);
            let response = await this.$axios.$post('/marktable-list', payload);
            console.log("response get required subjects inside store:",response);
            commit('SET_CREATE_MARKS_ON_SUBJECT_RESPONSE', response);
        } catch (error) {
            obj.has_error = true
            obj.error = error.response.data.message
            console.log("ERROR",obj.error);
        } finally {
            dispatch("end", id);
            dispatch('setError', obj);
        }
    },

}

