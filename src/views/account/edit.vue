<template>
  <ui-wrapper container>
    <ui-level class="flex-col" vertical-align="top">
      <ui-level class="w-full">
        <h1>Modifier mon profil</h1>
        <router-link
          class="rounded-lg bg-blue-800 text-white py-2 px-4"
          :to="{ name: 'Account' }"
        >
          Retour
        </router-link>
      </ui-level>
      <form v-if="user" class="form-widget" @submit.prevent="updateProfile">
        <ui-profile-picture
          :path="avatar_path"
          @update:path="avatar_path = $event"
          size="5"
          class="rounded"
        />
        <div>
          <label for="email">Email</label>
          <input
            id="email"
            type="text"
            :value="userSession.user.email"
            disabled
          />
        </div>
        <div>
          <label for="fullname">Prénom + Nom</label>
          <input id="fullname" type="text" v-model="fullname" />
        </div>
        <div>
          <label for="username">Username</label>
          <input id="username" type="text" v-model="username" />
        </div>
        <div>
          <label for="website">Website</label>
          <input id="website" type="website" v-model="website" />
        </div>

        <div>
          <input
            type="submit"
            class="button primary block"
            :value="loading ? 'Loading ...' : 'Update'"
            :disabled="loading"
          />
        </div>
      </form>
    </ui-level>
  </ui-wrapper>
</template>

<script lang="ts" setup>
import { useMessage } from "naive-ui";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../../store/user";
import { supabase } from "../../supabase";
import { userSession } from "../../types/userSession";

const router = useRouter();
const user = userStore();
const message = useMessage();

onMounted(() => user.handleUserSessionInfos());

const loading = ref(true);
const username = ref<string>("");
const fullname = ref<string>("");
const website = ref<string>("");
const avatar_path = ref<string>("");

loading.value = true;

if (user.data) {
  username.value = user.data.username;
  website.value = user.data.website;
  avatar_path.value = user.data.avatar_url;
  fullname.value = user.data.full_name;
}
loading.value = false;

async function updateProfile() {
  try {
    loading.value = true;
    const updates = {
      id: userSession.value.user.id,
      username: username.value,
      website: website.value,
      full_name: fullname.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    };
    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) throw error;

    message.success("Vos informations ont bien été enregistrées");
    router.push({ name: "Account" });
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>
