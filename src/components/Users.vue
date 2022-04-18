<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputText';
import Dropdown from 'primevue/dropdown';
import {FilterMatchMode,FilterOperator} from 'primevue/api';

import { ref, onMounted } from 'vue';
import UserService from '../service/UserService';
import { generateCSV, exportCSVFile } from '../helpers/export';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const users = ref();
const usersDetails = ref();
const usersCourses = ref();
const userService = ref(new UserService());
const router = useRouter();
const main = useUserStore();

const statuses = ref(['active', 'passive']);


const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
    'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
    'status': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const initFilters = () => {
    filters.value = {
        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
        'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        'status': {value: null, matchMode: FilterMatchMode.CONTAINS},
    }
};

const clearFilter = () => {
    initFilters();
};

const getUser = (userData) => {
    const userDetail = usersDetails.value.filter((item) => item.user_id === userData.id);
    const userCourses = usersCourses.value.filter((item) => item.user_id === userData.id);

    const currentUser = JSON.parse(JSON.stringify(userData));
    currentUser.detail = userDetail[0];
    currentUser.courses = userCourses[0]["courses"];

    return currentUser;
}

const userShow = (userData) => {

    const user = getUser(userData);
    main.addUser(user);

    router.push('/user/'+ userData.id);
}

const download = (userData) => {

    const user = getUser(userData);

    var exportUserHeaders = {
        id: "Id",
        name: "Name",
        status: "Status",
        age: "Age",
        job: "Job"
    };

    const exportUserData = [{
        id: user.id,
        name: user.name,
        status: user.status,
        age: user.detail.age,
        job: user.detail.job
    }];

    var exportUserCoursesHeaders = {
        course_name: "Course Name",
        measured_at: "Measured At",
        completed_at: "Completed At",
    };
    
    const exportUserCoursesData = user.courses;

    const userCsv = generateCSV(exportUserHeaders, exportUserData, "User ");
    const userCoursesCsv = generateCSV(exportUserCoursesHeaders, exportUserCoursesData, "User Courses ");
    const csv = userCsv + userCoursesCsv;

     exportCSVFile(csv, "user");
}

onMounted(() => {

    // Users
    let localUsers = localStorage.getItem("users");
    if(localUsers !== null) {
        users.value = JSON.parse(localUsers);
    } else {
        userService.value.getUsers().then(data => {
            users.value = data;
            localStorage.setItem("users", JSON.stringify(data));
        });
    }

    // Users Details
    let localUserDetails = localStorage.getItem("userDetails");
    if(localUserDetails !== null) {
        usersDetails.value = JSON.parse(localUserDetails);
    } else {
        userService.value.getUsersDetail().then(data => { 
            usersDetails.value = data;
            localStorage.setItem("userDetails", JSON.stringify(data));
        });
    }

    // Users Courses
    let localUserCourses = localStorage.getItem("userCourses");
    if(localUserCourses !== null) {
        usersCourses.value = JSON.parse(localUserCourses);
    } else {
        userService.value.getUsersCourses().then(data => { 
            usersCourses.value = data;
            localStorage.setItem("userCourses",JSON.stringify(data));
        });
    }

})
</script>  

<template>
	<div class="users-table">

        <DataTable 
            :value="users" 
            responsiveLayout="scroll"
            v-model:filters="filters"
            filterDisplay="menu"
            class="p-datatable-sm"
            :paginator="true" :rows="5"
            :globalFilterFields="['id','name', 'status']"
        >

            <template #header>
                <div class="flex justify-content-between">
                    <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter()"/>
                    
                    <Dropdown v-model="filters['status'].value" :options="statuses" placeholder="Status" class="p-column-filter" :showClear="true">
                        <template #value="slotProps">
                            <span :class="'status-badge status-' + slotProps.value" v-if="slotProps.value">{{slotProps.value}}</span>
                            <span v-else>{{slotProps.placeholder}}</span>
                        </template>
                        <template #option="slotProps">
                            <span :class="'status-badge status-' + slotProps.option">{{slotProps.option}}</span>
                        </template>
                    </Dropdown>

                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </span>
                </div>
            </template>

            <Column field="id" header="Id"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="actions" header="Actions" style="text-align:right;">
                <template #body="slotProps">          
                    <Button @click="userShow(slotProps.data);" class="p-button p-component p-button-raised p-button-secondary p-button-text p-button-sm" label="Show" />
                    <Button @click="download(slotProps.data);" class="p-button p-component p-button-raised p-button-secondary p-button-text p-button-sm" label="Export" />
                </template>
            </Column>
            <template #footer>
                In total there are {{users ? users.length : 0 }} users.
            </template>
        </DataTable>
	</div>
</template>

<style>
.users-table tr:hover {
    background: rgb(235, 235, 235) !important;
}

.p-button {
    margin-right: 10px;
}

.status-badge {
    text-transform: capitalize;
}

.p-datatable-thead tr th:nth-child(3) {
    width: 170px !important;
}
</style>
