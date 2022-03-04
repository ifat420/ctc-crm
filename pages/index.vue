<template>
  <div class="flex" >
    <div class="flex-1 shadow-gbtn mx-8 p-5 rounded-lg" v-for="(item, index) in highlight" :key="index">
      <div>
        <component :is="item.icon" class=" w-10 h-10" />
      </div>
      <h2 class="font-medium text-3xl mt-4"> {{ item.total }} </h2>
      <h5 class="text-xl mt-2"> {{ item.type }} </h5>
    </div>
  </div>
</template>

<script>
import IconSubject from '~/components/Icons/Book';
import IconExam from '~/components/Icons/Exam';
import IconGroup from '~/components/Icons/Group';
import IconStudent from '~/components/Icons/Student';

export default {
  components: {
    IconSubject,
    IconExam,
    IconGroup,
    IconStudent
  },

  data: () => ({
    highlight: [
      {
        type: "Students",
        total: 600,
        icon: 'IconStudent'
      },
      {
        type: "Examination",
        total: 50,
        icon: "IconExam"
      },
      {
        type: "Subjects",
        total: 10,
         icon: "IconSubject"
      },
      {
        type: "Groups",
        total: 2,
        icon: "IconGroup"
      },
    ]
  })
}
</script>

<style>

</style>