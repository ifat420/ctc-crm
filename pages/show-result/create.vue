<template>
  <div>
    <div class="">
      <h2 class="text-3xl font-medium">Create Resultt</h2>
      <div class="">
        
  
        <div class="mt-6">
          
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
      <div>
    <label for="session" class="text-sm"> Session </label>
    <div class="flex flex-col lg:flex-row">
        <div class="relative">
        <select
            v-model="student.session"
            @blur="$v.student.session.$touch()"
            class="
            appearance-none
            block
            w-full
            px-4
            py-3
            mt-4
            rounded-md
            shadow-gbtn
            placeholder-gray-400
            focus:outline-none focus:ring-primary focus:border-primary
            text-sm
            hover:cursor-pointer
            "
            aria-label="Default select example"

            :class="{
        'border border-red-500':
            $v.student.session.$dirty &&
            $v.student.session.$invalid,
        }"
        >
        <option value="">Select Session</option>
            <option v-for="(item, index) in sessionList.options" :key="index" :value="item.value">{{ item.name }}</option>
            
        </select>
        <DownArrow class="absolute w-auto h-auto top-9 right-4" />
        </div>
    </div>
    <p
        v-if="!$v.student.session.required && $v.student.session.$dirty"
        class="text-red-500 text-xs mt-2"
    >
        Session is required.
    </p>
      </div>

      <div>
    <label for="exam_name" class="text-sm"> Exam Name </label>
    <div class="flex flex-col lg:flex-row">
        <div class="relative">
        <select
            v-model="student.exam_name"
            @blur="$v.student.exam_name.$touch()"
            class="
            appearance-none
            block
            w-full
            px-4
            py-3
            mt-4
            rounded-md
            shadow-gbtn
            placeholder-gray-400
            focus:outline-none focus:ring-primary focus:border-primary
            text-sm
            hover:cursor-pointer
            "
            aria-label="Default select example"

            :class="{
        'border border-red-500':
            $v.student.exam_name.$dirty &&
            $v.student.exam_name.$invalid,
        }"
        >
        <option value="">Select Exam</option>
            <option v-for="(item, index) in examName.options" :key="index" :value="item.value">{{ item.name }}</option>
            
        </select>
        <DownArrow class="absolute w-auto h-auto top-9 right-4" />
        </div>
    </div>
    <p
        v-if="!$v.student.exam_name.required && $v.student.exam_name.$dirty"
        class="text-red-500 text-xs mt-2"
    >
        Exam Name is required.
    </p>
      </div>
    
        
      </div>

                <div v-if="hasSuccess && aSubject && aSubject.message" class="pb-3 px-10">
                    <h1 class="font success">{{ aSubject.message }}</h1>
                </div>

                <div v-if="isError('postCreateExam')  && isError('postCreateExam').has_error" class="pt-3">
                    <h1 class="font text-red-600"> {{ isError('postCreateExam').error }} </h1>
                </div>



                <hr class="my-8" />

      <button
      @click.prevent="showAll"
      class="
        inline-flex
        justify-center
        items-center
        py-3
        px-16
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
    <IconSpinAnimation v-if="is('postResult')" />
      Search
    </button>

    <button
      @click.prevent="resetAll"
      class="
        inline-flex
        justify-center
        items-center
        py-3
        px-16
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
    <!-- <IconSpinAnimation v-if="is('postResult')" /> -->
      Reset
    </button>

            

        </div>

        
      </div>
    </div>

    <div class=" flex flex-col"  v-if="result.rows && result.rows.length && showButton">
      <div class="-my-2 sm:-mx-6 lg:-mx-8 p-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden p-8 bg-color-whiteTwo sm:rounded-lg"
          >
            
            
            

            <div class="mx-8 my-8 rounded-lg bg-white shadow-lg">
              <div class="my-8 bg-white mx-6" >
                <div class="p-6 sm:shadow-xm">
                    <div> 
                        <vue-good-table
                        :columns="columns"
                        :rows="computedResult" 
                        :search-options="{
                            enabled: true
                        }"
                        styleClass="vgt-table condensed">
                        >

                        <template slot="table-row" slot-scope="props">

                          <span v-if="props.column.field == 'view'">
                            
                                <button class="myButton" style="background-color: green; color: white; padding: 7px 10px; border: none; border-radius: 5px;" @click="viewResult(props.row)">
                                    Details
                                </button>
                           
                        </span>

                          <span v-else>{{props.formattedRow[props.column.field]}}</span> 
                      </template>


                        </vue-good-table>

                        <paginate
                            :page-count= "totalPages"
                            :click-handler="changePageNum"
                            v-model="page"
                            :prev-text="'<'"
                            :next-text="'>'"
                            :container-class="'pagination'"
                            :page-class="'page-item'">
                        </paginate>
                    </div> 
                </div>
            </div>
          </div>

           

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'

import DownArrow from "~/components/Icons/DownArrow";
import IconSpinAnimation from "~/components/SpinAnimaiton";


