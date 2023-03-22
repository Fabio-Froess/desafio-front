import { http } from "./config";

export default {
  listar: () => {
    console.log(http.get("modules"));

    return http.get("modules");
  },

  listarModulo: (id) => {
    return http.get(`modules/${id}`);
  },

  listarModuloTeste: (id_posts) => {
    console.log("animal", id_posts);
    return http.get(`students/${id_posts}`);
  },

  listarModuloPorAluno: (nome) => {
    return http.get(`modules/${nome}`);
  },

  salvarMod: (modulo) => {
    console.log(modulo);
    return http.post("modules", modulo);
  },

  deletarMod: (id) => {
    return http.delete(`modules/${id}`);
  },
};
