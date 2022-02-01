<template>
    <div class=" bg-color-body">
        <ShowUrl :content="mainContents"/>
        <div class="px-6 py-6 bg-color-whiteTwo m-6">
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

                <div class="flex items-center justify-start gap-x-4 pt-4">
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
                    Publish Result
                    </button>
                </div>
            </form>
        </div>
        
        <!-- ............................... Table ............................... -->

        <div class="flex my-8 justify-center items-center bg-white mx-6">
            <div class="p-6 sm:shadow-xm">
                <table class="bg-color-white flex items-center sm:flex-col flex-no wrap sm:table-row sm:rounded-none mb-2 sm:mb-0">
                    <thead  class="text-black">
                        <tr class="bg-teal-400 flex flex-col flex-no wrap sm:table-row sm:rounded-none mb-2 sm:mb-0" v-for="(table,index) in tableSizeSmall" :key="index">
                            <th class="p-3 text-left border td-height" v-for="(head,index) in tableHead" :key="index">
                                {{ head }}
                            </th>
                        </tr>
                    </thead>



                    <tbody class="flex-1 sm:flex-none" v-if="publishedResultResponse && publishedResultResponse.length">
                        <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 border">
                            <td class="border-grey-light border hover:bg-gray-100 p-3 td-height" >
                                {{ publishedTable.ID }}
                            </td>
                            <td class="border-grey-light border hover:bg-gray-100 p-3 td-height" >
                                {{ publishedTable.UpdatedAt }}
                                
                            </td>
                            
                            <td class="border-grey-light border hover:bg-gray-100 p-3 td-height">
                                {{ publishedTable.group }}
                            </td>
                            <td  class="border-grey-light border hover:bg-gray-100 p-3 td-height">
                                {{ publishedTable.exam_name  }}
                            </td>
                            <td class="border-grey-light border hover:bg-gray-100 p-3 td-height">
                                {{ publishedTable.session }}
                            </td>
                        </tr>
                    </tbody>
                </table>
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

      publishedTable() {
          console.log(this.publishedResultresponse);
          return this.publishedResultResponse[0];

      },

      tableSizeSmall(){
        if (this.publishedResultResponse && this.publishedResultResponse.length) {
            return this.publishedResultResponse.length;
      }
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
            }
        
        
    }
  },

  async mounted() {
    //   await this.$nextTick()
      this.getSession();
      this.getGroup();
      this.getPublishedResult();
     
      
  }

}
</script>

<style lang="scss" scoped>
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

//   td:not(:last-child) {
//     border-bottom: 1px;
//   }

  .td-height {
    height: 50px;
  }

  th:not(:last-child) {
    border-bottom: 0;
  }

  tr {
    border: 0;
  }
</style>