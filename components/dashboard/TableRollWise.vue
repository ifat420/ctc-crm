<template>
  <table class="min-w-full divide-y divide-gray-200">
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
              <tr v-for="(person,index) in theData" :key="index">
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
</template>

<script>
export default {
    props: ["theData"]
}
</script>

<style>

</style>