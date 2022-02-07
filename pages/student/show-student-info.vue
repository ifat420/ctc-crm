<template>
  <div class="flex my-8 justify-center items-center bg-white">
    <div class="shadow-lg">
      <div class="flex flex-col items-center justify-center gap-y-6">
        <div class="flex flex-col justify-center gap-y-4">
          <div class="flex justify-center">
            <LogoMomin />
          </div>
          <div class=" flex flex-col font items-center">
            <h1 class="text-lg font-bold">MUMINUNNESA GOVT WOMEN'S COLLEGE, MYMENSINGH</h1>
            <P>www.mummc.edu.bd</P>
          </div>
        </div>
        <div>
          <h3 class="font text-lg font-semibold">Academic Transcript</h3>
        </div>
      </div>

      <!-- ..................................................................................... Student Info ............................................................. -->

      <div class="p-4">
        <div class="bg-color-white grid grid-cols-1 sm:grid-cols-2 gap-x-6 p-6 border border-zinc-600 capitalize" v-if="singleStudentInfo && singleStudentInfo.student_info">
          
          <div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="font">Student Id</p>
              <p class="font" v-if="singleStudentInfo.student_info.ID">{{ singleStudentInfo.student_info.ID }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="font">Student Roll</p>
              <p class="font" v-if="singleStudentInfo.student_info.roll_number">{{ singleStudentInfo.student_info.roll_number }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2 capitalize">
              <p class="font">Exam Type</p>
              <p class="font">{{ studentExamName }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="font">Session</p>
              <p class="font" v-if="singleStudentInfo.student_info.session">{{ singleStudentInfo.student_info.session }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="font">Group</p>
              <p class="font" v-if="singleStudentInfo.student_info.group">{{ singleStudentInfo.student_info.group }}</p>
            </div>
          </div>


          <div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="font">Student Name</p>
              <p class="font" v-if="singleStudentInfo.student_info.first_name && singleStudentInfo.student_info.last_name">{{ singleStudentInfo.student_info.first_name }} {{ singleStudentInfo.student_info.last_name }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="font">Father's Name</p>
              <p class="font" v-if="singleStudentInfo.student_info.father_name">{{ singleStudentInfo.student_info.father_name }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="font">Mother's Name</p>
              <p class="font" v-if="singleStudentInfo.student_info.mohter_name">{{ singleStudentInfo.student_info.mohter_name }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="font">Class</p>
              <p class="font" v-if="singleStudentInfo.student_info.class">{{ singleStudentInfo.student_info.class }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="font">Fourth Subject</p>
              <p class="font" v-if="singleStudentInfo.student_info.forth_subject_name">{{ singleStudentInfo.student_info.forth_subject_name }}</p>
            </div>
          </div>
        </div>
      </div>
      

      <!-- ..................................................................................... Table .................................................................... -->

  
      <div class="p-6 sm:shadow-xm">
        <table class="w-full flex flex-row flex-no-wrap sm:bg-white sm:py-4 rounded-lg overflow-hidden  my-5">
              <thead  class="text-black">
                <tr class="bg-teal-400 flex flex-col flex-no wrap sm:table-row sm:rounded-none mb-2 sm:mb-0" v-for="(table,index) in tableSizeSmall" :key="index">
                  <th class="p-3 text-left border td-height" v-for="(head,index) in tableHead" :key="index">
                    {{ head }}
                  </th>
                </tr>
              </thead>



              <tbody class="flex-1 sm:flex-none" v-if="singleStudentInfo.mark_table">
                <tr v-for="(subject,index) in singleStudentInfo.mark_table" :key="index" class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 border">
                  <td class="border-grey-light border hover:bg-gray-100 p-3 td-height" >
                      {{ subject.code }}
                  </td>
                  <td class="border-grey-light border hover:bg-gray-100 p-3 td-height" >
                    {{ subject.name }}
                  </td>
                  <td class="border-grey-light border hover:bg-gray-100 p-3 td-height" >
                    100
                  </td>
                  <td class="border-grey-light border hover:bg-gray-100 p-3 td-height">
                    {{ subject.cq }}
                  </td>
                  <td  class="border-grey-light border hover:bg-gray-100 p-3 td-height">
                    {{ subject.mcq  }}
                  </td>
                  <td class="border-grey-light border hover:bg-gray-100 p-3 td-height">
                    {{ subject.practical }}
                  </td>
                  <td class="border-grey-light border hover:bg-gray-100 p-3 td-height">
                    {{ subject.total_mark }}
                  </td>
                  <td class="border-grey-light border hover:bg-gray-100 p-3 td-height">
                    {{ subject.grade }}
                  </td>
                  <td class="border-grey-light border hover:bg-gray-100 p-3 td-height" >
                    {{ subject.grade_point.toFixed(2)  }}
                  </td>
                </tr>


                <tr class="border-top flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  
                  <td colspan="2">Total Marks</td>
                  <td  class="px-4 py-1 whitespace-nowrap font color-black">{{ totalMarks }}</td>
                </tr>
                <tr class="noBorder flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  
                  <td colspan="2">GPA(Grade Point Average)</td>
                  <td  class="px-4 py-1 whitespace-nowrap font color-black ">{{ singleStudentInfo.gpa.grade_point }}</td>
                </tr>
                <tr class="noBorder flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 pb-6">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
               
                  <td colspan="2">LG(Letter Grade)</td>
                  <td  class="px-4 py-1  whitespace-nowrap font  color-black">{{ singleStudentInfo.gpa.grade }}</td>
                </tr>
                
              </tbody>
            </table>
      </div>


      

    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import LogoMomin from "~/components/shared/LogoMomin"
export default {
  layout: 'others',

  components: {
    LogoMomin
  },

  data() {
    return {
      tableHead: ["Subject Code", "Subjects", "Full Marks", "Creative" , "MCQ", "Practical", "Total", "LG", "GP"]
    }
  },

  computed: {
    ...mapState(["singleStudentInfo"]),

    tableSizeSmall(){
      if (this.singleStudentInfo.mark_table && this.singleStudentInfo.mark_table.length) {
        return this.singleStudentInfo.mark_table.length;
      }
    },
    
    studentExamName() {
      if (!this.singleStudentInfo && !(this.singleStudentInfo.mark_table || []).length ) return 
      console.log(this.singleStudentInfo.mark_table);
      return this.singleStudentInfo.mark_table[0].exam_name;
    },

    totalMarks() {
      if (!this.singleStudentInfo && !(this.singleStudentInfo.mark_table || []).length ) return 
      let total_marks = 0;
      this.singleStudentInfo.mark_table.forEach(mark => {
        total_marks += mark.total_mark;
      })
      return total_marks;
    }

  },

  methods: {
    ...mapActions(["postStudentInformation"]),

  },

  mounted() {
    console.log('this.$route :>> ', this.$route);
    if(this.$route && this.$route.query) this.postStudentInformation(this.$route.query);
  }
}
</script>

<style lang="scss" scoped>
  .bg-color-info {
      background-color: #F9FAFB;
  }

//   .noBorder{
//   border: 0;
// }

html,
  body {
    height: 100%;
  }

  @media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }

  td:not(:last-child) {
    border-bottom: 0;
  }

  .td-height {
    height: 50px;
  }

  th:not(:last-child) {
    border-bottom: 0;
  }

  tr {
    border: 0;
  }

  .border-top {
    border-top: 1px;
  }
</style>