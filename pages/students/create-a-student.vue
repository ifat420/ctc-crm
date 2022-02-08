<template>
    <div>
        <div>
            <form @submit.prevent="uploadAStudent">

                <div class="p-10">
                    <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                        <div class="pb-4 sm:pb-0">
                            <div class="">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                    First Name
                                </label>
                                <input @blur="$v.student.first_name.$touch()" v-model="student.first_name" class="w-full py-3 px-3 inputText focus:outline-none font" type="text" placeholder="First Name" >
                            </div>
                            <span v-if="(!$v.student.first_name.required || !$v.student.first_name.alpha) && $v.student.first_name.$dirty" class="error pb-4">*First Name is required</span>
                        </div>
                        <div class="pb-4 sm:pb-0">
                            <div class="">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                    Last Name
                                </label>
                                <input @blur="$v.student.last_name.$touch()" v-model="student.last_name" class="w-full py-3 px-3 inputText focus:outline-none font" type="text" placeholder="Last Name" >
                            </div>
                            <span v-if="(!$v.student.last_name.required || !$v.student.last_name.alpha) && $v.student.last_name.$dirty" class="error pb-4">*Last Name is required</span>
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                        <div class="pb-4 sm:pb-0">
                            <div>
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                    Father Name
                                </label>
                                <input v-model="student.father_name" class="w-full py-3 px-3 inputText focus:outline-none font" type="text" placeholder="Father Name" >
                                
                            </div>
                        </div>
                        <div class="pb-4 sm:pb-0">
                            <div>
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                    Mother Name
                                </label>
                                <input v-model="student.mohter_name" class="w-full py-3 px-3 inputText focus:outline-none font" type="text" placeholder="Mother Name" >  
                            </div>
                        </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                        <div class="pb-4 sm:pb-0">
                            <div class="">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                    Roll Number
                                </label>
                                <input @blur="$v.student.roll_number.$touch()" v-model="student.roll_number" class="w-full py-3 px-3 inputText focus:outline-none font" type="text" placeholder="Roll Number" >
                            </div>
                            <span v-if="!$v.student.roll_number.required && $v.student.roll_number.$dirty" class="error pb-4">*Roll No. is required</span>
                        </div>
                        <div class="pb-4 sm:pb-0">
                            <div class="">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                                    Registration Number
                                </label>
                                <input v-model="student.reg_number" class="w-full py-3 px-3 inputText focus:outline-none font" type="text" placeholder="Registration Number" >
                            </div>
                        </div>
                    </div>   
                    <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                        <div class="pb-4 sm:pb-0">
                            <SelectInputClass :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="student.class" :input="classList" @hello="classChanged"/>
                            <span v-if="!$v.student.class.required && $v.student.class.$dirty" class="error pb-4">*Class is required</span>
                        </div>
                        <div class="pb-4 sm:pb-0">
                            <SelectInputSession :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="student.session" :input="sessionList" @hello="sessionChanged"/>
                            <span v-if="!$v.student.session.required && $v.student.session.$dirty" class="error pb-4">*Session is required</span>
                        </div>
                    </div> 
                    <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                        <div class="pb-4 sm:pb-0">
                            <SelectInputGroup :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="student.group" :input="groupList" @hello="groupChanged"/>
                            <span v-if="!$v.student.group.required && $v.student.group.$dirty" class="error pb-4">*Group is required</span>
                        </div>
                        <div class="pb-4 sm:pb-0">
                            <SelectInputGender :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="student.gender" @hello="genderChanged" :input="gender" />
                            <span v-if="!$v.student.gender.required && $v.student.gender.$dirty" class="error pb-4">*Gender is required</span>
                        </div>
                    </div> 
                    <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
                        <SelectInputTypeOfStudent :shadowStudent="shadowStudent" :marginBottom="marBottom" :widthStudent="widthStudent" :value="student.type_of_student" @hello="studentTypeChanged" :input="studentType"/>
                    </div> 
                </div>

                <div v-if="aStudent && aStudent.message" class="pb-3 px-10">
                    <h1 class="font success">{{ aStudent.message }}</h1>
                </div>

                <div v-if="isError('postCreateStudent')  && isError('postCreateStudent').has_error" class="pt-3">
                    <h1 class="font text-red-600"> {{ isError('postCreateStudent').error }} </h1>
                </div>

                <div class="flex items-center justify-start gap-x-4 pb-8 px-10">
                    <button
                        class="btn block rounded-lg font relative"
                        :disabled="is('postCreateStudent')"
                        >
                        Upload Files
                        <span :class="{'load loading': is('postCreateStudent') }"></span>
                    </button>
                </div>

            </form>


            

            <!-- {{ getAllStudentResponse.rows }} -->
        </div>
    </div>
