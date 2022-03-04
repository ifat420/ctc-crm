<template>
  <div>
    <vue-good-table
      :columns="columns"
      styleClass="vgt-table condensed"
      :rows="tableData"
      :search-options="{ enabled: true, placeholder: 'Search Subject...' }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'edit'">
          <nuxt-link
            :to="`/admin/customers/edit/${props.row.id}`"
            style="text-decoration: underline"
            >{{ props.row.edit }}</nuxt-link
          >
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
    subjects: {
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
      let data = this.subjects.rows;
      if (data && data.length) {
        data.map((item) => {
          let obj = {};
          obj.code = item.code;
          obj.name = this.capitalizeFirstLetter(item.name);
          obj.cq_full_mark = item.cq_full_mark;
          obj.mcq_full_mark = item.mcq_full_mark;
          obj.practical_full_mark =
            item.practical_full_mark == 0
              ? "No Practical"
              : item.practical_full_mark;
          obj.can_be_optional = item.can_be_optional ? "Yes" : "No";

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

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    changeTableData() {
      let width = window.innerWidth;
      if (!(width > 960)) {
        this.columns = [
          {
            label: "Subject Code",
            field: "code",
            type: "number",
          },
          {
            label: "Subject Name",
            field: "name",
          },
        ];
      } else {
        this.columns = [
          {
            label: "Subject Code",
            field: "code",
            type: "number",
          },
          {
            label: "Subject Name",
            field: "name",
          },
          {
            label: "CQ Full Mark",
            field: "cq_full_mark",
          },
          {
            label: "MCQ Full Mark",
            field: "mcq_full_mark",
          },
          {
            label: "Practical Full Mark",
            field: "practical_full_mark",
          },
          {
            label: "Can Be Optional",
            field: "can_be_optional",
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

