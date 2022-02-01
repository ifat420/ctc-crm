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

                <div class="flex flex-wrap justify-between items-center ">
                    <SelectInputSession :widthStyle="widthStyle" :value="student.session" :input="sessionList" @hello="sessionChanged"/>
                    <SelectInputExamName :widthStyle="widthStyle" :value="student.exam_name" :input="examsList" @hello="examChanged"/>
                    <SelectInputGroup :widthStyle="widthStyle" :value="student.group" :input="groupList" @hello="groupChanged"/>
                </div>

                <div class="pb-4">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                      Roll No.
                  </label>
                  <input class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" type="text" placeholder="Roll Number" v-model="student.roll_number">
                </div>
                
                <button
                  class="
                    bg-color-black
                    color-white
                    block
                    p-3
                    font
                    border-radius-button
                  "
                >
                  Submit
                </button>
            </form>
            
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
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

    computed: {
      ...mapState(["session","exams","group"]),

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
        console.log(this.student);
        this.postStudentInformation(this.student);
        this.$router.push({ path: "/student/show-student-info" , query: this.student});
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