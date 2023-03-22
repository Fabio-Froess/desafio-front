<template>
  <div class="row row-login">
    <div
      class="col-sm-5 left-login"
      style="display: flex; justify-content: center; align-items: center"
    >
      <div class="col-8">
        <h2 class="title-login">Faça Login</h2>

        <div class="q-pt-sm" style="max-width: 400px">
          <q-form @submit.prevent="login" @reset="onReset" class="form">
            <q-input
              filled
              type="email"
              v-model="dadosUsuario.email"
              label="Digite seu e-mail *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor digite seu email',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="dadosUsuario.password"
              label="Digite sua senha *"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Por favor digite sua senha',
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
              label="Entrar"
              type="submit"
            />
            <q-btn icon="person_add" label="Não tenho conta" to="/registro" />
          </q-form>
        </div>
      </div>
    </div>
    <div class="col">
      <img src="../assets/login.svg" class="img-login" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import usuarios from "src/services/usuarios";
import { useRouter } from "vue-router";

const router = useRouter();

const dadosUsuario = ref({
  email: "",
  password: "",
});

async function login() {
  const { email, password } = dadosUsuario.value;
  const user = await usuarios.realizarLogin(email, password);
  console.log(user.data);
  if (user.data.length > 0) {
    router.push("/paginahome");
  }
}

function onReset() {}
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

.row-login {
  margin-left: 0;
  height: 100vh;
}
.left-login {
  background-color: #d4d0d0;
  height: 100vh;
}

.img-login {
  width: 600px;
  height: 600px;
}

.es {
  display: flex;
  margin-bottom: 10px;
}

.title-login {
  text-align: center;
  font-weight: bold;
  font-size: 35px;
}
</style>
