<template>
  <div class="bg-color-gray flex flex-col">
    <div class="box-shadow-dashboard bg-color-whiteTwo py-6">
      <h2 class="px-7 font font-bold">File Upload History</h2>
    </div>
    <div class="-my-2  sm:-mx-6 lg:-mx-8  p-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden p-8 bg-color-whiteTwo sm:rounded-lg">
          <h4 class="pb-4 font">File Upload History</h4>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium font text-gray-500 uppercase tracking-wider">
                  Time
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
                  Files
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(person,index) in people" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                      <div class=" font-size text-gray-500">
                        {{ person.date }}
                      </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 font-size">{{ person.session }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex leading-5 font font-size text-gray-500">
                    {{ person.exam }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap font font-size  text-gray-500">
                  {{ person.class }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font font-size text-gray-500">
                  {{ person.group }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap font font-size text-gray-500">
                  {{ person.file }}
                </td>
              </tr>
            </tbody>
          </table>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  
  data(){
    return {

			
      people: [
            {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },
    ]
    }
  },

  
}


</script>

<style lang="scss" scoped>
  .current {
    color: teal;
  }
</style>