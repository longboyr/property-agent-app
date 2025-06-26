<!-- src/components/AgentList.vue -->
<template>
  <div class="card">
    <DataTable
      :value="agents"
      :loading="loading"
      stripedRows
      showGridlines
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 25]"
      tableStyle="min-width: 50rem"
      class="p-datatable-sm"
    >
      <Column field="id" header="ID" style="width: 5%"></Column>
      <Column header="Name" style="width: 25%">
        <template #body="slotProps">
          {{ slotProps.data.firstName }} {{ slotProps.data.lastName }}
        </template>
      </Column>
      <Column field="email" header="Email" style="width: 25%"></Column>
      <Column field="mobileNumber" header="Mobile" style="width: 15%"></Column>
      <Column header="Properties" style="width: 10%">
        <template #body="slotProps">
          <span class="font-bold">{{ getPropertyCount(slotProps.data) }}</span>
        </template>
      </Column>
      <Column header="Actions" style="width: 20%">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-text"
              :pt="{
                root: { style: { padding: '0.5rem' } }
              }"
              v-tooltip.top="'Edit'"
              @click="$emit('select', slotProps.data)"
            />
            <Button
              icon="pi pi-list"
              class="p-button-rounded p-button-text p-button-info"
              :pt="{
                root: { style: { padding: '0.5rem' } }
              }"
              v-tooltip.top="'View Properties'"
              @click="$emit('show-properties', slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-danger"
              :pt="{
                root: { style: { padding: '0.5rem' } }
              }"
              v-tooltip.top="'Delete'"
              @click="confirmDelete(slotProps.data)"
            />
          </div>
        </template>
      </Column>
      <template #empty>
        <div class="flex align-items-center justify-content-center p-4">
          <i class="pi pi-users mr-2 text-lg" />
          <span>No agents found</span>
        </div>
      </template>
      <template #loading>
        <div class="flex align-items-center justify-content-center p-4">
          <i class="pi pi-spin pi-spinner mr-2 text-lg" />
          <span>Loading agents...</span>
        </div>
      </template>
    </DataTable>

    <!-- Delete Confirmation Dialog -->
    <Dialog
      v-model:visible="deleteDialogVisible"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
      :closable="false"
      :pt="{
        root: { class: 'border-round-lg' },
        header: { class: 'bg-primary text-white' },
        content: { class: 'p-4' }
      }"
    >
      <div class="flex align-items-center justify-content-center">
        <i class="pi pi-exclamation-triangle mr-3 text-yellow-500" style="font-size: 2rem" />
        <span v-if="agentToDelete">
          Are you sure you want to delete <b>{{ agentToDelete.firstName }} {{ agentToDelete.lastName }}</b>?
        </span>
      </div>
      <template #footer>
        <div class="flex justify-content-end gap-2">
          <Button
            label="No"
            icon="pi pi-times"
            class="p-button-text"
            @click="deleteDialogVisible = false"
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            class="p-button-danger"
            @click="handleDelete"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import type { PropertyAgent } from "../types";

defineProps<{
  agents: PropertyAgent[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "select", agent: PropertyAgent): void;
  (e: "delete", id: string): void;
  (e: "show-properties", agent: PropertyAgent): void;
}>();

const deleteDialogVisible = ref(false);
const agentToDelete = ref<PropertyAgent | null>(null);

function getPropertyCount(agent: PropertyAgent): number {
  return agent.properties?.length || 0;
}

function confirmDelete(agent: PropertyAgent) {
  agentToDelete.value = agent;
  deleteDialogVisible.value = true;
}

function handleDelete() {
  if (agentToDelete.value) {
    deleteDialogVisible.value = false;
    emit("delete", agentToDelete.value.id);
    agentToDelete.value = null;
  }
}
</script>

<style scoped>
.card {
  background: var(--surface-card);
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 
              0px 0px 2px rgba(0, 0, 0, 0.05), 
              0px 1px 4px rgba(0, 0, 0, 0.08);
}
</style>
