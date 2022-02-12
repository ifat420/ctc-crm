<template>
  <div class="">
    <ShowUrl :content="mainContents" />
    <div
      class="px-6 py-6 bg-color-whiteTwo m-6 box-shadow-dashboard sm:rounded-lg"
    >
      <!-- ................... Select Option ................................. -->
        <form action="" @submit.prevent="uploadSubjectMarks">
        
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
            <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                <div class="pb-4 sm:pb-0">
                    <SelectInputGroup :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="marks.group" :input="groupList" @hello="groupChanged"/>
                    <span v-if="!$v.marks.group.required && $v.marks.group.$dirty" class="error pb-4">*Group is required</span>
                </div>
                <div class="pb-4 sm:pb-0">
                    <SelectInputSubject :subName="'Subjects'" :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="marks.subject_name" :input="subjectList" @hello="subjectChanged"/>
                    <span v-if="!$v.marks.subject_name.required && $v.marks.subject_name.$dirty" class="error pb-4">*Subject is required</span>
                </div>
            </div> 
            
            


            <div
            v-if="
                isError('createMarksOnSubject') && isError('createMarksOnSubject').has_error
            "
            class="pt-3"
            >
                <h1 class="font text-red-600">
                    {{ isError("createMarksOnSubject").error }}
                </h1>
            </div>

            <div class="flex items-center justify-start gap-x-4 py-8">
                <button
                    class="btn block rounded-lg font relative"
                    :disabled="is('createMarksOnSubject')"
                >
                    Submit
                    <span :class="{ 'load loading': is('createMarksOnSubject') }"></span>
                </button>
                <div>
                    
                </div>
            </div>

        </form>
    </div>

    <div class="px-6 py-6 bg-color-whiteTwo m-6 box-shadow-dashboard sm:rounded-lg" v-if="marksOnSubjectResponse && marksOnSubjectResponse.length">
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
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap">
                                        {{ row.subject_name }}
                                    </td>
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap">
                                        <select 
                                            class="form-select appearance-none width px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                                            v-model="row.attendent"
                                            
                                        >
            
                                            <option value="">Select Attendent</option>
                                            <option v-for="(option,index) in options" :key="index" :value="option.value">{{option.name}}</option>
                                        </select>
                                    </td>
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap">
                                        <div class="wrapper">
                                            <input class="font" type="number" v-model.number="row.cq">
                                        </div>
                                    </td>
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap">
                                        <div v-if="row.mcq_full_mark" class="wrapper">
                                            <input class="font" type="number" v-model.number="row.mcq">
                                        </div>
                                    </td>
                                    <td class="text-sm text-gray-900 font font-medium px-6 py-4 whitespace-nowrap" >
                                        <div v-if="row.practical_full_mark" class="wrapper">
                                            <input class="font" type="number" v-model.number="row.practical">
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

    <!-- <div v-if="hasSuccess && markTableUpdateResponse && markTableUpdateResponse.message" class="inline-block px-4 py-3 bg-green-500 ml-6 rounded-lg">
        <h1 class="font text-white">{{ markTableUpdateResponse.message }}</h1>
    </div> -->

    <div v-if="isError('createMarkTableUpdate')  && isError('createMarkTableUpdate').has_error" class="inline-block px-4 py-3 bg-red-500 ml-6 rounded-lg">
        <h1 class="font text-white"> {{ isError('createMarkTableUpdate').error }} </h1>
    </div>

    <div class="px-6 py-2" v-if="marksOnSubjectResponse && marksOnSubjectResponse.length">
        <div class="gap-x-4">
            <button
                class="btn block rounded-lg font relative"
                :disabled="is('createMarksOnSubject')"
                @click="submitSubjectMarks"
            >
                Submit
                <span :class="{ 'load loading': is('createMarksOnSubject') }"></span>
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
import SelectInputGroup from "~/components/shared/Input/SelectInputGroup";
import SelectInputSubject from "~/components/shared/Input/SelectInputSubject";

