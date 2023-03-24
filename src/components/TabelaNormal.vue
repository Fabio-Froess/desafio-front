<template>
  <div>
    <h4 style="text-align: center">
      Sistema de gerenciamento de módulos avaliativos.
    </h4>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import alunos from "src/services/alunos";
import { onMounted, ref } from "vue";
export default {
  name: "TabelaNormal",
  setup() {
    const filter = ref("");

    const columns = [
      {
        name: "name",
        required: true,
        label: "Nome",
        align: "left",
        field: "name",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "cpf",
        align: "center",
        label: "CPF",
        field: "cpf",
        sortable: true,
      },
      {
        name: "modulo",
        label: "Modulos",
        field: "modulo",
        sortable: true,
        align: "center",
      },
      { name: "situacao", label: "Status", field: "situacao", align: "center" },
      {
        name: "birth_date",
        label: "Data de Nascimento",
        field: "birth_date",
        align: "center",
      },
    ];
    const rows = ref([]);

    onMounted(() => {
      listarAlunos();
    });

    const listarAlunos = async () => {
      try {
        const { data } = await alunos.listar();
        console.log(data);
        rows.value = data;
      } catch (error) {
        console.log(error);
      }
    };
    return {
      columns,
      rows,
    };
  },
};
</script>
