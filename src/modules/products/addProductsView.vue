<script lang="ts">

export default {
  data() {
    return {
      visible: true,
    };
  },
}

</script>

<!-- <template>
  <div>
    <v-row>
      <v-col cols="4">
        <div class="d-flex flex-column align-center">
          <v-icon large color="grey lighten-1">mdi-image</v-icon>
          <v-btn text class="my-2">Agregar imagen</v-btn>
          <v-btn text>Agregar URL del video</v-btn>
        </div>
      </v-col>
      <v-col cols="8">
        <div>
          <v-text-field label="Nombre del producto *" outlined></v-text-field>
          <v-text-field label="Descripcion" outlined></v-text-field>

          <v-row>
            <v-col cols="6">
              <v-text-field label="Marca" outlined></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Stock" outlined></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field label="Precio" prefix="$" outlined></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Ganancia" prefix="$" outlined></v-text-field>
            </v-col>
          </v-row>

          <v-text-field label="Descuento" prefix="$" outlined></v-text-field>

          <v-select
            :items="['Ninguna']"
            label="Categoría del producto"
            outlined
          ></v-select>

          <v-switch
            v-model="visible"
            label="Visible en mi tienda"
            color="green"
            inset
          ></v-switch>

          <v-row>
            <v-col cols="6">
              <v-btn block color="primary">Guardar</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="grey lighten-1">Cancelar</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template> -->

<template>
  <div>
    <v-row>
      <v-col cols="12" md="4">
        <div class="d-flex flex-column align-center">
          <v-icon large color="grey lighten-1">mdi-image</v-icon>
          <v-btn text class="my-2">Agregar imagen</v-btn>
          <v-btn text>Agregar URL del video</v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <div>
          <v-text-field label="Nombre del producto *" outlined full-width></v-text-field>
          <v-text-field label="Descripcion" outlined full-width></v-text-field>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Marca" outlined full-width></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Stock" outlined full-width></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field label="Precio" prefix="$" outlined full-width></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Ganancia" prefix="$" outlined full-width></v-text-field>
            </v-col>
          </v-row>

          <v-text-field label="Descuento" prefix="$" outlined full-width></v-text-field>

          <v-select
            :items="['Ninguna']"
            label="Categoría del producto"
            outlined
            full-width
          ></v-select>

          <v-switch
            v-model="visible"
            label="Visible en mi tienda"
            color="green"
            inset
          ></v-switch>

          <v-row>
            <v-col cols="12" md="6">
              <v-btn block color="primary">Guardar</v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn block color="grey lighten-1">Cancelar</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style>

</style>