</template>

<script>
import InputText from '~/components/shared/Input/InputText'
import SelectInputSession from "~/components/shared/Input/SelectInputSession";
import SelectInputGroup from "~/components/shared/Input/SelectInputGroup";
import SelectInputClass from "~/components/shared/Input/SelectInputClass";
import SelectInputGender from "~/components/shared/Input/SelectInputGender";
import SelectInputTypeOfStudent from "~/components/shared/Input/SelectInputTypeOfStudent";

import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email, alpha } from 'vuelidate/lib/validators'

export default {
    components: {
        InputText,
        SelectInputSession,
        SelectInputGroup,
        SelectInputClass,
        SelectInputGender,
        SelectInputTypeOfStudent
    },

    data() {
        return {

            // rows: this.getAllStudentResponse.rows,
            
            widthStudent: true,
            shadowStudent: true,
            marBottom: true,
            gender: {
                name: "Gender",
                options: [
                    { name: "Male", value: "Male"},
                    { name: "Female", value: "Female"},
                ]
            },
            studentType: {
                name: "Student Type",
                options: [
                    { name: "Regular", value: "regular"},
                    { name: "Irregular", value: "irregular"},
                ]
            },
            student: {
                session: "",
                group: "",
                class: "",
                gender: "",
                type_of_student: "",
                reg_number: "",
                roll_number: "",
                first_name: "",
                last_name: "",
                father_name: "",
                mohter_name: "",
            }
        }
    },

    validations: {

        student: {
            session: {
                required
            },
            class: {
                required
            },
            group: {
                required
            },
            gender: {
                required
            },
            first_name: {
                required,
                alpha
            },
            last_name: {
                required,
                alpha
            },
            roll_number: {
                required
            },

        }
    },

    computed: {
        ...mapState(["session","group","class","aStudent", "getAllStudentResponse"]),
        ...mapGetters(["is", "isError"]),

        

        fullName() {
            if (this.getAllStudentResponse.rows && this.getAllStudentResponse.rows.length) {
                this.getAllStudentResponse.rows.forEach(row => {
                    let fullName = row.first_name.concat(row.last_name);
                    return fullName;
                })
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
        },

        classList() {
            let obj = {};
            obj.name = "Class";
            obj.options = [];

            if (this.class && this.class.length) {
                this.class.forEach((item) => {
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
        ...mapActions(["getSession","getGroup", "getClass", "postCreateStudent", "getAllStudent"]),

        sessionChanged(value) {
            console.log(`Session Changed value ${value}`);
            this.student.session = value;
        },

        groupChanged(value) {
            console.log(`Group Changed value ${value}`);
            this.student.group = value;
        },

        classChanged(value) {
            console.log(`Class Changed value ${value}`);
            this.student.class = value;
        },

        genderChanged(value) {
            console.log(`Gender Changed value ${value}`);
            this.student.gender = value;
        },
        studentTypeChanged(value) {
            console.log(`Student Type Changed value ${value}`);
            this.student.type_of_student = value;
        },

        async uploadAStudent() {
            this.$v.$touch();
            console.log("STUDENT",this.$v.student);
            if (this.$v.student.$anyError == false )
                {
                    await this.postCreateStudent(this.student);
                    console.log("UPLOADED");
                    this.$router.push("/students/show-all-students");
                }

            this.student.session = "",
            this.student.class = "",
            this.student.group = "",
            this.student.gender = "",
            this.student.roll_number = "",
            this.student.reg_number = "",
            this.student.first_name = "",
            this.student.last_name = "",
            this.student.father_name = "",
            this.student.mohter_name = "",
            this.student.type_of_student = ""
        }
    },

    mounted() {
        this.getSession();
        this.getGroup();
        this.getClass();
    }
}
</script>

<style>

</style>