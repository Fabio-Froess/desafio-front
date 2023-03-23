<template>
  <div class="q-pa-md">
    <q-table title="Alunos" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Adcionar Aluno"
          @click="adicionarAluno()"
        />
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body-cell-acao="props">
        <q-td :props="props">
          <div>
            <q-btn
              class="q-mr-sm"
              size="sm"
              round
              color="primary"
              icon="edit"
              @click="editarAluno(props.row.id)"
            />

            <q-btn
              class="q-mr-sm"
              size="sm"
              round
              color="red"
              icon="delete"
              @click="deletarAluno(props.row.id)"
            />

            <q-btn
              size="sm"
              round
              color="primary"
              icon="info"
              @click="verAluno(props.row.id)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import alunos from "src/services/alunos";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "TabelaAcoes",
  setup() {
    const columns = [
      {
        name: "name",
        required: true,
        label: "Nome",
        align: "center",
        field: "name",
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "cpf",
        align: "center",
        label: "CPF",
        field: (row) => row.cpf,
        sortable: true,
      },
      // {
      //   name: "modulo",
      //   label: "Modulo",
      //   field: "modulo",
      //   sortable: true,
      //   align: "center",
      // },
      // { name: "situacao", label: "Status", field: "situacao", align: "center" },
      {
        name: "birth_date",
        label: "Data de Nascimento",
        field: "birth_date",
        align: "center",
      },
      { name: "acao", label: "Ações", align: "center" },
    ];

    const rows = ref([]);

    async function deletarAluno(id) {
      alert("Deseja realmente deletar?");
      await alunos.deletar(id);
      listarAlunos();
    }

    onMounted(() => {
      window.sessionStorage.setItem("cpf_aluno", "");
      listarAlunos();
    });

    const router = useRouter();

    function adicionarAluno() {
      console.log("aqui");
      router.push("/adicionar");
    }

    const listarAlunos = async () => {
      try {
        const { data } = await alunos.listar();
        console.log("aqui", data);
        rows.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    function editarAluno(id) {
      router.push(`/editar/${id}`);
    }

    function verAluno(id) {
      console.log("ver aluno", id);
      router.push(`/paginamodulos/${id}`);
      listarAlunos();
    }

    return {
      columns,
      rows,
      deletarAluno,
      adicionarAluno,
      editarAluno,
      verAluno,
    };
  },
};
</script>
