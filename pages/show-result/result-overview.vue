<template>
    <div>
        <div class="w-full p-8 box-shadow-dashboard bg-color-whiteTwo">
            <!-- <p class="font pb-4"><span class="color-gray">{{ content.folderName }} /</span> <span class="color-black"></span></p> -->
            <h3 class="font color-black text-xl font-bold antialiased">Half Yearly Exam Result</h3>
            <h3 class="font color-black text-md font-medium antialiased">2020-21</h3>
        </div>
        
      <!-- SESSION & EXAM-NAME -->
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


        <div class="w-full p-8 box-shadow-dashboard bg-color-whiteTwo" v-if="createResultOverviewResponse && createResultOverviewResponse.all_pass">
            
            <h3 class="font color-black text-xl font-bold antialiased mb-4">Students who passed all exams</h3>
            <div>
              <div class="grid grid-cols-8 gap-6 p-6 box-shadow-dashboard" v-if="createResultOverviewResponse && createResultOverviewResponse.all_pass && createResultOverviewResponse.all_pass.length">
                <template>
                  <div v-for="(data,index) in createResultOverviewResponse.all_pass" :key="index">
                    <p>{{ data.roll_number}}({{ data.grade_point.toFixed(2) }})</p>
                  </div>
                </template>
              </div>
              <p v-else class="py-4"> No Result found </p>
            </div>
        </div>

        <div class="w-full p-8 box-shadow-dashboard bg-color-whiteTwo" v-if="createResultOverviewResponse && createResultOverviewResponse.all_fail">
            <h3 class="font color-black text-xl font-bold antialiased mb-4">Students who failed</h3>
            <div>
              <div class="flex flex-wrap flex-1 gap-6 p-6 box-shadow-dashboard"  v-if="createResultOverviewResponse && createResultOverviewResponse.all_fail && createResultOverviewResponse.all_fail.length ">
                <template>
                  <div v-for="(data,index) in createResultOverviewResponse.all_fail" :key="index">
                    <p>{{ data.roll_number}}({{ data.fail_subjects }})</p>
                  </div>
                </template>
              </div>
              <p v-else class="py-4"> No Result found </p>
            </div>
        </div>

          <div class="w-full p-8 box-shadow-dashboard bg-color-whiteTwo" v-if="createResultOverviewResponse && createResultOverviewResponse.top_five">
            <h3 class="font color-black text-xl font-bold antialiased">Top Five Students</h3>
            <div class=" my-8 rounded-lg bg-white shadow-lg" v-if="createResultOverviewResponse && createResultOverviewResponse.top_five && createResultOverviewResponse.top_five.length">
              <div class="my-8 bg-white mx-6" >
                <div class="p-6 sm:shadow-xm">
                    <div> 
                        <vue-good-table
                        :columns="columns"
                        :rows="computedFive" 
                        :search-options="{
                            enabled: true
                        }"
                        styleClass="vgt-table condensed">
                        >
                        </vue-good-table>
                    </div> 
                </div>
              </div>
            </div>
            <div v-else class="py-4">
              <p > No Result found </p>
            </div>
          </div>

    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength, email, alpha } from 'vuelidate/lib/validators'

import SelectInputExamName from '~/components/shared/Input/SelectInputExamName'
import SelectInputSession from '~/components/shared/Input/SelectInputSession'

export default {
  components: {
    SelectInputExamName,
    SelectInputSession
  },

  data() {
    return {
      columns: [
        {
            label: "Name",
            field: 'name',  
        },
        {
            label: "Roll",
            field: 'roll_number',
        },
        {
            label: "Grade Point",
            field: "grade_point",
            type: 'number',
        },
        {
            label: "Total Marks",
            field: "total_mark",
            type: 'number'
        }   
      ],
      
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
          session: ""
      }
    }
  },

  validations: {
        exam: {
            exam_name: {
                required
            },
            session: {
                required
            }
        }
    },


  computed: {
    ...mapState(["createResultOverviewResponse", "session"]),
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

    computedFive() {
      let arr = []
      let data = this.createResultOverviewResponse.top_five;
      if (data && data.length) {
          data.map(item => {
            let obj = {}
            obj.roll_number = item.roll_number
            obj.name = this.capitalizeFirstLetter(item.first_name)+ ' ' + this.capitalizeFirstLetter(item.last_name)
            obj.total_mark = item.total_mark
            obj.grade_point = item.grade_point
            arr.push(obj)
          })
      } return arr
    }
    
  },


  methods: {
    ...mapActions(["createResultOverview", "getSession"]),

    examNameChanged(value) {
        console.log(`Exam Changed value ${value}`);
        this.exam.exam_name = value;
    },

    sessionChanged(value) {
        console.log(`Session Changed value ${value}`);
        this.exam.session = value;
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    async uploadAExam() {
      this.$v.$touch();
      if (this.$v.exam.$anyError == false )
          {
            await this.createResultOverview(this.exam);
            this.hasSuccess = true;
          }
      this.hasSuccess = false;
    }
  },


  async mounted() {
    await this.getSession();
    console.log(this.$route.query);
    if(this.$route.query && this.$route.query.session && this.$route.query.exam_name) {
      await this.createResultOverview(this.$route.query);
    }
    
   
  }
}
</script>

<style>

</style>