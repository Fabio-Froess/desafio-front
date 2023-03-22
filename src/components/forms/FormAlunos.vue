<template>
  <div
    class="container q-pt-xl"
    style="max-width: 50%; min-width: 300px; margin: 0 auto"
  >
    <div class="row q-pb-xs">
      <div class="col-sm-6 q-pr-xs">
        <q-input v-model="form.name" filled label="Nome Completo" />
      </div>
    </div>
    <div class="row q-pb-xs">
      <div class="col-sm-6 q-pr-xs">
        <q-input v-model="form.cpf" filled label="CPF" />
      </div>
    </div>
    <!-- <div class="row q-pb-xs">
      <div class="col-sm-6 q-pr-xs">
        <q-input v-model="form.modulo" filled label="Módulo" />
      </div>
      <div class="col-sm-6 q-pr-xs">
        <q-input v-model="form.status" filled label="Status" />
      </div>
    </div> -->
    <div class="row">
      <div class="col-md-4">
        <q-input type="date" v-model="form.birth_date" filled />
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
          to="/paginaalunos"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import alunos from "src/services/alunos";
import { useRoute } from "vue-router";

const route = useRoute();

const { id } = route.params;

const form = ref({
  name: "",
  cpf: "",
  // modulo: "",
  // status: "",
  birth_date: "",
});

onMounted(async () => {
  if (id) {
    const { data } = await alunos.listarAluno(id);

    form.value = data;
  }
});

async function executaAcao() {
  form.value.birth_date = new Date(form.value.birth_date).toISOString();
  console.log(form.value);
  if (id) {
    const { name, cpf, birth_date } = form.value;
    await alunos.editar(id, { name, cpf, birth_date });
  } else {
    await alunos.salvar(form.value);
  }
}
</script>
