<template>
  <div>
    <div class="bg-color-body">
      <ShowUrl :content="mainContents" />
      <div class="px-6 py-6 bg-color-whiteTwo mt-6 ml-6 mr-6">
        <div class="flex flex-wrap justify-between items-center pb-4">
            <div>
              <SelectInputSession :value="student.session" :input="sessionList" @hello="sessionChanged"/>
              <span v-if="!$v.student.session.required && $v.student.session.$dirty" class="error">*Session is required</span>
            </div>
            <div>
              <SelectInputClass :value="student.class" :input="classList" @hello="classChanged"/>
              <span v-if="!$v.student.class.required && $v.student.class.$dirty" class="error">*Class is required</span>
            </div>
            <div>
              <SelectInputGroup :value="student.group" :input="groupList" @hello="groupChanged"/>
              <span v-if="!$v.student.group.required && $v.student.group.$dirty" class="error">*Group is required</span>
            </div>
            
            <div class="">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    Exam Name
                </label>
                <div class="mb-3 relative width-main w-full" >
                    <select class="form-select appearance-none
                    capitalize
                    width
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                    v-model="student.exam_name"
                    >
                        <option value="">select Exam</option>
                        <option v-for="(option,index) in examNames" :key="index" :value="option.value">{{option.name}}</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                <span v-if="!$v.student.exam_name.required && $v.student.exam_name.$dirty" class="error">*Exam Name is required</span>
            </div>
        </div>
  
        <div>
          <div class="flex  justify-start gap-x-4 pt-2 pb-6">
            <div v-for="(radio, index) in radios" :key="index">
              <div class="form-check">
                <input
                  class="
                    form-check-input
                    rounded-full
                    h-4
                    w-4
                    border border-gray-300
                    bg-white
                    checked:bg-blue-600 checked:border-blue-600
                    focus:outline-none
                    transition
                    duration-200
                    mt-1
                    align-top
                    bg-no-repeat bg-center bg-contain
                    float-left
                    mr-2
                    cursor-pointer
                  "
                  type="radio"
                  name="flexRadioDefault"
                  :value="radio.value"
                  :id="radio.id"
                  v-model="student.search_type"
                  
                />
                <label
                  class="form-check-label capitalize tracking-wide font inline-block text-gray-800"
                  :for="radio.id"
                >
                  {{ radio.name }}
                </label>
              </div>
            </div>
          </div>
          <span v-if="!$v.student.search_type.required && $v.student.search_type.$dirty" class="error">*Search Type is required</span>
        </div>

        <div class="flex items-center justify-start gap-x-4">
          <button
            class="
              bg-color-black
              color-white
              flex
              items-center
              gap-x-6
              px-4
              py-2
              font
              border-radius-button
            "
            @click.prevent="showAll"
          >
            Search
          </button>
          <button
            class="
              bg-color-black
              color-white
              flex
              items-center
              gap-x-6
              px-4
              py-2
              font
              border-radius-button
            "
            @click.prevent="resetAll"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <div class="bg-color-gray flex flex-col">
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
                    bg-color-black
                    color-white
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
                    bg-color-black
                    color-white
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
            
            

            <div>
              <div class="grid grid-cols-8 gap-6 p-6 box-shadow-dashboard" >
                <template v-if="result && result.length">
                  <div v-for="(data,index) in computedResult" :key="index">
                    <p>{{ data.roll_number}}({{ data.grade_point.toFixed(2) }})</p>
                  </div>
                </template>

                <p v-else> No Result found </p>
              </div>
            </div>

            <!-- <paginate
              :page-count="5"
              :page-range="4"
              v-model="currentPage"
              :click-handler="goToPage"
              :prev-text="'Prev'"
              :next-text="'Next'"
              :container-class="'pagination'"
              :page-class="'page-item'"
            >
            </paginate> -->
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
import SelectInputGroup from "~/components/shared/Input/SelectInputGroup";
import SelectInputExamName from "~/components/shared/Input/SelectInputExamName";
import SelectInputClass from "~/components/shared/Input/SelectInputClass";

