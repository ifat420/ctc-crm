<template>
  <div class="">
    <ShowUrl :content="mainContents" />

    <div class="px-6 py-6 bg-color-whiteTwo m-6 box-shadow-dashboard sm:rounded-lg">
        <form
        class="w-full flex flex-col"
        >
            <div class="flex flex-wrap justify-between gap-6 items-center">
                <div>
                    <SelectInputSession :value="student.session" :input="sessionList" @hello="sessionChanged"/>
                    <span v-if="!$v.student.session.required && $v.student.session.$dirty" class="error">*Session is required</span>
                </div>
            </div>
        </form>

        <div v-if="isError('getStudentsList')  && isError('getStudentsList').has_error" class="pt-3">
            <h1 class="font text-red-600"> {{ isError('getStudentsList').error }} </h1>
        </div>

        <div>
            <div class="flex items-center justify-start gap-x-4 pb-4 pt-8">
            <button
                class="btn block rounded-lg font relative"
                :disabled="is('getStudentsList')"
                @click="uploadInfo">
                Show Students List
                <span :class="{'load loading': is('getStudentsList') }"></span>
            </button>
            </div>
            
        </div>
    </div>
    


    <div class="my-8 bg-white mx-6" v-if="studentsList && studentsList.length">
        <div class="p-6 sm:shadow-xm">
            <div> 
                <vue-good-table
                :columns="columns"
                :rows="studentsList" 
                :search-options="{
                    enabled: true
                }"
                styleClass="vgt-table bordered"
                >
                </vue-good-table>
            </div> 
        </div>
    </div>

  </div>
</template>

<script>
import ShowUrl from "~/components/shared/ShowUrl";
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapActions, mapState, mapGetters } from "vuex";
import SelectInputSession from "~/components/shared/Input/SelectInputSession";
export default {



    components: {
        ShowUrl,
        SelectInputSession,
    },



    data() {

        return {

            rows: this.studentsList,
            columns: [
                {
                    
                    label: "Roll",
                    field: 'roll_number',
                    type: 'number'
                },
                {
                    label: "Group",
                    field: "group",
                },
                {
                    label: "Name",
                    field: "first_name",
                },
                {
                    label: "Registration No.",
                    field: "reg_number",
                    type: 'number'
                },
                {
                    label: "Session",
                    field: "session"
                },
                {
                    label: "Gender",
                    field: "gender"
                },
                {
                    label: "Class",
                    field: "class"
                },
                {
                    label: "Fourth Subject",
                    field: "forth_subject_name"
                }
            ],
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

    validations: {

        student: {
            session: {
                required
            }
        }
    },




    computed: {
        ...mapState(["session","studentsList"]),
        ...mapGetters(["is","isError"]),

        tableSizeSmall(){
            if (this.studentsList && this.studentsList.length) {
                return this.studentsList.length;
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
    },




    methods: {
        ...mapActions(["getSession","getStudentsList"]),

        sessionChanged(value) {
            console.log(`Class Changed value ${value}`);
            this.student.session = value;
        },

        async uploadInfo() {
            this.$v.$touch();
            
            if (this.$v.student.session.$anyError == false) {
                await this.getStudentsList(this.student);
            }
        },

    },

    async mounted() {
        await this.getSession();
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