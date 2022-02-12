<template>
  <div class="">
    <ShowUrl :content="mainContents" />
    <div
      class="px-6 py-6 bg-color-whiteTwo m-6 box-shadow-dashboard sm:rounded-lg"
    >
      <!-- ................... Select Option ................................. -->
        <form action="" @submit.prevent="uploadMarks">
        
            <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                <div class="pb-4 sm:pb-0">
                    <SelectInputSession :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="marks.session" :input="sessionList" @hello="sessionChanged"/>
                    <span v-if="!$v.marks.session.required && $v.marks.session.$dirty" class="error pb-4">*Session is required</span>
                </div>
                <div class="pb-4 sm:pb-0">
                    <SelectInputExamName :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="marks.exam_name" :input="examName" @hello="examNameChanged"/>
                    <span v-if="!$v.marks.exam_name.required && $v.marks.exam_name.$dirty" class="error pb-4">*Exam Name is required</span>
                </div>
            </div> 
            
            


            <div
            v-if="
                isError('createMarks') && isError('createMarks').has_error
            "
            class="pt-3"
            >
                <h1 class="font text-red-600">
                    {{ isError("createMarks").error }}
                </h1>
            </div>

            <div class="flex items-center justify-start gap-x-4 py-8">
                <button
                    class="btn block rounded-lg font relative"
                    :disabled="is('createMarks')"
                >
                    Submit
                    <span :class="{ 'load loading': is('createMarks') }"></span>
                </button>
                <div>
                    
                </div>
            </div>

        </form>
    </div>

    <div class="px-6 py-6 bg-color-whiteTwo m-6 box-shadow-dashboard sm:rounded-lg" v-if="marksResponse && marksResponse.length">
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-x-auto rounded-lg">
                        <table class="min-w-full">
                            <thead class="border-b bg-gray-800 ">
                                <tr>
                                <th scope="col" class="text-sm font font-medium text-white px-6 py-4 text-left" v-for="(column,index) in columns" :key="index">
                                    {{ column.name }}
                                </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" v-for="(row,index) in markData" :key="index">
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap">
                                        {{ row.roll_number }}
                                    </td>
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap capitalize">
                                        {{ row.subject_name }}
                                    </td>
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap">
                                        <select 
                                            class="form-select appearance-none width px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                                            v-model="row.attendent"
                                            
                                        >
            
                                            <option value="">Attendent</option>
                                            <option v-for="(option,index) in options" :key="index" :value="option.value" :selected="index == 1">{{option.name}}</option>
                                        </select>
                                    </td>
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap">
                                        <div class="wrapper">
                                            <input class="font" type="number" :min="0" :max="row.cq_full_mark" v-model.number="row.cq">
                                        </div>
                                    </td>
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap">
                                        <div v-if="row.mcq_full_mark" class="wrapper">
                                            <input class="font" type="number" :min="0" :max="row.mcq_full_mark" v-model.number="row.mcq">
                                        </div>
                                    </td>
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap" >
                                        <div v-if="row.practical_full_mark" class="wrapper">
                                            <input class="font" type="number" :min="0" :max="row.practical_full_mark" v-model.number="row.practical">
                                        </div>
                                    </td>
                                </tr> 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="px-6 py-2" v-if="marksResponse && marksResponse.length">
        <div class="gap-x-4">
            <button
                class="btn block rounded-lg font relative"
                :disabled="is('createMarks')"
                @click="submitStudentMarks"
            >
                Submit
                <span :class="{ 'load loading': is('createMarks') }"></span>
            </button>
            <div>
                
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email } from 'vuelidate/lib/validators'

import ShowUrl from "~/components/shared/ShowUrl";
import SelectInputSession from "~/components/shared/Input/SelectInputSession";
import SelectInputExamName from "~/components/shared/Input/SelectInputExamName";

export default {
    components: {
        ShowUrl,
        SelectInputSession,
        SelectInputExamName,
    },

    data() {
        return {
            widthStudent: true,
            shadowStudent: true,
            marBottom: true,
            mainContents: {
                folderName: "marks",
                compName: "upload-marks",
                topicName: "Upload Marks",
            },

            marks: {
                session: "",
                exam_name: ""
            },

            input: { cqNum: "", mcqNum: "", practicalNum: "" },
                 
            options: [
                { name: "Present", value: "present"},
                {name: "Absent", value: "absent"}
            ],

            examName: {
                name: "Exam Name",
                options: [
                    { name: "test", value: "test"},
                    { name: "pre-test", value: "pre-test"},
                    { name: "half-yearly", value: "half-yearly"},
                    { name: "year-final", value: "year-final"},
                ]
            },

            columns: [
                {
                    name: "Roll Number",
                    value: "roll_number"
                },
                {
                    name: "Subject Name",
                    value: "subject_name",
                },
                {
                    name: "Attendent",
                    value: "attendent",
                },
                {
                    name: "CQ",
                    value: "cq",
                },
                {
                    name: "MCQ",
                    value: "mcq"
                },
                {
                    name: "Practical",
                    value: "practical"
                }
            ],

            markData: []
        }
    },

    validations: {

        marks: {
            session: {
                required
            },
            exam_name: {
                required
            }
        },
    },

    computed: {
        ...mapState(["session", "marksResponse", "markTableUpdateResponse"]),
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

        // computedMarksResponse() {
            
        //     if(this.marksResponse && this.marksResponse.length) {
        //         for(let i = 0; i< this.marksResponse.length ; i++) {
        //             let obj = {};
        //             obj.cqNum = "";
        //             obj.mcqNum = "";
        //             obj.practicalNum = "";
        //             this.input.push(obj);
        //         }
        //     }

        //     return this.input;
        // }
    },

    methods: {
        ...mapActions(["getSession", "createMarks", "createMarkTableUpdate"]),

        examNameChanged(value) {
            console.log(`Exam Changed value ${value}`);
            this.marks.exam_name = value;
        },

        sessionChanged(value) {
            console.log(`Session Changed value ${value}`);
            this.marks.session = value;
        },

        async uploadMarks() {
            this.$v.$touch();
            if (this.$v.marks.$anyError == false )
                {
                    await this.createMarks(this.marks);
                    this.hasSuccess = true;
                    console.log("UPLOADED");
                }
            this.hasSuccess = false;
            this.marks.exam_name = "",
            this.marks.session = ""
        },

        async submitStudentMarks() {
            console.log(this.markData);
            await this.createMarkTableUpdate(this.markData);
            if (this.markTableUpdateResponse && this.markTableUpdateResponse.message)
                {
                    // this.$toast.success("hello");
                    this.$successToast(this.markTableUpdateResponse.message);
                    this.hasSuccess = true;
                    console.log("mark response inside", this.markTableUpdateResponse);
                    
                }
        }
    },

    mounted() {
        this.getSession();
        this.markData = JSON.parse(JSON.stringify(this.marksResponse))
    },
    watch: {
        marksResponse: function(v) {
            this.markData = JSON.parse(JSON.stringify(v))
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper input {
    background-color: #FFFFFF;
    color: #000000;
    font-size: 14px;
    font-weight: bold;
    border: 1px solid gray;
    padding: 7px 10px;
    outline: none;
    border-radius: 4px;
}
</style>