import { http } from "./config";

export default {
  listar: () => {
    console.log(http.get("users"));

    return http.get("users");
  },
  listarUsuario: (id) => {
    return http.get(`users/${id}`);
  },
  salvar: (usuario) => {
    console.log(usuario);
    return http.post("users", usuario);
  },
  deletar: (id) => {
    return http.delete(`users/${id}`);
  },
  editar: (id, usuario) => {
    return http.put(`users/${id}`, usuario);
  },
  realizarLogin: (email, senha) => {
    return http.get("/users", {
      params: {
        email,
        senha,
      },
    });
  },
};
