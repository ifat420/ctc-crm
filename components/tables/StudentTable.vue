<template>
  <div>
    <vue-good-table
      :columns="columns"
      styleClass="vgt-table condensed"
      :rows="tableData"
      :search-options="{ enabled: false, placeholder: 'Search Clients...' }"
    >
    </vue-good-table>
  </div>
</template>

<script>
import DownArrow from "~/components/Icons/DownArrow";
export default {
  props: {
    student: {
      type: Object,
      default: {},
    },
  },
  components: {
    DownArrow,
  },
  data() {
    return {
      execuated: false,
      arrowRotate: false,
      columns: [],
      rows: [],
    };
  },
  computed: {
    tableData() {
      let arr = [];
      let data = this.student.rows;
      if (data && data.length) {
        data.map((item) => {
          let obj = {};
          obj.roll = item.roll_number;
          obj.group = this.capitalizeFirstLetter(item.group);
          obj.name =
            this.capitalizeFirstLetter(item.first_name) +
            " " +
            this.capitalizeFirstLetter(item.last_name);
          obj.session = item.session;
          obj.gender = this.capitalizeFirstLetter(item.gender);
          obj.class = item.class.toUpperCase();
          obj.type_of_student = this.capitalizeFirstLetter(
            item.type_of_student
          );
          arr.push(obj);
        });
      }
      return arr;
    },
  },
  methods: {
    rotateIcon() {
      this.arrowRotate = !this.arrowRotate;
    },

    downloadFile(path) {},

    capitalizeFirstLetter(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    formatExamName(examname) {
      let arr = examname.split("-");
      if (arr.length > 1) {
        return `${this.capitalizeFirstLetter(
          arr[0]
        )} ${this.capitalizeFirstLetter(arr[1])}`;
      }
      return this.capitalizeFirstLetter(examname);
    },


    fullName(data) {
      return `${data.first_name} ${data.last_name}`;
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    changeTableData() {
      let width = window.innerWidth;
      if (!(width > 960)) {
        this.columns = [
          {
            label: "Roll",
            field: "roll",
            type: "number",
            sortable: false,
          },
          {
            label: "Group",
            field: "group",
            sortable: false,
          },
          {
            label: "Session",
            field: "session",
            sortable: false,
          },
        ];
      } else {
        this.columns = [
          {
            label: "Roll",
            field: "roll",
            type: "number",
            sortable: false,
          },
          {
            label: "Group",
            field: "group",
            sortable: false,
          },
          {
            label: "Name",
            field: "name",
            sortable: false,
          },
          {
            label: "Session",
            field: "session",
            sortable: false,
          },
          {
            label: "Gender",
            field: "gender",
            sortable: false,
          },
          {
            label: "Class",
            field: "class",
            sortable: false,
          },
          {
            label: "Student Type",
            field: "type_of_student",
            sortable: false,
          },
        ];
      }
    },
  },
  mounted() {
    this.changeTableData();
    window.addEventListener("resize", this.changeTableData);
  },
};
</script>
