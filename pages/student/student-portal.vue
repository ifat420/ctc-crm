<template>
  <div class="flex h-screen justify-center items-center bg-white">
        <div class="flex flex-col self-start sm:self-center gap-y-6 max-w-lg w-full bg-white rounded-xl sm:shadow-lg px-6 py-12 sm:text-left">
            <div class="w-full flex flex-col gap-y-4 items-start sm:items-center px-3">
                <div class="shrink-0">
                    <LogoMomin />
                </div>
                <h1 class="color-black text-xl font-bold antialiased font">Fill Up The Form</h1>
            </div>

            <form class="w-full flex flex-col" @submit.prevent="showSingleStudentData">

                <div class="flex flex-wrap justify-between items-center gap-y-2">
                   
                      <SelectInputSession :widthStyle="widthStyle" :value="student.session" :input="sessionList" @hello="sessionChanged"/>
                      <span v-if="!$v.student.session.required && $v.student.session.$dirty" class="error pb-3">*Session is required</span>
                    

                    
                      <SelectInputExamName :widthStyle="widthStyle" :value="student.exam_name" :input="examsList" @hello="examChanged"/>
                      <span v-if="!$v.student.exam_name.required && $v.student.exam_name.$dirty" class="error pb-3">*Exam Name is required</span>
                    
                    
                   
                      <SelectInputGroup :widthStyle="widthStyle" :value="student.group" :input="groupList" @hello="groupChanged"/>
                      <span v-if="!$v.student.group.required && $v.student.group.$dirty" class="error pb-3">*Group is required</span>
                   

                </div>

                <div class="pb-4">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                      Roll No.
                  </label>
                  <input class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" type="text" placeholder="Roll Number" v-model="student.roll_number">
                </div>
                <span v-if="!$v.student.roll_number.required && $v.student.roll_number.$dirty" class="error pb-3">*Roll Number is required</span>
                
                <button
                  class="btn px-4 block rounded-lg py-4 font relative"
                  :disabled="is('postStudentInformation')"
                >
                  Submit
                  <span :class="{'load loading': is('postStudentInformation') }"></span>
                </button>
            </form>
            
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import LogoMomin from '~/components/shared/LogoMomin'
import SelectInputSession from "~/components/shared/Input/SelectInputSession";
import SelectInputGroup from "~/components/shared/Input/SelectInputGroup";
import SelectInputExamName from "~/components/shared/Input/SelectInputExamName";
import SelectInputClass from "~/components/shared/Input/SelectInputClass";

export default {
    layout: 'others',

    components: {
        LogoMomin,
        SelectInputSession,
        SelectInputGroup,
        SelectInputExamName,
        SelectInputClass
    },

     data() {

        return {

            student: {
              session : "",
              exam_name: "",
              roll_number: "",
              group: ""
            },

            widthStyle: true
            
            
        }
    },

    validations: {

            student: {
                session: {
                    required
                },
                exam_name: {
                    required
                },
                group: {
                    required
                },
                roll_number: {
                    required
                }
            }
        },

    computed: {
      ...mapState(["session","exams","group"]),
      ...mapGetters(["is","isError"]),

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

      examsList() {
          let obj = {}
          obj.name = "Exam Name"
          obj.options = []

          if (this.exams && this.exams.length) {
            this.exams.forEach(item => {
              let ob = {}
              ob.name = item;
              ob.value = item;
              obj.options.push(ob);
            })  
          }
          return obj;
        },

      groupList() {
          let obj = {}
          obj.name = "Group"
          obj.options = []

          if (this.group && this.group.length) {
            this.group.forEach(item => {
              let ob = {}
              ob.name = item;
              ob.value = item;
              obj.options.push(ob);
            })  
          }
          return obj;
      } 
    },

    methods: {
      ...mapActions(["getSession","getExams","getGroup","postStudentInformation"]),

      sessionChanged(value) {
        console.log(`Class Changed value ${value}`)
        this.student.session = value;
        console.log(this.student.session);
      },

      examChanged(value) {
        console.log(`Class Changed value ${value}`)
        this.student.exam_name = value;
        console.log(this.student.exam_name);
      },

      groupChanged(value) {
        console.log(`Class Changed value ${value}`)
        this.student.group = value;
        console.log(this.student.group);
      },

      async showSingleStudentData() {
        this.$v.$touch();
        if (this.$v.student.session.$anyError == false && this.$v.student.group.$anyError == false && this.$v.student.exam_name.$anyError == false && this.$v.student.roll_number.$anyError == false) {
          await this.postStudentInformation(this.student);
          this.$router.push({ path: "/student/show-student-info" , query: this.student });
        }
        
        
      }
    },

    mounted() {
      this.getSession();
      this.getExams();
      this.getGroup();
      this.postStudentInformation();
    }
}
</script>

<style>

</style>