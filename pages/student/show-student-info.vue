<template>
  <div class="sm:flex my-8 justify-center items-center bg-white">
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
          <h3 class="text-lg font-semibold">Academic Transcript</h3>
        </div>
      </div>

      <!-- ..................................................................................... Student Info ............................................................. -->

      <div class="p-4">
        <div class="bg-color-white grid grid-cols-1 sm:grid-cols-2 gap-x-6 p-6 border border-zinc-600 capitalize" v-if="singleStudentInfo && singleStudentInfo.student_info">
          
          <div>
            <!-- <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="font">Student Id</p>
              <p class="font" v-if="singleStudentInfo.student_info.ID">{{ singleStudentInfo.student_info.ID }}</p>
            </div> -->
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="text-sm">Student Name</p>
              <p class="text-sm" v-if="singleStudentInfo.student_info.first_name && singleStudentInfo.student_info.last_name">{{ singleStudentInfo.student_info.first_name }} {{ singleStudentInfo.student_info.last_name }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="text-sm">Student Roll</p>
              <p class="text-sm" v-if="singleStudentInfo.student_info.roll_number">{{ singleStudentInfo.student_info.roll_number }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="text-sm">Date Of Birth</p>
              <p class="text-sm" v-if="singleStudentInfo.student_info.date_of_birth">{{ birthDate }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2 capitalize">
              <p class="text-sm">Examnee Type</p>
              <p class="text-sm">{{ singleStudentInfo.student_info.type_of_student }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="text-sm">Session</p>
              <p class="text-sm" v-if="singleStudentInfo.student_info.session">{{ singleStudentInfo.student_info.session }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="text-sm">Group</p>
              <p class="text-sm" v-if="singleStudentInfo.student_info.group">{{ singleStudentInfo.student_info.group }}</p>
            </div>
          </div>


          <div>
            
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="text-sm">Father's Name</p>
              <p class="text-sm" v-if="singleStudentInfo.student_info.father_name">{{ singleStudentInfo.student_info.father_name }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="text-sm">Mother's Name</p>
              <p class="text-sm" v-if="singleStudentInfo.student_info.mother_name">{{ singleStudentInfo.student_info.mother_name }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="text-sm">Class</p>
              <p class="text-sm" v-if="singleStudentInfo.student_info.class">{{ singleStudentInfo.student_info.class.toUpperCase() }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="text-sm">Grade Point</p>
              <p class="text-sm font-bold" v-if="singleStudentInfo.gpa">{{ singleStudentInfo.gpa.grade_point }}</p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-color-info mb-2">
              <p class="text-sm">Total Marks</p>
              <p class="text-sm font-bold" v-if="singleStudentInfo.gpa">{{ totalMarks }}</p>
            </div>
          </div>
        </div>
      </div>
      

      <div class="p-6 sm:shadow-xm" v-if="singleStudentInfo && singleStudentInfo.mark_table && singleStudentInfo.mark_table.length"> 
        <vue-good-table
        :columns="columns"
        :rows="fullTable" 
        :search-options="{
            enabled: false
        }"
        :sort-options="{
            enabled: false,
        }"
        styleClass="vgt-table condensed">
        >
        </vue-good-table>
      </div> 
      <div v-else class="py-4">
        <p > No Result found </p>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import LogoMomin from "~/components/shared/LogoMomin"
import moment from 'moment'
export default {
  layout: 'others',

  components: {
    LogoMomin,
    
  },

  data() {
    return {
      columns: [
        {
            label: "Subject",
            field: 'name',
        },
        {
            label: "CQ Marks",
            field: "cq",
            type: 'number',
        },
        {
            label: "MCQ Marks",
            field: "mcq",
            type: 'number',
        },
        {
            label: "Practical Marks",
            field: "practical",
            type: 'number',
        },
        {
            label: "Total Marks",
            field: "total_mark",
            type: 'number'
        },
        {
          label: "Grade Point",
          field: "grade_point",
          type: 'number'
        },  
        {
          label: "Grade",
          field: "grade",
          type: 'number'
        }, 
      ],
    }
  },

  computed: {
    ...mapState(["singleStudentInfo"]),

    birthDate() {
      if(this.singleStudentInfo && this.singleStudentInfo.student_info && this.singleStudentInfo.student_info.date_of_birth) {
        return moment(this.singleStudentInfo.student_info.date_of_birth).format("MMMM Do YYYY")
      }
      
    },

    fullTable() {
      let arr = []
      let data = this.singleStudentInfo.mark_table;
      if (data && data.length) {
          data.map(item => {
            let obj = {}
            obj.cq = item.cq
            obj.name = item.name
            obj.mcq = item.mcq
            obj.practical = item.practical
            obj.total_mark = item.total_mark
            obj.grade_point = item.grade_point
            obj.grade = item.grade
            arr.push(obj)
          })
      } return arr
    },

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
    console.log('this.$route :>> ', typeof(this.$route.query.roll_number));
    if(this.$route && this.$route.query) this.postStudentInformation({
      session: this.$route.query.session,
      exam_name: this.$route.query.exam_name,
      roll_number: parseInt(this.$route.query.roll_number),
      group: this.$route.query.group
    });
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