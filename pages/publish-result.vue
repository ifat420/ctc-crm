<template>
    <div class="">
        <ShowUrl :content="mainContents"/>
        <div class="px-6 py-6 bg-color-whiteTwo m-6 box-shadow-dashboard sm:rounded-lg">
            <form
                class="w-full flex flex-col"
                @submit.prevent="uploadPublishInfo"
            >
                <div class="flex flex-wrap gap-6 justify-between items-center">
                    <div>
                        <SelectInputSession
                        :widthStyle="widthStyle"
                        :value="student.session"
                        :input="sessionList"
                        @hello="sessionChanged"
                        />
                        <span v-if="!$v.student.session.required && $v.student.session.$dirty" class="error">*Session is required</span>
                    </div>
                    <div>
                        <SelectInputGroup
                        :widthStyle="widthStyle"
                        :value="student.group"
                        :input="groupList"
                        @hello="groupChanged"
                        />
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

                <div v-if="isError('postPublishResult')  && isError('postPublishResult').has_error" class="pt-3">
                    <h1 class="font text-red-600"> {{ isError('postPublishResult').error }} </h1>
                </div>

                <div class="flex items-center justify-start gap-x-4 pt-4">
                    <button
                    class="btn block rounded-lg font relative"
                    :disabled="is('postPublishResult')"
                    >
                    Publish Result
                    <span :class="{'load loading': is('postPublishResult') }"></span>
                    </button>
                </div>
            </form>
        </div>
        
        <!-- ............................... Table ............................... -->

        <div class=" my-8  bg-white mx-6" v-if="publishedResultResponse && publishedResultResponse.length &&  isError('postPublishResult').has_error == false">
            <div class="p-6 sm:shadow-xm">
                <div > 
                    <vue-good-table
                    :columns="columns"
                    :rows="publishedResultResponse" 
                    :search-options="{
                        enabled: true
                    }"
                    :pagination-options="{
                        enabled: true,
                        perPage: 5,
                        mode: 'pages'
                    }"
                    >
                    </vue-good-table>
                </div> 
            </div>
        </div>

    </div>

            
        
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'
import ShowUrl from '~/components/shared/ShowUrl'
import SelectInputSession from "~/components/shared/Input/SelectInputSession";
import SelectInputGroup from "~/components/shared/Input/SelectInputGroup";

export default {
    // layout: 'others',
    components: {
      ShowUrl,
      SelectInputSession,
      SelectInputGroup,
  },

  data() {
      return {
          tableHead: ["ID", "Last Updated", "Group", "Exam Name", "Session"],
          columns: [
                {
                    
                    label: "ID",
                    field: 'ID',
                    type: 'number'
                },
                {
                    label: "Published Date",
                    field: "UpdatedAt",
                },
                {
                    label: "Group",
                    field: "group",
                },
                {
                    label: "Exam Name",
                    field: "exam_name",
                },
                {
                    label: "Session",
                    field: "session"
                }
            ],
          mainContents: {
              folderName: "",
              compName: "publish-result",
              topicName: "Publish Result"
          },
          widthStyle: false,
          student: {
              session: "",
              exam_name: "",
              group: "",
          },
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
                }
            }
        },

  computed: {
      ...mapState(["session", "group", "publishResultResponse","publishedResultResponse"]),
      ...mapGetters(["is","isError"]),

      publishedTable() {
          console.log(this.publishedResultresponse);
          return this.publishedResultResponse;

      },

    sessionList() {
      let obj = {};
      obj.name = "Session";
      obj.options = [];

      if (this.session && this.session.length) {
        this.session.forEach((item) => {
          let ob = {};
          ob.name = item;
          ob.value = item;
          obj.options.push(ob);
        });
      }
      return obj;
    },

    groupList() {
      let obj = {};
      obj.name = "Group";
      obj.options = [];

      if (this.group && this.group.length) {
        this.group.forEach((item) => {
          let ob = {};
          ob.name = item;
          ob.value = item;
          obj.options.push(ob);
        });
      }
      return obj;
    }
  },

  methods: {
      
    ...mapActions(["getSession", "getGroup", "postPublishResult", "getPublishedResult"]),

    sessionChanged(value) {
      console.log(`Class Changed value ${value}`);
      this.student.session = value;
    },

    groupChanged(value) {
      console.log(`Class Changed value ${value}`);
      this.student.group = value;
    },

    async uploadPublishInfo() {
        this.$v.$touch();
        if (this.$v.student.session.$anyError == false && this.$v.student.group.$anyError == false && this.$v.student.exam_name.$anyError == false) {
                await this.postPublishResult(this.student);
                await this.getPublishedResult();
            }
        
        
    }
  },

  async mounted() {
    //   await this.$nextTick()
      this.getSession();
      this.getGroup();
    //   this.getPublishedResult();
     
      
  }

}
</script>

<style lang="scss" scoped>
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

    .bg-color-info {
      background-color: #F9FAFB;
  }

//   .noBorder{
//   border: 0;
// }
</style>