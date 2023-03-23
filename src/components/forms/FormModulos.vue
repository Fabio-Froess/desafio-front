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
        <q-btn color="primary" label="Cancelar" @click="cancelarAcao" />
      </div>
    </div>
  </div>
</template>
<script setup>
import modulos from "src/services/modulos";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const { id } = route.params;

const form = ref({
  name: "",
  grade1: null,
  grade2: null,
  grade3: null,
  studentCpf: "",
});

onMounted(async () => {
  if (id) {
    const { data } = await modulos.listarModulo(id);

    form.value = data;
  }
});
const router = useRouter();

function cancelarAcao(id) {
  router.push(`/paginamodulos/${id}`);
}

async function executaAcao() {
  form.value.grade1 = parseFloat(form.value.grade1);
  form.value.grade2 = parseFloat(form.value.grade2);
  form.value.grade3 = parseFloat(form.value.grade3);
  form.value.studentCpf = sessionStorage.getItem("cpf_aluno");
  if (id) {
    await modulos.editarMod(id, form.value);
  } else {
    await modulos.salvar(form.value);
  }
}
</script>