export default {
    components: {
        ShowUrl,
        SelectInputSession,
        SelectInputExamName,
        SelectInputGroup,
        SelectInputSubject
    },

    data() {
        return {
            hasSuccess: false,
            widthStudent: true,
            shadowStudent: true,
            marBottom: true,
            mainContents: {
                folderName: "marks",
                compName: "upload-marks-subjectwise",
                topicName: "Upload Marks Subjectwise",
            },

            marks: {
                session: "",
                exam_name: "",
                group: "",
                subject_name: ""
            },

            examName: {
                name: "Exam Name",
                options: [
                    { name: "test", value: "test"},
                    { name: "pre-test", value: "pre-test"},
                    { name: "half-yearly", value: "half-yearly"},
                    { name: "year-final", value: "year-final"},
                ]
            },

            options: [
                { name: "Present", value: "present"},
                {name: "Absent", value: "absent"}
            ],

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
            },
            group: {
                required
            },
            subject_name: {
                required
            }
        },
    },

    computed: {
        ...mapState(["session", "group", "marksResponse","createSubjectResponse", "marksOnSubjectResponse", "markTableUpdateResponse"]),
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

        groupList() {
            let obj = {}
            obj.name = "Group"
            obj.options = []

            if (this.group && this.group.length) {
                this.group.forEach(item => {
                let ob = {}
                ob.name = item
                ob.value = item
                obj.options.push(ob)
                })
            } return obj
        },

        subjectList() {
            let obj = {}
            obj.name = "Subject"
            obj.options = []

            if (this.createSubjectResponse && this.createSubjectResponse.length) {
                this.createSubjectResponse.forEach(item => {
                let ob = {}
                ob.name = item
                ob.value = item
                obj.options.push(ob)
                })
            } return obj
        }

    },

    methods: {
        ...mapActions(["getSession", "getGroup", "createSubjects", "createMarks", "createMarksOnSubject", "createMarkTableUpdate"]),

        examNameChanged(value) {
            console.log(`Exam Changed value ${value}`);
            this.marks.exam_name = value;
        },

        sessionChanged(value) {
            console.log(`Session Changed value ${value}`);
            this.marks.session = value;
        },

        groupChanged(value) {
            console.log(`Group Changed value ${value}`);
            this.marks.group = value;
        },

        subjectChanged(value) {
            console.log(`subject Changed value ${value}`);
            this.marks.subject_name = value;
        },

        async submitSubjectMarks() {
            console.log(this.markData);
            console.log("mark response", this.markTableUpdateResponse);
            await this.createMarkTableUpdate(this.markData);
            if (this.markTableUpdateResponse && this.markTableUpdateResponse.message)
                {
                    this.$successToast(this.markTableUpdateResponse.message);
                    console.log('this.markTableUpdateResponse.message :>> ', this.markTableUpdateResponse.message);
                    this.hasSuccess = true;
                    // console.log("mark response inside", this.markTableUpdateResponse);
                    // setTimeout(() => {
                    //     this.hasSuccess = false;
                    // },5000)
                
                }

            

        },

        async uploadSubjectMarks() {
            
            this.$v.$touch();
            if (this.$v.marks.$anyError == false )
                {
                    await this.createMarksOnSubject({ exam_name: this.marks.exam_name, session: this.marks.session, subject_name: this.marks.subject_name });
                    this.hasSuccess = true;
                    console.log("UPLOADED");
                }
            this.hasSuccess = false;
            this.marks.exam_name = "",
            this.marks.session = "",
            this.marks.group = "",
            this.marks.subject_name = ""
        }
    },

    mounted() {
        this.getSession();
        this.getGroup();
        this.markData = JSON.parse(JSON.stringify(this.marksOnSubjectResponse))
    },

    watch: {
        marksOnSubjectResponse: function(v) {
            this.markData = JSON.parse(JSON.stringify(v))
            console.log(this.markData);
        },

        "marks.group": async function(val) {
            console.log("watching",val);
            if(val){
                await this.createSubjects({ group: val });      
            }
            
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