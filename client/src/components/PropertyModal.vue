<!-- src/components/PropertyModal.vue -->
<template>
  <Dialog 
    :visible="visible" 
    :header="agent ? `Properties for ${agent.firstName} ${agent.lastName}` : 'Properties'"
    :modal="true"
    :closable="true"
    :style="{width: '80vw'}"
    :pt="{
      root: { class: 'border-round-lg' },
      header: { class: 'bg-primary text-white' }
    }"
    @update:visible="$emit('update:visible', $event)"
  >
    <div v-if="agent" class="property-modal-content">
      <div v-if="loading" class="loading-container">
        <i class="pi pi-spin pi-spinner text-primary" style="font-size: 2rem"></i>
        <p>Loading properties...</p>
      </div>
      
      <div v-else-if="properties.length === 0" class="empty-state">
        <i class="pi pi-home text-primary mb-3" style="font-size: 2rem"></i>
        <p>No properties found for this agent.</p>
        <Button 
          label="Add Property" 
          icon="pi pi-plus" 
          class="p-button-primary" 
          @click="showAddPropertyForm = true" 
        />
      </div>
      
      <div v-else class="properties-container">
        <DataTable 
          :value="properties" 
          stripedRows
          showGridlines
          class="p-datatable-sm"
        >
          <Column field="id" header="ID" style="width: 10%"></Column>
          <Column field="address" header="Address" style="width: 50%"></Column>
          <Column field="propertyType" header="Type" style="width: 20%"></Column>
          <Column header="Actions" style="width: 20%">
            <template #body="slotProps">
              <div class="flex gap-2">
                <Button 
                  icon="pi pi-pencil" 
                  class="p-button-text p-button-rounded" 
                  v-tooltip.top="'Edit'"
                  @click="editProperty(slotProps.data)" 
                />
                <Button 
                  icon="pi pi-eye" 
                  class="p-button-text p-button-rounded p-button-info" 
                  v-tooltip.top="'View Details'"
                  @click="viewPropertyDetails(slotProps.data)" 
                />
              </div>
            </template>
          </Column>
        </DataTable>
        
        <div class="mt-3 flex justify-content-end">
          <Button 
            label="Add Property" 
            icon="pi pi-plus" 
            class="p-button-primary" 
            @click="showAddPropertyForm = true" 
          />
        </div>
      </div>
      
      <!-- Add/edit property form would go here (to be implemented) -->
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { usePropertyStore } from '../stores/propertyStore';
import type { PropertyAgent, Property } from '../types';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps<{
  modelValue: boolean;
  agent: PropertyAgent | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const propertyStore = usePropertyStore();
const loading = computed(() => propertyStore.loading);
const properties = computed(() => propertyStore.properties);
const showAddPropertyForm = ref(false);

// Methods
function editProperty(property: Property) {
  // To be implemented
  console.log('Edit property:', property);
}

function viewPropertyDetails(property: Property) {
  // To be implemented
  console.log('View property details:', property);
}

// Load properties when modal becomes visible with an agent
watch(() => visible.value && props.agent, (shouldLoad) => {
  if (shouldLoad && props.agent) {
    propertyStore.fetchAgentProperties(props.agent.id);
  }
});
</script>

<style scoped>
.property-modal-content {
  min-height: 300px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: 1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  gap: 0.5rem;
}

.properties-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
