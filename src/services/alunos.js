import { http } from "./config";

export default {
  listar: () => {
    console.log(http.get("students"));

    return http.get("students");
  },
  listarAluno: (id) => {
    return http.get(`students/${id}`);
  },
  salvar: (aluno) => {
    console.log(aluno);
    return http.post("students", aluno);
  },
  deletar: (id) => {
    return http.delete(`students/${id}`);
  },
  editar: (id, aluno) => {
    return http.patch(`students/${id}`, aluno);
  },
};
