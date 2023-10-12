<script setup lang="ts">
import { UploadProfileImg } from '@/vueutils/UseBucket';


const handleUpload = async (e: any) => {
    const file = e.target.files[0];
   // const url = await UploadProfileImg(file);
    //this path is be returned and must be saved in the database in a new table called user profile
    //console.log(url);
};

</script>

<template>
<div>

    <h1>Upload a file</h1>
    <input type="file" @change="handleUpload" />

</div>
</template>


<style scoped></style>
