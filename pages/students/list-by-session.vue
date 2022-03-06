<template>
  <div class="">
    <h2 class="text-3xl font-medium mb-3">Students List</h2>

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
            </div> 
        

        <div v-if="isError('getStudentsList')  && isError('getStudentsList').has_error" class="pt-3">
            <h1 class="font text-red-600"> {{ isError('getStudentsList').error }} </h1>
        </div>

        

        <hr class="my-8" />

      <button
      @click.prevent="uploadInfo"
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
    <IconSpinAnimation v-if="is('getStudentsList')" />
      Show Students List
    </button>
    </div>
    


    <div class="my-8 bg-white mx-6" v-if="tableData && tableData.length">
        <div class="p-6 sm:shadow-xm">
            <div> 
                <vue-good-table
                :columns="columns"
                :rows="tableData" 
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
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapActions, mapState, mapGetters } from "vuex";
import DownArrow from "~/components/Icons/DownArrow";
import IconSpinAnimation from "~/components/SpinAnimaiton";

export default {



    components: {
        DownArrow,
        IconSpinAnimation
    },



    data() {

        return {
            widthStudent: true,
            shadowStudent: true,
            marBottom: true,
            columns: [
                {
                    
                    label: "Roll",
                    field: 'roll',
                    type: 'number'
                },
                {
                    label: "Group",
                    field: "group",
                },
                {
                    label: "Name",
                    field: "name",
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

        tableData() {
            let arr = [];
            let data = this.studentsList
            if (data && data.length) {
                data.map(item => {
                    let obj = {}
                    obj.roll = item.roll_number
                    obj.group = this.capitalizeFirstLetter(item.group)
                    obj.name = this.capitalizeFirstLetter(item.first_name) + " " + this.capitalizeFirstLetter(item.last_name)
                    obj.session = item.session
                    obj.gender = this.capitalizeFirstLetter(item.gender)
                    obj.class = item.class.toUpperCase()
                    arr.push(obj)
                })
            } return arr
        }
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

        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

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