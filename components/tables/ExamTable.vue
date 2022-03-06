<template>
  <div>
    <vue-good-table
      :columns="columns"
      styleClass="vgt-table condensed"
      :rows="tableData"
      :search-options="{ enabled: false, placeholder: 'Search Clients...' }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'exam_name'" class="capitalize">
          {{ props.row.exam_name.split("-").join(" ") }}
        </span>

        <span
          v-else-if="
            props.column.field == 'status' && props.row.status === 'unpublished'
          "
        >
          <button class="underline" @click="publishExam(props.row)">
            Publish
          </button>
        </span>

        <span v-else-if="props.column.field == 'view'">
          <span v-if="props.row.status === 'published'">
            <button class="underline" @click="viewResult(props.row)">
              View
            </button>
          </span>
        </span>

        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>

    <div class="aler">
      <div
        class="
          overflow-y-auto overflow-x-hidden
          fixed
          right-0
          left-0
          top-4
          z-50
          justify-center
          items-center
          md:inset-0
          h-modal
          sm:h-full
          bg-low-op
          flex
        "
        :class="{
          'hidden': !showModal
        }"
        id="popup-modal"
        aria-hidden="true"
      >
        <div class="relative px-4 w-full max-w-md h-full md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex justify-end p-2">
              <button
                @click.prevent="closeModal"
                type="button"
                class="
                  text-gray-400
                  bg-transparent
                  hover:bg-gray-200 hover:text-gray-900
                  rounded-lg
                  text-sm
                  p-1.5
                  ml-auto
                  inline-flex
                  items-center
                  dark:hover:bg-gray-800 dark:hover:text-white
                "
                data-modal-toggle="popup-modal"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="p-6 pt-0 text-center">
              <svg
                class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3
                class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
              >
                Are you sure you want to Publish Result? Make sure you input all the marks.
              </h3>
              <button
                @click.prevent="deleteWorkDetailsItem"
                data-modal-toggle="popup-modal"
                type="button"
                class="
                  text-white
                  bg-red-600
                  hover:bg-red-800
                  focus:ring-4 focus:ring-red-300
                  font-medium
                  rounded-lg
                  text-sm
                  inline-flex
                  items-center
                  px-5
                  py-2.5
                  text-center
                  mr-2
                "
              >
                Yes, I'm sure
              </button>
              <button
                @click.prevent="closeModal"
                data-modal-toggle="popup-modal"
                type="button"
                class="
                  text-gray-500
                  bg-white
                  hover:bg-gray-100
                  focus:ring-4 focus:ring-gray-300
                  rounded-lg
                  border border-gray-200
                  text-sm
                  font-medium
                  px-5
                  py-2.5
                  hover:text-gray-900
                  focus:z-10
                  dark:bg-gray-700
                  dark:text-gray-300
                  dark:border-gray-500
                  dark:hover:text-white
                  dark:hover:bg-gray-600
                "
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DownArrow from "~/components/Icons/DownArrow";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  props: {
    exams: {
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
      showModal: false,
      deletedItem: null
    };
  },
  computed: {
    tableData() {
      let arr = [];
      let data = this.exams.rows;

      return data;
    },
  },
  methods: {
    ...mapActions(["createPublishExam"]),
    viewResult(value) {
      this.$router.push({
        path: "/show-result/list",
        query: { session: value.session, exam_name: value.exam_name },
      });
    },

    async publishExam(value) {
      console.log(value);
      this.showModal = true
      this.deletedItem = value
      // await this.createPublishExam(value);
    },

    deleteWorkDetailsItem() {
      this.createPublishExam(this.deletedItem)
    },

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

     closeModal() {
      this.showModal = false;
    },


    changeTableData() {
      let width = window.innerWidth;
      if (!(width > 960)) {
        this.columns = [
          {
            label: "Exam Name",
            field: "exam_name",
            sortable: false,
          },
          {
            label: "Session",
            field: "session",
            sortable: false,
          },
          {
            label: "Status",
            field: "status",
            sortable: false,
          },
          {
            label: "View",
            field: "view",
            sortable: false,
          },
        ];
      } else {
        this.columns = [
          {
            label: "Exam Name",
            field: "exam_name",
            sortable: false,
          },
          {
            label: "Exam Year",
            field: "exam_year",
            sortable: false,
          },
          {
            label: "Session",
            field: "session",
            sortable: false,
          },
          {
            label: "Status",
            field: "status",
            sortable: false,
          },
          {
            label: "View",
            field: "view",
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
