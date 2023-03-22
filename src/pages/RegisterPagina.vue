<template>
  <div class="row row-register">
    <div class="col">
      <img src="../assets/register.svg" class="img-register" />
    </div>
    <div
      class="col-sm-5 right-register"
      style="display: flex; justify-content: center; align-items: center"
    >
      <div class="col-8">
        <h2 class="title-register">Faça o seu cadastro</h2>

        <div class="q-pt-sm" style="max-width: 400px">
          <q-form
            @submit.prevent="salvarUsuario"
            @reset="onReset"
            class="form"
            greedy
          >
            <q-input
              filled
              type="text"
              v-model="form.nome"
              label="Digite seu nome *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor digite algo',
              ]"
            />
            <q-input
              filled
              type="email"
              v-model="form.email"
              label="Digite seu e-mail *"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Por favor digite algo',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="form.senha"
              label="Digite sua senha *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor digite sua senha',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="confirmpassword"
              label="Confirme sua senha *"
              lazy-rules
              :rules="[
                (val) => verificarSenha(val) || 'As senhas devem ser iguais',
              ]"
            />
            <div>
              <label class="es">
                <small><a href="#">Esqueci minha senha!</a></small>
              </label>
            </div>

            <q-btn
              class="q-mr-sm"
              color="primary"
              icon="login"
              label="Cadastrar"
              type="submit"
            />
            <q-btn icon="arrow_back" label="Voltar" to="/" />
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import usuarios from "src/services/usuarios";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  nome: "",
  email: "",
  senha: "",
});

const confirmpassword = ref("");

function verificarSenha(item) {
  if (item === form.value.senha) {
    return true;
  } else {
    return false;
  }
}
function salvarUsuario() {
  usuarios.salvar(form.value);

  router.push("/");
  //form.value.nome="";
}
</script>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.row-register {
  margin-left: 0;
  height: 100vh;
}
.right-register {
  background-color: #d4d0d0;
  height: 100vh;
}

.img-register {
  width: 600px;
  height: 600px;
}

.es {
  display: flex;
  margin-bottom: 10px;
}

.title-register {
  text-align: center;
  font-weight: bold;
  font-size: 35px;
}
</style>
