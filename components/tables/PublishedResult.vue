<template>
  <div>
    <vue-good-table
      :columns="columns"
      styleClass="vgt-table condensed"
      :rows="tableData"
      :search-options="{ enabled: false, placeholder: 'Search Clients...' }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'session'">
          <nuxt-link :to="`/show-result/list?session=${props.row.session}&exam_name=${props.row.examNameRow}`" style="text-decoration: underline">{{
            props.row.session
          }}</nuxt-link>
        </span>

        <span v-else-if="props.column.field == 'downalodData'">
          <button
            class="underline"
            @click.prevent="downloadFile(props.row.downalodData)"
          >
            Download
          </button>
        </span>

        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import DownArrow from "~/components/Icons/DownArrow";
export default {
  props: {
    result: {
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
      let data = this.result.rows;
      if (data && data.length) {
        data.map((item) => {
          let obj = {};
          obj.code = item.code;
          obj.session = item.session;
          obj.examName = this.formatExamName(item.exam_name);
          obj.examNameRow = item.exam_name;
          obj.examYear = item.exam_year;
          obj.downalodData = item.path;

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

    downloadFile(path) {
      const url = `http://128.199.165.161:4000/${path}`;
      window.location.href = url;
    },

    capitalizeFirstLetter(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },

    formatExamName(examname) {
      let arr = examname.split("-")
      if (arr.length > 1) {
        return `${this.capitalizeFirstLetter(arr[0])} ${this.capitalizeFirstLetter(arr[1])}`
      }
      return this.capitalizeFirstLetter(examname)
    },

    changeTableData() {
      let width = window.innerWidth;
      if (!(width > 960)) {
        this.columns = [
          {
            label: "Session",
            field: "session",
            sortable: false,
          },
          {
            label: "Exam Name",
            field: "examName",
            sortable: false,
          },
          {
            label: "Download",
            field: "downalodData",
            sortable: false,
          },
        ];
      } else {
        this.columns = [
          {
            label: "Session",
            field: "session",
            sortable: false,
          },
          {
            label: "Exam Name",
            field: "examName",
            sortable: false,
          },
          {
            label: "Exam Year",
            field: "examYear",
            sortable: false,
          },
          {
            label: "Download",
            field: "downalodData",
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
