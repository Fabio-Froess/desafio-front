<template>
  <div class="q-pa-md">
    <h1>{{ aluno.name }}</h1>
    <q-table title="Alunos" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:top>
        <q-btn
          color="primary"
          label="Adcionar Módulo"
          @click="adicionarModulo()"
        />
        <q-space />
        <q-input borderless dense debounce="300" color="primary">
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
              size="sm"
              round
              color="red"
              icon="delete"
              @click="deletarAluno(props.row.id)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import alunos from "src/services/alunos";
import modulos from "src/services/modulos";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { route } from "quasar/wrappers";
import router from "src/router";
export default {
  name: "TabelaAcoes",
  setup() {
    const columns = [
      // {
      //   name: "name",
      //   required: true,
      //   label: "Módulo",
      //   align: "center",
      //   field: "nome",
      //   format: (val) => `${val}`,
      //   sortable: true,
      // },
      // {
      //   name: "cpf",
      //   align: "center",
      //   label: "CPF",
      //   field: (row) => row.cpf,
      //   sortable: true,
      // },
      {
        name: "name",
        label: "Modulo",
        field: "name",
        sortable: true,
        align: "center",
      },
      {
        name: "grade1",
        label: "1ª Nota",
        field: "grade1",
        sortable: true,
        align: "center",
      },
      {
        name: "grade2",
        label: "2ª Nota",
        field: "grade2",
        sortable: true,
        align: "center",
      },
      {
        name: "grade3",
        label: "3ª Nota",
        field: "grade3",
        sortable: true,
        align: "center",
      },
      { name: "situacao", label: "Status", field: "situacao", align: "center" },

      { name: "acao", label: "Ações", align: "center" },
    ];

    const rows = ref([]);

    const aluno = ref("");

    async function deletarAluno(id) {
      alert("Deseja realmente deletar?" + id);
      await alunos.deletar(id);
      listarModulos();
    }

    onMounted(async () => {
      modulosAlunos();
    });

    const modulosAlunos = async () => {
      try {
        const { data } = await alunos.listarAluno(id);
        aluno.value = data;
        window.sessionStorage.setItem("cpf_aluno", data.cpf);
        console.log("aluno", data.modules, data);
        rows.value = data.modules;
      } catch (error) {
        console.log(error);
      }
    };

    const route = useRoute();

    const { id } = route.params;

    const router = useRouter();

    function adicionarModulo() {
      console.log("aqui");
      router.push("/adicionarMod");
    }

    // const listarAluno = async () => {};

    async function buscarAluno() {
      try {
        const result = await alunos.listarAluno(id);

        const nome = result.data.nome;
        return nome;
      } catch (error) {
        console.log(error);
      }
    }
    function editarAluno(id) {
      router.push(`/editar/${id}`);
    }

    return {
      columns,
      rows,
      deletarAluno,
      adicionarModulo,
      editarAluno,
      aluno,
      id,
    };
  },
};
</script>