export default {
  components: {
    ShowUrl,
    SelectInputSession,
    SelectInputGroup,
    SelectInputExamName,
    SelectInputClass
  },

  data() {
    return {
      
      dummydata: [
    {
        "roll_number": "10001",
        "gread_point": 1.09
    },
    {
        "roll_number": "10002",
        "gread_point": 2
    },
    {
        "roll_number": "10002",
        "gread_point": 2
    },{
        "roll_number": "10002",
        "gread_point": 2
    },{
        "roll_number": "10002",
        "gread_point": 2
    },{
        "roll_number": "10002",
        "gread_point": 2
    },{
        "roll_number": "10002",
        "gread_point": 2
    },{
        "roll_number": "10002",
        "gread_point": 2
    },{
        "roll_number": "10002",
        "gread_point": 2
    },{
        "roll_number": "10002",
        "gread_point": 2
    },
    {
        "roll_number": "10002",
        "gread_point": 2
    },
    {
        "roll_number": "10002",
        "gread_point": 2
    },
    {
        "roll_number": "10002",
        "gread_point": 5
    }
],
  
      active: false,
      showButton: false,
      resultData: [],
      student: {
        session: "",
        exam_name: "",
        group: "",
        class: "",
        search_type: "allpass"
      },
      currentPage: 1,
      mainContents: {
        folderName: "search-result",
        compName: "search-result",
        topicName: "Search Result",
      },

      shortListedData: this.computedTableData,
      radios: [
        { id: 1, name: "all pass" , value: "allpass"},
        { id: 2, name: "one subject fail" , value: "onefail"},
        { id: 3, name: "two subject fail" , value: "twofail"},
        { id: 4, name: "three subject fail" , value: "threefail"},
        { id: 5, name: "four subject fail" , value: "fourfail"},
        { id: 6, name: "five subject fail" , value: "fivefail"},
      ],

      examNames:[
              {
                  value: "test",
                  name: "Test"
              },
              {
                  value: "half-yearly",
                  name: "Half Yearly"
              }
          ],
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
                class: {
                  required
                },
                search_type: {
                  required
                }
            }
        },

  mounted(){
				this.checkedValue = "1";
			},

  computed: {
    ...mapState(["session","group","class","result"]),
    // ...mapGetters(["getSessionList"]),



    computedResult() {
      this.active = true;
      return this.resultData = this.result;
    },

    // computedTableData() {
    //   if (!this.people) return [];
    //   else {
    //     const firstIndex = (this.currentPage - 1) * 4;
    //     const lastIndex = this.currentPage * 4;
    //     return this.people.slice(firstIndex, lastIndex);
    //   }
    // },

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

    groupList() {
      let obj = {}
      obj.name = "Group"
      obj.options = []

      if(this.group && this.group.length) {
        this.group.forEach(item => {
          let ob = {}
          ob.name = item;
          ob.value = item;
          obj.options.push(ob);
        })
      }

      return obj;
    },

    classList() {
      let obj = {}
      obj.name = "Class"
      obj.options = []

      if (this.class && this.class.length) {
        this.class.forEach(item => {
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
    ...mapActions(["getSession","getGroup","getClass","postResult"]),

    goToPage() {
      console.log("Working");
      console.log("this.currentPage :>> ", this.currentPage);
      this.$router.push({
        path: "/show-result/subjectwise-statistics",
        query: { page: this.currentPage },
      });
    },

    classChanged(value) {
      console.log(`Class Changed value ${value}`)
      this.student.class = value;
      console.log(this.student.class);
    },

    groupChanged(value) {
      console.log(`Class Changed value ${value}`)
      this.student.group = value;
      console.log(this.student.group);
    },

    sessionChanged(value) {
      console.log(`Class Changed value ${value}`)
      this.student.session = value;
      console.log(this.student.session);
    },

    async showAll() {
      this.$v.$touch();
        if (this.$v.student.session.$anyError == false && this.$v.student.group.$anyError == false && this.$v.student.exam_name.$anyError == false && this.$v.student.class.$anyError == false && this.$v.student.search_type.$anyError == false) {
                await this.postResult(this.student);
            }
      
      
      this.showButton = true;
      
    },

    resetAll() {
      this.student.session = ""
      this.student.class = ""
      this.student.exam_name = ""
      this.student.group = ""
      this.student.search_type = "allpass"
      this.resultData.length=0;
      this.showButton = false;
    }
  },

  mounted() {
    this.getSession();
    this.getGroup();
    this.getClass();
    this.postResult();
    console.log("this.$route :>> ", this.$route);
    if (this.$route && this.$route.query && this.$route.query.page) {
      this.currentPage = this.$route.query.page;
    }
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
        width: 250px;
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