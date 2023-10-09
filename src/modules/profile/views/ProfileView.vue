v-col<script setup lang="ts">
import useUser from '@/composables/useUser';

import CustomDatePicker from '../components/CustomDatePicker.vue'
import { ref, type Ref } from 'vue';


const comp = useUser();

const url = ref<string | null>(null);

const image: Ref<Blob | null> = ref(null);


//comp.GetUser('correo@gmail.com');

const PreviewImage = (e:any) => {

    console.log(e.target.files[0]);
  url.value = URL.createObjectURL(e.target.files[0]);
};

const form = useUser().User;


</script>

<template>
<div>
    <v-row>
        <v-col cols="12">
            <h1>Informacion Personal</h1>
        </v-col>
    </v-row>
    <v-row>

        <v-col cols="12" md="4" xl="4">
            
            <v-col cols="12" md="12" xl="12">
            <div style="display: flex; justify-content: center; width: 80%;margin-left: 10%;max-height: 200px;">
                <v-img
                :src="url ? url : 'https://cdn.vuetifyjs.com/images/john.jpg'"
                min-width="200"
                ></v-img>
            </div>
            </v-col>        <v-file-input
                        @change="PreviewImage"
            accept="image/png, image/jpeg, image/bmp"

            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            ></v-file-input>
        </v-col>
        <v-col cols="12" md="8" xl="8">
            <v-row>
                <v-col cols="12" md="6" xl="6">
                    <v-text-field
                        v-model="form.nombre"
                        label="Nombre"                       
                        type="text"
                        class="mx-auto max-w-[400px] bg-white"
                    />
                </v-col>
                <v-col cols="12" md="6" xl="6">
                    <v-text-field
                        v-model="form.apellido"
                        label="Apellido" 
                        type="text"
                        class="mx-auto max-w-[400px] bg-white"
                    />
                </v-col>
            </v-row>
            <v-row>
                
                    <v-col cols="12" md="6" xl="6">
                    
                        <v-text-field
                            v-model="form.email"
                            label="Correo Electronico"
                            type="email"
                            class="mx-auto max-w-[400px] bg-white"
                            readonly
                        />
                    </v-col>
                    <v-col cols="12" md="6" xl="6">
                    
                    <custom-date-picker  >
                                </custom-date-picker>
                    </v-col>
            </v-row>
            <v-row>
                    <v-col cols="12" md="6" xl="6">
                        <v-text-field
                            v-model="form.direccion"
                            label="Direccion"
                            type="text"
                            class="mx-auto max-w-[400px] bg-white"
                        />
                    </v-col>
                    <v-col cols="12" md="6" xl="6">
                        <v-autocomplete
                            v-model="form.sexo"
                            :items="['Masculino','Femenino']"
                            label="Sexo"
                        />
                    </v-col>
               
            </v-row>
        </v-col>
    </v-row>
    
    
    
    
                
</div>
</template>


<style scoped>

.v-text-field:hover {
   background-color: white;
}
</style>
                 

