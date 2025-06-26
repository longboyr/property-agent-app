<!-- src/components/AgentList.vue -->
<template>
  <div class="card">
    <DataTable
      :value="agents"
      :loading="loading"
      responsiveLayout="scroll"
      stripedRows
      showGridlines
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 25]"
      tableStyle="min-width: 50rem"
      class="p-datatable-sm"
    >
      <Column field="id" header="ID" style="width: 5%"></Column>
      <Column field="name" header="Name" style="width: 25%"></Column>
      <Column field="email" header="Email" style="width: 25%"></Column>
      <Column field="phone" header="Phone" style="width: 15%"></Column>
      <Column header="Properties" style="width: 10%">
        <template #body="slotProps">
          <span class="font-bold">{{ getPropertyCount(slotProps.data) }}</span>
        </template>
      </Column>
      <Column header="Actions" style="width: 20%">
        <template #body="slotProps">
          <div class="flex justify-content-between gap-2">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-text"
              tooltip="Edit"
              tooltipOptions="top"
              @click="$emit('select', slotProps.data)"
            />
            <Button
              icon="pi pi-list"
              class="p-button-rounded p-button-text p-button-info"
              tooltip="View Properties"
              tooltipOptions="top"
              @click="$emit('show-properties', slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-danger"
              tooltip="Delete"
              tooltipOptions="top"
              @click="confirmDelete(slotProps.data)"
            />
          </div>
        </template>
      </Column>

      <template #empty>
        <div class="flex align-items-center justify-content-center p-5">
          <i class="pi pi-info-circle mr-2" style="font-size: 1.5rem"></i>
          <span>No agents found</span>
        </div>
      </template>

      <template #loading>
        <div class="flex align-items-center justify-content-center p-5">
          <i class="pi pi-spin pi-spinner mr-2" style="font-size: 2rem"></i>
          <span>Loading agents...</span>
        </div>
      </template>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="deleteDialogVisible"
    header="Confirm Delete"
    :modal="true"
    :style="{ width: '450px' }"
    :closable="false"
    class="p-fluid"
  >
    <div class="flex align-items-center justify-content-center p-4">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem; color: var(--orange-500)"></i>
      <span>Are you sure you want to delete this agent?</span>
    </div>
    <template #footer>
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
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import type { PropertyAgent } from "../types";

const props = defineProps<{
  agents: PropertyAgent[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "select", agent: PropertyAgent): void;
  (e: "delete", id: number): void;
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
    emit("delete", agentToDelete.value.id);
    deleteDialogVisible.value = false;
    agentToDelete.value = null;
  }
}
</script>

<style scoped>
.card {
  background: var(--surface-card);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 
              0px 0px 2px rgba(0, 0, 0, 0.05), 
              0px 1px 4px rgba(0, 0, 0, 0.08);
}
</style>
