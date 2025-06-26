<!-- src/views/HomeView.vue -->
<template>
    <div class="agent-manager p-grid p-mt-4">
      <!-- Agent Form and List container -->
      <div class="p-grid p-fluid">
        <div class="p-col-12 p-md-5">
          <div class="p-card p-mb-4">
            <div class="p-card-title">{{ formTitle }}</div>
            <AgentForm 
              :agent="selectedAgent" 
              @submit="handleFormSubmit" 
              @reset="handleFormReset" 
            />
          </div>
        </div>
        
        <div class="p-col-12 p-md-7">
          <div class="p-card">
            <div class="p-card-title">Property Agents</div>
            <AgentList 
              :agents="agents" 
              :loading="loading" 
              @select="selectAgent" 
              @delete="deleteAgent"
              @show-properties="showAgentProperties" 
            />
          </div>
        </div>
      </div>
      
      <!-- Property Modal -->
      <PropertyModal 
        :visible="propertyModalVisible" 
        :agent="selectedAgent"
        @close="closePropertyModal" 
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import type { PropertyAgent, CreateAgentDTO } from '../types';
  import { useAgentStore } from '../stores/agentStore';
  import AgentForm from '../components/AgentForm.vue';
  import AgentList from '../components/AgentList.vue';
  import PropertyModal from '../components/PropertyModal.vue';
  
  const agentStore = useAgentStore();
  const agents = computed(() => agentStore.agents);
  const selectedAgent = computed(() => agentStore.selectedAgent);
  const loading = computed(() => agentStore.loading);
  
  const propertyModalVisible = ref(false);
  const formTitle = computed(() => selectedAgent.value ? 'Update Agent' : 'Add New Agent');
  
  onMounted(async () => {
    await agentStore.fetchAgents();
  });
  
  function handleFormSubmit(agent: CreateAgentDTO) {
    if (selectedAgent.value) {
      agentStore.updateAgent(selectedAgent.value.id, agent);
    } else {
      agentStore.createAgent(agent);
    }
  }
  
  function handleFormReset() {
    agentStore.clearSelectedAgent();
  }
  
  function selectAgent(agent: PropertyAgent) {
    agentStore.selectAgent(agent);
  }
  
  function deleteAgent(id: number) {
    agentStore.deleteAgent(id);
  }
  
  async function showAgentProperties(agent: PropertyAgent) {
    await agentStore.fetchAgentWithProperties(agent.id);
    propertyModalVisible.value = true;
  }
  
  function closePropertyModal() {
    propertyModalVisible.value = false;
  }
  </script>