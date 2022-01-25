<template>

<div>
    <div class=" bg-color-body">
        <ShowUrl :content="mainContents"/>
        <!-- <div class="px-6 py-6 bg-color-whiteTwo mt-6 ml-6 mr-6">
            <div class="flex flex-wrap justify-between items-center pb-4">
                <SelectInput />
                <SelectInput />
                <SelectInput />
                <SelectInput />
                <SelectInput />
                <SelectInput />
            </div> 
            <div class="flex items-center justify-start gap-x-4">
                <button class="bg-color-black color-white flex items-center gap-x-6  px-4 py-2 font border-radius-button">Search</button>
                <button class="bg-color-black color-white flex items-center gap-x-6  px-4 py-2 font border-radius-button">Reset</button>
            </div>
        </div>    -->
    </div>

    <div class="bg-color-gray flex flex-col">
    
    <div class="-my-2  sm:-mx-6 lg:-mx-8  p-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden p-8 bg-color-whiteTwo sm:rounded-lg">
          <div class="flex justify-between pb-10">
              <h4 class="pb-4 font">Rollwise Statistics</h4>
              <div class="flex gap-x-4">
                  <button class="bg-color-black color-white flex items-center gap-x-6 px-4 py-2 font border-radius-button">Save</button>
                  <button class="bg-color-black color-white flex items-center gap-x-6 px-4 py-2 font border-radius-button">Print</button>
              </div>
          </div>
          <!-- <TableRollWise v-if="people" :theData="computedTableData"/> -->
          <table ref="content" class="table-roll-wise min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium font text-gray-500 uppercase tracking-wider">
                  Roll
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium font text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium font text-gray-500 uppercase tracking-wider">
                  Session
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium font text-gray-500 uppercase tracking-wider">
                  Exam
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium font text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium font text-gray-500 uppercase tracking-wider">
                  Group
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium font text-gray-500 uppercase tracking-wider">
                  Subjects
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(person,index) in computedTableData" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                      <div class=" font-size text-gray-500">
                        {{ person.roll }}
                      </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 font-size">{{ person.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex leading-5 font font-size text-gray-500">
                    {{ person.session }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap font font-size  text-gray-500">
                  {{ person.exam }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font font-size  text-gray-500">
                  {{ person.class }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font font-size text-gray-500">
                  {{ person.group }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font font-size text-gray-500">
                  {{ person.subjects }}
                </td>
              </tr>
            </tbody>
          </table>
          <paginate
            :page-count="3"
            :page-range="4"
            v-model="currentPage"
            :click-handler="goToPage"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>
          <button @click="makePDF">download</button>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>

<script>
import ShowUrl from '~/components/shared/ShowUrl'
import SelectInput from '~/components/shared/SelectInput'
import html2pdf from 'html2pdf.js'
export default {
  components: {
      ShowUrl,
      SelectInput
  },

  data() {
      return {
          buttonContents: ["Reset","Search"],
          buttonContentsTwo: ["Save","Print"],
          currentPage: 1,
          mainContents: {
              folderName: "show-result",
              compName: "rollwise-statistics",
              topicName: "Rollwise Statistics"
          },

          people: [
              {
                  roll: 511,
                  name: "Rubel",
                  session: "2016-17",
                  exam: "pre-Test",
                  class: "XII",
                  group: "Science",
                  subjects: "Bangla(23)"
              },

              {
                  roll: 511,
                  name: "Rubel",
                  session: "2016-17",
                  exam: "pre-Test",
                  class: "XII",
                  group: "Science",
                  subjects: "Bangla(23)"
              },

              {
                  roll: 511,
                  name: "Rubel",
                  session: "2016-17",
                  exam: "pre-Test",
                  class: "XII",
                  group: "Science",
                  subjects: "Bangla(23)"
              },

              {
                  roll: 511,
                  name: "Rubel",
                  session: "2016-17",
                  exam: "pre-Test",
                  class: "XII",
                  group: "Science",
                  subjects: "Bangla(23)"
              },

              {
                  roll: 511,
                  name: "Rubel",
                  session: "2016-17",
                  exam: "pre-Test",
                  class: "XII",
                  group: "Science",
                  subjects: "Bangla(23)"
              },

              {
                  roll: 511,
                  name: "Rubel",
                  session: "2016-17",
                  exam: "pre-Test",
                  class: "XII",
                  group: "Science",
                  subjects: "Bangla(23)"
              },

              {
                  roll: 511,
                  name: "Rubel",
                  session: "2016-17",
                  exam: "pre-Test",
                  class: "XII",
                  group: "Science",
                  subjects: "Bangla(23)"
              },

              {
                  roll: 511,
                  name: "Rubel",
                  session: "2016-17",
                  exam: "pre-Test",
                  class: "XII",
                  group: "Science",
                  subjects: "Bangla(23)"
              },

              {
                  roll: 511,
                  name: "Rubel",
                  session: "2016-17",
                  exam: "pre-Test",
                  class: "XII",
                  group: "Science",
                  subjects: "Bangla(23)"
              },

              {
                  roll: 511,
                  name: "Rubel",
                  session: "2016-17",
                  exam: "pre-Test",
                  class: "XII",
                  group: "Science",
                  subjects: "Bangla(23)"
              }
          ]
      }
  },

  computed: {
      computedTableData() {
        if(!this.people) return [];
        else {
          const firstIndex = (this.currentPage-1) * 4;
          const lastIndex = this.currentPage * 4;
          return this.people.slice(firstIndex,lastIndex);
        }
      },


  },

  methods: {
    goToPage() {
      console.log('Working');
      console.log('this.currentPage :>> ', this.currentPage);
      this.$router.push({path: '/show-result/rollwise-statistics', query: { page: this.currentPage}})
    },

    makePDF(){
      html2pdf(this.$refs.content, {
					margin: 1,
					filename: 'document.pdf',
					image: { type: 'jpeg', quality: 0.98 },
					html2canvas: { dpi: 192, letterRendering: true },
					jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
				})
    }
  },

  mounted() {
    console.log('this.$route :>> ', this.$route);
    if(this.$route && this.$route.query && this.$route.query.page) {
      this.currentPage = this.$route.query.page
    }
  }
}
</script>
<style lang="scss" scoped>
    
</style>