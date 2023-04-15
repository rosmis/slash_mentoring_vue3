<template>
    <div class="relative">
        <div
            v-if="src"
            class="bg-cover bg-no-repeat rounded-full"
            :style="{
                backgroundImage: `
                            url(${src})`,
                height: size + 'em',
                width: size + 'em',
            }"
        ></div>

        <div class="-top-2 right-0 absolute">
            <label
                class="rounded-full cursor-pointer bg-[#1A098C] text-white p-2 w-[30px] button primary block hover:bg-[#4540EA]"
                for="single"
            >
                <!-- {{ uploading ? "Uploading ..." : "Upload" }} -->
                <mdicon
                    :name="uploading ? 'loading' : 'pencil'"
                    width="15"
                    height="15"
                    class="text-white"
                    :class="{ 'mdi-spin': uploading }"
                />
            </label>
            <input
                style="visibility: hidden; position: absolute"
                type="file"
                id="single"
                accept="image/*"
                @change="uploadAvatar"
                :disabled="uploading"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import { supabase } from "../../supabase";

const props = defineProps<{
    path: string | null;
    size?: string;
}>();

const { path } = toRefs(props);

const emit = defineEmits(["upload", "update:path"]);
const uploading = ref(false);
const src = ref("");
const files = ref();

const downloadImage = async () => {
    try {
        const { data, error } = await supabase.storage
            .from("avatars")
            .download(path.value);
        if (error) throw error;
        src.value = URL.createObjectURL(data);
    } catch (error) {
        console.error("Error downloading image: ", error.message);
    }
};

const uploadAvatar = async (evt) => {
    files.value = evt.target.files;
    try {
        uploading.value = true;
        if (!files.value || files.value.length === 0) {
            throw new Error(
                "Vous devez selectionner une image pour la télécharger"
            );
        }

        const file = files.value[0];
        const fileExt = file.name.split(".").pop();
        const filePath = `${Math.random()}.${fileExt}`;

        let { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, file);

        if (uploadError) throw uploadError;
        emit("update:path", filePath);
    } catch (error) {
        alert(error.message);
    } finally {
        uploading.value = false;
    }
};

watch(
    path,
    () => {
        if (path.value) downloadImage();
    },
    { immediate: true }
);
</script>
