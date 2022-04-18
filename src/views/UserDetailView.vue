<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/user";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputText';
import Dropdown from 'primevue/dropdown';
import Message from 'primevue/message';
import Calendar from 'primevue/calendar';
import moment from 'moment';
import { ref, onMounted } from 'vue';
import router from "../router";

const main = useUserStore();

let courses = ref();
const displayUserEditModal = ref(false);
const displayUserCourseModal = ref(false);
let user = main.getUser;
let editUser = ref();
let alert = ref();

let newCourse = ref({
  course_name: null,
  completed_at: null,
  measured_at: null,
});


const statuses = ref([
  { name: 'Active', code: 'active' },
  { name: 'Passive', code: 'passive' }
]);

const userEditModal = () => {
  displayUserEditModal.value = true;
}

const userCourseModal = () => {
  displayUserCourseModal.value = true;
}

const courseSave = () => {

  if (
    newCourse.value.course_name !== null &&
    newCourse.value.completed_at !== null &&
    newCourse.value.measured_at !== null
  ) {

    courses.value.push({
      course_name: newCourse.value.course_name,
      completed_at: moment(newCourse.value.completed_at).format("YYYY-MM-DD HH:mm:ss"),
      measured_at: moment(newCourse.value.measured_at).format("HH:mm:ss"),
    });


    newCourse.value = {
      course_name: null,
      completed_at: null,
      measured_at: null,
    }

    alert.value = true;
    console.log("User Course Added");

    setTimeout(() => {
      alert.value = false;
    }, 3000);

  }
}


const updateUser = () => {
  alert.value = true;
  user.name = editUser.value.name;
  user.status = editUser.value.status;
  user.detail = { ...editUser.value.detail };

  setTimeout(() => {
    alert.value = false;
  }, 3000);
}

onMounted(() => {
  if (user) {
    alert.value = false;
    courses.value = user.courses;
    editUser.value = { ...user }
  }
});

</script>

<template>
  <div>
    <div class="user" v-if="user">
      <h1>Welcome to <span class="text-danger">{{ user.name }}</span></h1>

      <br>
      <Button @click="userEditModal();"
        class="p-button p-component p-button-raised p-button-secondary p-button-text p-button-sm" label="Edit User" />

      <br><br>

      <TabView>
        <TabPanel header="User">
          <p><b>Id: </b> {{ user.id }}</p>
          <p><b>Name: </b> {{ user.name }}</p>
          <p><b>Status: </b> {{ user.status }}</p>
        </TabPanel>
        <TabPanel header="User Detail">
          <p><b>Age: </b> {{ user.detail.age }}</p>
          <p><b>Job: </b> {{ user.detail.job }}</p>
        </TabPanel>
        <TabPanel header="User Courses">

          <Button @click="userCourseModal();"
            class="p-button p-component p-button-raised p-button-secondary p-button-text p-button-sm"
            label="Add New Course" />
          <br><br>

          <DataTable :value="courses" responsiveLayout="scroll">
            <Column field="course_name" header="Course Name"></Column>
            <Column field="measured_at" header="Measured At"></Column>
            <Column field="completed_at" header="Completed At"></Column>
          </DataTable>
        </TabPanel>
      </TabView>


      <RouterLink class="btn btn-success mt-5" to="/users">Users</RouterLink>

      <Dialog header="Edit User" v-model:visible="displayUserEditModal"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }" :style="{ width: '50vw' }">
        <Message severity="success" v-if="alert" :closable="false" :sticky="false">User Update Successful</Message>
        <br>
        <InputText type="text" v-model="editUser.name" placeholder="Name" /> <br>
        <Dropdown v-model="editUser.status" :options="statuses" optionLabel="name" optionValue="code"
          placeholder="Select" /> <br>
        <InputText type="text" v-model="editUser.detail.age" placeholder="Age" /> <br>
        <InputText type="text" v-model="editUser.detail.job" placeholder="Job" /> <br>

        <br>

        <template #footer>
          <Button @click="updateUser()" label="Save" icon="pi pi-check p-button-success" autofocus />
        </template>
      </Dialog>

      <Dialog header="Add New Course" v-model:visible="displayUserCourseModal"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }" :style="{ width: '50vw' }">
        <Message severity="success" v-if="alert" :closable="false" :sticky="false">New Course Added</Message>
        <br>
        <InputText type="text" v-model="newCourse.course_name" placeholder="Course Name" />
        <br><br>
        <Calendar v-model="newCourse.completed_at" dateFormat="yy-mm-dd" hourFormat="24" :showTime="true"
          :showSeconds="true" placeholder="Completed At" />
        <br><br>
        <Calendar v-model="newCourse.measured_at" :timeOnly="true" :showSeconds="true" hourFormat="24" 
          placeholder="Measured At" />
        <br>

        <template #footer>
          <Button @click="courseSave()" label="Save" icon="pi pi-check p-button-success" autofocus />
        </template>
      </Dialog>
    </div>

    <div class="text-danger user" v-if="!user">
      <h3> User not found. </h3> <br>
      <br>
      <RouterLink class="btn btn-success mt-5" to="/users">Users</RouterLink>
    </div>
  </div>
</template>




<style>
.user {
  margin: 55px 15px 0px 15px;
  text-align: center;
}

.text-danger {
  color: rgb(187, 0, 0);
}

.p-button {
  color: aliceblue;
}
</style>
