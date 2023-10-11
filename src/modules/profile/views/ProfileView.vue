<script setup lang="ts">
import useUser from '@/composables/useUser';
import { formatDate } from '@/helpers/getFormatdate';

import { ref, type Ref } from 'vue';
import { VDatePicker } from 'vuetify/labs/VDatePicker';
import { UploadProfileImg } from '@/vueutils/UseBucket';
import { InsertData,UpdateData } from '@/vueutils/UseTables';



const { GetUser, User:form } = useUser();

const url = ref<string | null>(null);

const image: Ref<Blob | null | File[]> = ref(null);

    GetUser();


const PreviewImage = (e:any) => {
    console.log(e.target.files[0]);
    image.value = e.target.files[0];
  url.value = URL.createObjectURL(e.target.files[0]);
};

const UpdateValues = async() => {
    
    let url = null;
    if(image.value){
         url = await UploadProfileImg(image.value, 'profile_photos');
    }
    

    if(form.value.id_perfil){
        if(url){
            form.value.foto_de_perfil = url ;
        }
        console.log(form.value);
        await UpdateData( form.value, 'perfiles', form.value.id_perfil, 'id_perfil');
    }
    else{
        if(url){
            form.value.foto_de_perfil = url ;
        }
        await InsertData( form.value, 'perfiles');

    }

}

const showDatepicker = ref(false);
const date = ref(new Date());

const changueDate = () => {
    console.log(date.value);
    form.value.fecha_de_nacimiento = formatDate(date.value);
}

</script>

<template>
<div>
    <v-row>
        <v-col cols="12" md="6" xl="12">
            <h1>Informacion Personal</h1>     
        </v-col>
        <v-col cols="12" md="6" xl="12" class="d-flex justify-end">
            <v-btn variant="text" class="btnclass"
            @click.prevent="UpdateValues"
            >
                <a class="btnclass-text">
                Actualizar
                </a>
            </v-btn>
        </v-col>
    </v-row>
    <v-row>

        <v-col cols="12" md="4" xl="4">
            
            <v-col cols="12" md="12" xl="12">
            <div style="display: flex; justify-content: center; width: 80%;margin-left: 10%;max-height: 200px;">
                <v-img
                :src="url || form.foto_de_perfil"
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
                    
                        <v-text-field
                            v-model="form.fecha_de_nacimiento"
                            label="Fecha de Nacimiento"
                            type="text"
                            class="mx-auto max-w-[400px] bg-white"
                            readonly
                            @click.prevent="() => showDatepicker= true"
                        />
                    
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
            <v-row>
                <v-col cols="12" md="6" xl="6">
                        <v-text-field
                            v-model="form.telefono"
                            label="Telefono"
                            type="number"
                        />
                    </v-col>
                <v-col cols="12" md="6" xl="6">
                        <v-text-field
                            v-model="form.no_dui"
                            label="Dui"
                            type="number"
                        />
                </v-col>
                   
            </v-row>
        </v-col>
    </v-row>
    
    <v-dialog
        v-model="showDatepicker"
    >
    <div
    class="d-flex justify-center align-center"
    >   
        <v-date-picker
        title="seleccione fecha"
        input-placeholder="seleccione fecha"
        cancel-text="cancelar"
        header="Escriba fecha"
        input-text="Escriba una fecha"
        v-model="date"
        @click:cancel="showDatepicker = false"
        @click:save="showDatepicker = false; changueDate()"
        >
        </v-date-picker>
    </div>
  

    </v-dialog>
    
    
    
                
</div>
</template>


<style scoped>

.v-text-field:hover {
   background-color: white;
}


.btnclass {
  margin-left: 10px;
  margin-right: 10px;
  background-color: rgb(57, 203, 44);
  
}

.btnclass-text {
  color: white !important;
  text-transform: none;
  font-family: 'Roboto', sans-serif;
  /* font-weight: bold; */
}

</style>
                 

