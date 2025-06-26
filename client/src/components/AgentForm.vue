<!-- src/components/AgentForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="flex flex-column gap-3">
    <div class="field">
      <label for="name" class="font-bold">Name</label>
      <InputText
        id="name"
        v-model="formData.name"
        :class="{ 'p-invalid': v$.name.$error }"
        aria-describedby="name-help"
        placeholder="Enter agent name"
      />
      <small v-if="v$.name.$error" id="name-help" class="p-error">{{
        v$.name.$errors[0].$message
      }}</small>
    </div>

    <div class="field">
      <label for="email" class="font-bold">Email</label>
      <InputText
        id="email"
        v-model="formData.email"
        :class="{ 'p-invalid': v$.email.$error }"
        aria-describedby="email-help"
        placeholder="Enter agent email"
      />
      <small v-if="v$.email.$error" id="email-help" class="p-error">{{
        v$.email.$errors[0].$message
      }}</small>
    </div>

    <div class="field">
      <label for="phone" class="font-bold">Phone</label>
      <InputText
        id="phone"
        v-model="formData.phone"
        :class="{ 'p-invalid': v$.phone.$error }"
        aria-describedby="phone-help"
        placeholder="Enter agent phone"
      />
      <small v-if="v$.phone.$error" id="phone-help" class="p-error">{{
        v$.phone.$errors[0].$message
      }}</small>
    </div>

    <div class="field">
      <label for="address" class="font-bold">Address</label>
      <InputText 
        id="address" 
        v-model="formData.address" 
        placeholder="Enter agent address"
      />
    </div>

    <div class="flex justify-content-between mt-4">
      <Button
        type="button"
        label="Clear"
        class="p-button-outlined p-button-secondary"
        icon="pi pi-times"
        @click="resetForm"
      />
      <Button
        type="submit"
        label="Save"
        icon="pi pi-check"
        :loading="loading"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import type { PropertyAgent, CreateAgentDTO } from "../types";
import { useAgentStore } from "../stores/agentStore";

const props = defineProps<{
  agent: PropertyAgent | null;
}>();

const emit = defineEmits<{
  (e: "submit", data: CreateAgentDTO): void;
  (e: "reset"): void;
}>();

const agentStore = useAgentStore();
const loading = computed(() => agentStore.loading);

const formData = reactive<CreateAgentDTO>({
  name: "",
  email: "",
  phone: "",
  address: "",
});

const rules = {
  name: { required },
  email: { required, email },
  phone: { required },
};

const v$ = useVuelidate(rules, formData);

// Watch for changes to the agent prop and update the form
watch(
  () => props.agent,
  (newAgent) => {
    if (newAgent) {
      formData.name = newAgent.name;
      formData.email = newAgent.email;
      formData.phone = newAgent.phone;
      formData.address = newAgent.address || "";
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

async function handleSubmit() {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  emit("submit", { ...formData });
}

function resetForm() {
  v$.value.$reset();
  formData.name = "";
  formData.email = "";
  formData.phone = "";
  formData.address = "";
  emit("reset");
}
</script>
