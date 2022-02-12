<template>
  <div>
        <ShowUrl :content="mainContents"/>
        <div>
            <form @submit.prevent="uploadAExam">

                <div class="p-10">  

                    <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                        <div class="pb-4 sm:pb-0">
                            <SelectInputExamName :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="exam.exam_name" :input="examName" @hello="examNameChanged"/>
                            <span v-if="!$v.exam.exam_name.required && $v.exam.exam_name.$dirty" class="error pb-4">*Exam Name is required</span>
                        </div>
                        <div class="pb-4 sm:pb-0">
                            <SelectInputSession :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="exam.session" :input="sessionList" @hello="sessionChanged"/>
                            <span v-if="!$v.exam.session.required && $v.exam.session.$dirty" class="error pb-4">*Session is required</span>
                        </div>
                    </div> 
                    <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                        <div class="pb-4 sm:pb-0">
                            <div>
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                    Exam Year
                                </label>
                                <input @blur="$v.exam.exam_year.$touch()" v-model="exam.exam_year" class="w-full py-3 px-3 inputText focus:outline-none font" type="text" placeholder="Exam Year" >
                                
                            </div>
                            <span v-if="!$v.exam.exam_year.required && $v.exam.exam_year.$dirty" class="error pb-4">*Exam Year is required</span>
                        </div>
                    </div> 
                    
                </div>

                <div v-if="hasSuccess && aSubject && aSubject.message" class="pb-3 px-10">
                    <h1 class="font success">{{ aSubject.message }}</h1>
                </div>

                <div v-if="isError('postCreateExam')  && isError('postCreateExam').has_error" class="pt-3">
                    <h1 class="font text-red-600"> {{ isError('postCreateExam').error }} </h1>
                </div>

                <div class="flex items-center justify-start gap-x-4 pb-8 px-10">
                    <button
                        class="btn block rounded-lg font relative"
                        :disabled="is('postCreateExam')"
                        >
                        Submit
                        <span :class="{'load loading': is('postCreateExam') }"></span>
                    </button>
                </div>

            </form>

        </div>
    </div>
</template>

<script>
import SelectInputExamName from '~/components/shared/Input/SelectInputExamName'
import SelectInputSession from '~/components/shared/Input/SelectInputSession'
import ShowUrl from '~/components/shared/ShowUrl'

import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email, alpha } from 'vuelidate/lib/validators'
export default {

    components: {
        SelectInputExamName,
        SelectInputSession,
        ShowUrl
    },

    data() {
        return {
            mainContents: {
                folderName: "exams",
                compName: "create-a-exam",
                topicName: "Create A Exam"
            },
            hasSuccess: false,
            widthStudent: true,
            shadowStudent: true,
            marBottom: true,

            examName: {
                name: "Exam Name",
                options: [
                    { name: "test", value: "test"},
                    { name: "pre-test", value: "pre-test"},
                    { name: "half-yearly", value: "half-yearly"},
                    { name: "year-final", value: "year-final"},
                ]
            },

            exam: {
                exam_name: "",
                exam_year: "",
                session: ""
            }
        }
    },

    validations: {
        exam: {
            exam_name: {
                required
            },
            exam_year: {
                required
            },
            session: {
                required
            }
        }
    },

    computed: {
        ...mapState(["aExam","session"]),
        ...mapGetters(["is", "isError"]),

        sessionList() {
            let obj = {}
            obj.name = "Session"
            obj.options = []

            if (this.session && this.session.length) {
                this.session.forEach(item => {
                let ob = {}
                ob.name = item
                ob.value = item
                obj.options.push(ob)
                })
            } return obj
        },
    },

    methods: {
        ...mapActions(["postCreateExam","getSession"]),

        examNameChanged(value) {
            console.log(`Exam Changed value ${value}`);
            this.exam.exam_name = value;
        },

        sessionChanged(value) {
            console.log(`Session Changed value ${value}`);
            this.exam.session = value;
        },

        async uploadAExam() {
            this.$v.$touch();
            console.log("EXAM",this.$v.exam);
            if (this.$v.exam.$anyError == false )
                {
                    await this.postCreateExam(this.exam);
                    this.hasSuccess = true;
                    console.log("UPLOADED");
                    this.$router.push("/exams/show-all-exams");
                }
            this.hasSuccess = false;
            this.exam.exam_name = "",
            this.exam.exam_year = "",
            this.exam.session = ""
        }

    },

    mounted() {
        this.getSession();
    }

}
</script>

<style>

</style>