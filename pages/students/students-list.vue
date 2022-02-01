<template>
  <div class="bg-color-body">
    <ShowUrl :content="mainContents" />

    <div class="px-6 py-6 bg-color-whiteTwo m-6">
        <form
        class="w-full flex flex-col"
        >
            <div class="flex flex-wrap justify-between gap-6 items-center">
            <div>
                <SelectInputSession
                :widthStyle="widthStyle"
                :value="student.session"
                :input="sessionList"
                @hello="sessionChanged"
                /> 
            </div>
            </div>
        </form>
        <div>
            <div class="flex items-center justify-start gap-x-4 pb-4 pt-8">
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
                @click="uploadInfo">
                Show Students List
            </button>
            </div>
            
        </div>
    </div>
    
    <div class="flex my-8 justify-center items-center bg-white mx-6">
        <input class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" type="text" v-model="query" placeholder="Search"/>
        <button @click="search()" >Search</button>
    </div>
    


    <div class="flex my-8 justify-center items-center bg-white mx-6" v-if="studentsList && studentsList.length">
        <div class="p-6 sm:shadow-xm">
            <table class="w-full flex flex-row flex-no-wrap sm:bg-white sm:py-4 rounded-lg overflow-hidden  my-5">
                <thead  class="text-black">
                    <tr class="bg-teal-400 flex flex-col flex-no wrap sm:table-row sm:rounded-none mb-2 sm:mb-0" v-for="(table,index) in tableSizeSmall" :key="index">
                        <th class="p-3 text-left border td-height" v-for="(head,index) in tableHead" :key="index">
                            {{ head }}
                        </th>
                    </tr>
                </thead>



                <tbody class="flex-1 sm:flex-none" v-if="studentsList && studentsList.length">
                    <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 border" v-for="(student,index) in studentsList" :key="index">
                        <td class="border-grey-light border sm:border-1 hover:bg-gray-100 p-3 td-height">
                            {{ student.roll_number }}
                        </td>
                        <td class="border-grey-light border sm:border-1 hover:bg-gray-100 p-3 td-height">
                            {{ student.group }}
                            
                        </td>
                        
                        <td class="border-grey-light border sm:border-1 hover:bg-gray-100 p-3 td-height">
                            {{ student.first_name }}
                        </td>
                        <td  class="border-grey-light border sm:border-1 hover:bg-gray-100 p-3 td-height">
                            {{ student.reg_number  }}
                        </td>
                        <td class="border-grey-light border sm:border-1 hover:bg-gray-100 p-3 td-height">
                            {{ student.session }}
                        </td>
                        <td class="border-grey-light border sm:border-1 hover:bg-gray-100 p-3 td-height">
                            {{ student.gender }}
                        </td>
                        <td class="border-grey-light border sm:border-1 hover:bg-gray-100 p-3 td-height">
                            {{ student.class }}
                        </td>
                        <td class="border-grey-light border sm:border-1 hover:bg-gray-100 p-3 td-height">
                            {{ student.forth_subject_name }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- <div class="flex my-8 justify-center items-center bg-white mx-6"> -->
            
        <!-- </div> -->

  </div>
</template>

<script>
import ShowUrl from "~/components/shared/ShowUrl";
import { mapActions, mapState, mapGetters } from "vuex";
import SelectInputSession from "~/components/shared/Input/SelectInputSession";
export default {

    components: {
        ShowUrl,
        SelectInputSession
    },

    data() {
    return {

        query: "",
        originalRows: [],
        rows: this.studentsList,
        tableHead: ["Roll No.", "Group", "Name", "Registration No.", "Session", "Gender", "Class", "Fourth Subject"],
        mainContents: {
            folderName: "students",
            compName: "students-list",
            topicName: "Students List",
        },
        widthStyle: false,
        student: {
            session: ""
        }
      }
    },

    computed: {
        ...mapState(["session","studentsList"]),

        tableSizeSmall(){
            if (this.studentsList && this.studentsList.length) {
                return this.studentsList.length;
            }
        },

        rowsTable(){
            return this.studentsList;
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
    },

    methods: {
        ...mapActions(["getSession","getStudentsList"]),

        sessionChanged(value) {
            console.log(`Class Changed value ${value}`);
            this.student.session = value;
        },

        async uploadInfo() {
            await this.getStudentsList(this.student);
            console.log(this.studentsList);
        },

        search() {
            var results = [];
            var searchData = this.studentsList;
            if(this.query == ""){
                this.rows = this.rowsTable;
            }

            else {
                for (var i=0; i<searchData.length; i++) {
                    var sparam = this.query.toLowerCase();
                    for(var key in searchData[i])  {
                        if (searchData[i].hasOwnProperty(key)) {
                            var value = searchData[i][key];
                            if(typeof value =="string" && value.toLowerCase().indexOf(sparam) >=0){
                                results.push(searchData[i]);
                            }
                        }
                    }
                }
                this.rows = results;
            }
        }
    },

    watch : {
         query () {
             this.search();
         }
     },

    async mounted() {
        await this.getSession();
        this.rows = this.studentsList;
    },

  }

</script>

<style lang="scss" scoped>
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
//     border-bottom: 1px solid ;
//   }

  .td-height {
    height: 50px;
  }

//   th:not(:last-child) {
//     border-bottom: 0;
//   }

  tr {
    border: 0;
  }

//   .border-top {
//     border-top: 1px;
//   }
</style>