<template>
  <div>
    <div class="">
      <ShowUrl :content="mainContents" />
      <div class="px-6 py-6 bg-color-whiteTwo mt-6 ml-6 mr-6 box-shadow-dashboard sm:rounded-lg">
        
  
        <div class="p-10">  
            <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                <div class="pb-4 sm:pb-0">
                    <SelectInputExamName :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="student.exam_name" :input="examName" @hello="examNameChanged"/>
                    <span v-if="!$v.student.exam_name.required && $v.student.exam_name.$dirty" class="error pb-4">*Exam Name is required</span>
                </div>
                <div class="pb-4 sm:pb-0">
                    <SelectInputSession :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="student.session" :input="sessionList" @hello="sessionChanged"/>
                    <span v-if="!$v.student.session.required && $v.student.session.$dirty" class="error pb-4">*Session is required</span>
                </div>
            </div> 
        </div>

        <div class="flex items-center justify-start gap-x-4 px-10">
          <button
            class="btn block rounded-lg font relative"
            :disabled="is('postResult')"
            @click.prevent="showAll"
          >
            Search
            <span :class="{'load loading': is('postResult') }"></span>
          </button>
          <button
            class="btn block rounded-lg font relative"
            :disabled="startLoading"
            @click.prevent="resetAll"
          >
            Reset
            <span :class="{'load loading': startLoading }"></span>
          </button>
        </div>
      </div>
    </div>

    <div class=" flex flex-col">
      <div class="-my-2 sm:-mx-6 lg:-mx-8 p-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden p-8 bg-color-whiteTwo sm:rounded-lg"
          >
            <div class="flex justify-between pb-10">
              <h4 class="pb-4 font">Search Result</h4>
              <div class="flex gap-x-4" v-if="showButton">
                <button
                  class="
                    btn
                    flex
                    items-center
                    gap-x-6
                    px-4
                    py-2
                    font
                    border-radius-button
                  "
                >
                  Save
                </button>
                <button
                  class="
                    btn
                    flex
                    items-center
                    gap-x-6
                    px-4
                    py-2
                    font
                    border-radius-button
                  "
                >
                  Print
                </button>
              </div>
            </div>
            
            

            <div class="mx-8 my-8 rounded-lg bg-white shadow-lg" v-if="result.rows && result.rows.length">
              <div class="my-8 bg-white mx-6" >
                <div class="p-6 sm:shadow-xm">
                    <div> 
                        <vue-good-table
                        :columns="columns"
                        :rows="result.rows" 
                        :search-options="{
                            enabled: true
                        }"
                        >

                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'name'">
                              <span style="text-transform: capitalize;" :title="fullName(props.row)">{{ fullName(props.row) | truncate(10) }}</span>
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

import ShowUrl from "~/components/shared/ShowUrl";
import SelectInputSession from "~/components/shared/Input/SelectInputSession";
import SelectInputExamName from "~/components/shared/Input/SelectInputExamName";


export default {
  components: {
    ShowUrl,
    SelectInputSession,
    SelectInputExamName
  },

  data() {
    return {
      
      columns: [
        {
            
            label: "Name",
            field: 'name',
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
    }

  },

  methods: {
    ...mapActions(["getSession","getGroup","getClass","postResult"]),

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
        this.$router.push({ path: '/show-result/result-details', query: query })
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