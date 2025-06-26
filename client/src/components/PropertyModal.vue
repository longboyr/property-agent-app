<!-- src/components/PropertyModal.vue -->
<template>
  <Dialog 
    :visible="visible" 
    :header="agent ? `Properties for ${agent.name}` : 'Properties'"
    :modal="true"
    :closable="true"
    :style="{width: '80vw'}"
    @hide="$emit('close')"
  >
    <div v-if="agent" class="property-modal-content">
      <div v-if="loading" class="loading-container">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <p>Loading properties...</p>
      </div>
      
      <div v-else-if="properties.length === 0" class="empty-state">
        <p>No properties found for this agent.</p>
        <Button label="Add Property" icon="pi pi-plus" @click="showAddPropertyForm = true" />
      </div>
      
      <div v-else class="properties-container">
        <DataTable :value="properties" responsiveLayout="scroll">
          <Column field="id" header="ID"></Column>
          <Column field="address" header="Address"></Column>
          <Column header="Actions">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-text p-button-rounded" @click="editProperty(slotProps.data)" />
              <Button icon="pi pi-eye" class="p-button-text p-button-rounded" @click="viewPropertyDetails(slotProps.data)" />
            </template>
          </Column>
        </DataTable>
        
        <div class="p-mt-3">
          <Button label="Add Property" icon="pi pi-plus" @click="showAddPropertyForm = true" />
        </div>
      </div>
      
      <!-- Add/edit property form would go here (to be implemented) -->
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { usePropertyStore } from '../stores/propertyStore';
import type { PropertyAgent, Property } from '../types';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

// Props and emits
const props = defineProps<{
  visible: boolean;
  agent: PropertyAgent | null;
}>();

defineEmits<{
  (e: 'close'): void;
}>();

// Store
const propertyStore = usePropertyStore();
const properties = computed(() => propertyStore.properties);
const loading = computed(() => propertyStore.loading);
const showAddPropertyForm = ref(false);

// Methods
const editProperty = (property: Property) => {
  // To be implemented
  console.log('Edit property:', property);
};

const viewPropertyDetails = (property: Property) => {
  // To be implemented
  console.log('View property details:', property);
};

// Load properties when modal becomes visible with an agent
watch(() => props.visible && props.agent, (shouldLoad) => {
  if (shouldLoad && props.agent) {
    propertyStore.fetchAgentProperties(props.agent.id);
  }
}, { immediate: true });

// Clean up when modal is closed
watch(() => props.visible, (isVisible) => {
  if (!isVisible) {
    showAddPropertyForm.value = false;
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
  height: 200px;
}

.empty-state {
  text-align: center;
  padding: 2rem;
}
</style>
