<template>
  <h3 style="text-align: center">Nome do aluno</h3>
  <div
    class="container q-pt-xl"
    style="max-width: 50%; min-width: 300px; margin: 0 auto"
  >
    <div class="row q-pb-xs">
      <div class="col-sm-6 q-pr-xs">
        <q-input v-model="form.name" filled label="Módulo" />
      </div>
    </div>
    <div class="row q-pb-xs">
      <div class="col-sm-6 q-pr-xs">
        <q-input v-model="form.grade1" filled label="1ª Nota" />
      </div>
    </div>
    <div class="row q-pb-xs">
      <div class="col-sm-6 q-pr-xs">
        <q-input v-model="form.grade2" filled label="2ª Nota" />
      </div>
    </div>
    <div class="row q-pb-xs">
      <div class="col-sm-6 q-pr-xs">
        <q-input v-model="form.grade3" filled label="3ª Nota" />
      </div>
    </div>

    <div class="row q-pt-md">
      <div class="col q-gutter-md">
        <q-btn
          color="primary"
          label="Salvar"
          @click="executaAcao"
          padding="7px 25px"
        />
        <q-btn
          color="primary"
          label="Cancelar"
          @click="cancelar"
          to="/paginamodulos"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import modulos from "src/services/modulos";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const { id } = route.params;

const form = ref({
  name: "",
  grade1: "",
  grade2: "",
  grade3: "",
  studentcpf: "",
});

onMounted(async () => {
  if (id) {
    const { data } = await modulos.listarModulo(id);

    form.value = data;
  }
});

async function executaAcao() {
  if (id) {
    await modulos.editarMod(id, form.value);
  } else {
    await modulos.salvarMod(form.value);
  }
}
</script>
