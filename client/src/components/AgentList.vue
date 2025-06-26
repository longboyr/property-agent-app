<!-- src/components/AgentList.vue -->
<template>
  <DataTable
    :value="agents"
    :loading="loading"
    responsiveLayout="scroll"
    stripedRows
    class="p-datatable-sm"
  >
    <Column field="id" header="ID"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="email" header="Email"></Column>
    <Column field="phone" header="Phone"></Column>
    <Column header="Properties">
      <template #body="slotProps">
        {{ getPropertyCount(slotProps.data) }}
      </template>
    </Column>
    <Column header="Actions">
      <template #body="slotProps">
        <div class="p-d-flex p-jc-between">
          <Button
            icon="pi pi-pencil"
            class="p-button-text p-button-sm"
            @click="$emit('select', slotProps.data)"
          />
          <Button
            icon="pi pi-list"
            class="p-button-text p-button-info p-button-sm"
            @click="$emit('show-properties', slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-text p-button-danger p-button-sm"
            @click="confirmDelete(slotProps.data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>

  <Dialog
    v-model:visible="deleteDialogVisible"
    header="Confirm Delete"
    :style="{ width: '350px' }"
    modal
  >
    <div class="p-m-0">Are you sure you want to delete this agent?</div>
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
        class="p-button-text p-button-danger"
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
