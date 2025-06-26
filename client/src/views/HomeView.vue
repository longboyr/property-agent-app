<template>
  <div class="agent-manager w-full">

    <Toast position="top-right" />

    <div class="w-full">
      <!-- Agent Form -->
      <div class="card mb-4">
        <h3 class="mb-3">{{ formTitle }}</h3>
        <AgentForm 
          :agent="selectedAgent" 
          @submit="handleFormSubmit" 
          @reset="handleFormReset" 
        />
      </div>
      
      <!-- Agent List -->
      <div class="card">
        <h3 class="mb-3">Property Agents</h3>
        <AgentList 
          :agents="agents" 
          :loading="loading" 
          @select="selectAgent" 
          @delete="deleteAgent"
          @show-properties="showAgentProperties" 
        />
      </div>
    </div>
    
    <!-- Property Modal -->
    <PropertyModal 
      v-model:visible="propertyModalVisible" 
      :agent="selectedAgent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import type { PropertyAgent, CreateAgentDTO } from '../types';
import { useAgentStore } from '../stores/agentStore';
import AgentForm from '../components/AgentForm.vue';
import AgentList from '../components/AgentList.vue';
import PropertyModal from '../components/PropertyModal.vue';

const agentStore = useAgentStore();
const toast = useToast();
const agents = computed(() => agentStore.agents);
const selectedAgent = computed(() => agentStore.selectedAgent);
const loading = computed(() => agentStore.loading);

const propertyModalVisible = ref(false);
const formTitle = computed(() => selectedAgent.value ? 'Update Agent' : 'Add New Agent');

onMounted(async () => {
  try {
    await agentStore.fetchAgents();
  } catch (error) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: 'Failed to load agents', 
      life: 3000 
    });
  }
});

async function handleFormSubmit(agent: CreateAgentDTO) {
  try {
    if (selectedAgent.value) {
      await agentStore.updateAgent(selectedAgent.value.id, agent);
      toast.add({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Agent updated successfully', 
        life: 3000 
      });
    } else {
      await agentStore.createAgent(agent);
      toast.add({ 
        severity: 'success', 
        summary: 'Success', 
        detail: 'Agent created successfully', 
        life: 3000 
      });
    }
    // Clear form after successful operation
    agentStore.clearSelectedAgent();
  } catch (error: any) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: error.message || 'An error occurred while saving the agent', 
      life: 5000 
    });
  }
}

function handleFormReset() {
  agentStore.clearSelectedAgent();
  toast.add({ 
    severity: 'info', 
    summary: 'Form Reset', 
    detail: 'Agent form has been cleared', 
    life: 3000 
  });
}

function selectAgent(agent: PropertyAgent) {
  agentStore.selectAgent(agent);
  toast.add({ 
    severity: 'info', 
    summary: 'Agent Selected', 
    detail: `Editing ${agent.name}`, 
    life: 2000 
  });
}

async function deleteAgent(id: number) {
  try {
    await agentStore.deleteAgent(id);
    toast.add({ 
      severity: 'success', 
      summary: 'Success', 
      detail: 'Agent deleted successfully', 
      life: 3000 
    });
  } catch (error: any) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: error.message || 'Failed to delete agent', 
      life: 5000 
    });
  }
}

async function showAgentProperties(agent: PropertyAgent) {
  try {
    await agentStore.fetchAgentWithProperties(agent.id);
    propertyModalVisible.value = true;
  } catch (error: any) {
    toast.add({ 
      severity: 'error', 
      summary: 'Error', 
      detail: error.message || 'Failed to load agent properties', 
      life: 5000 
    });
  }
}

function closePropertyModal() {
  propertyModalVisible.value = false;
}
</script>

<style scoped>
.agent-manager {
  padding: 0.5rem;
  width: 100%;
}

.card {
  background: var(--surface-card);
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 
              0px 0px 2px rgba(0, 0, 0, 0.05), 
              0px 1px 4px rgba(0, 0, 0, 0.08);
}

h3 {
  margin-top: 0;
  color: var(--text-color);
}
</style>