export default {
  components: {
    DownArrow,
    IconSpinAnimation
  },

  data() {
    return {
      
      columns: [
        {
            
            label: "Name",
            field: 'name',
            width: '100px'
        },
        {
            label: "Roll Number",
            field: "roll_number",
        },
        {
            label: "Total Marks",
            field: "total_mark",
        },
        {
            label: "Grade Point",
            field: "grade_point"
        },
        {
            label: "Grade",
            field: "grade"
        },
        {
            label: "Failed Subjects",
            field: "fail_subjects"
        },
        {
            label: "View",
            field: "view"
        }
      ],
      page: 1,
      limit: 20,
      active: false,
      showButton: false,
      resultData: [],
      student: {
        session: "",
        exam_name: "",
        page: 1,
        limit: 10
      },
      currentPage: 1,
      mainContents: {
        folderName: "search-result",
        compName: "search-result",
        topicName: "Search Result",
      },

      shortListedData: this.computedTableData,

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
      },
      startLoading: false
    }
  },

  validations: {

            student: {
                session: {
                    required
                },
                exam_name: {
                    required
                }
            }
        },

  mounted(){
				this.checkedValue = "1";
			},

  computed: {
    ...mapState(["session","group","class","result"]),
    ...mapGetters(["is","isError"]),

    computedLimit() {
            console.log(this.result.limit);
            return this.result.limit;
        },

    computedPage() {
        console.log(this.result.page);
        return this.result.page;
    },

    totalPages() {
        const totalPages = Math.ceil(this.result.total_rows / 2);
        return totalPages;
    },

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

    computedResult() {
      let arr = [];
      let data = this.result.rows;
      if (data && data.length) {
          data.map(item => {
            let obj = {}
            obj.roll_number = item.roll_number
            obj.name = this.capitalizeFirstLetter(item.first_name)+ ' ' + this.capitalizeFirstLetter(item.last_name)
            obj.total_mark = item.total_mark
            obj.grade_point = item.grade_point
            obj.grade = item.grade
            obj.fail_subjects = item.fail_subjects
            obj.view = item.view
            obj.exam_id = item.exam_id

            arr.push(obj)
          })
      } return arr
    }

  },

  methods: {
    ...mapActions(["getSession","getGroup","getClass","postResult"]),

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    goToPage() {
      console.log("Working");
      console.log("this.currentPage :>> ", this.currentPage);
      this.$router.push({
        path: "/show-result/subjectwise-statistics",
        query: { page: this.currentPage },
      });
    },

    sessionChanged(value) {
      console.log(`Class Changed value ${value}`)
      this.student.session = value;
      console.log(this.student.session);
    },

    examNameChanged(value) {
        console.log(`Exam Changed value ${value}`);
        this.student.exam_name = value;
    },

    async viewResult(value) {
        this.$router.push({ path: "/show-result/single-student-result", query: { roll_number: value.roll_number, exam_id: value.exam_id } });
    },

    async fetchData(pageNum) {
      try {
        console.log('running :>> ');
        let query = {}
        query.session = this.$route.query.session ? this.$route.query.session : this.student.session
        query.exam_name = this.$route.query.exam_name ? this.$route.query.exam_name : this.student.exam_name
        query.limit = 2
        if(pageNum) {
          query.page = pageNum
        }else {
          query.page = this.$route.query.page ? this.$route.query.page : 1
        }
        
        await this.postResult(query)
        this.$router.push({ path: '/show-result/create', query: query })
      } catch (error) {
        console.log('error :>> ', error);
      }
    },

    showAll() {
      this.$v.$touch();
        if (this.$v.student.session.$anyError == false && this.$v.student.exam_name.$anyError == false) {
                this.fetchData()
                
            }
      
      
      this.showButton = true;
      
    },

    resetAll() {
      this.startLoading = true;
      this.student.session = ""
      this.student.exam_name = ""
      this.resultData.length=0;
      this.showButton = false;
      this.startLoading = false;
      // this.computedResult = []
      this.$router.push('/show-result/create');
    },

    async changePageNum(pageNum) {
        try {
            this.fetchData(pageNum)
            // this.$router.push({ path: '/show-result/result-details', query: { page: pageNum } })
        } catch (error) {
            console.log('error :>> ', error);
        }

    },

    fullName(data) {
        return `${data.first_name} ${data.last_name}`
    }
  },

  async mounted() {
    this.getSession();
    if(this.$route.query && this.$route.query.session) {
      this.fetchData()
    }
    // this.postResult();

    // if(this.$route && this.$route.query && this.$route.query.page) {
    //     this.page = parseInt(this.$route.query.page);
    //     await this.postResult({ page: this.$route.query.page, limit: this.limit });
    // }else {
    //     await this.postResult({ page: this.page, limit: this.limit });
    // }
    
    // this.computedLimit;
    // this.computedPage;
    
    // if (this.$route && this.$route.query && this.$route.query.page) {
    //   this.currentPage = this.$route.query.page;
    // }
  },
};
</script>
<style lang="scss" scoped>

    .active {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.0589711);
    }

    .width {
        width: 100%;
    }

    .width-main {
        width: 350px;
        max-width: 100%;
    }

    .widthStyle {
        display: block;
        width: 100%;
    }

    .widthSelect {
        width: 100%;
    }
</style>