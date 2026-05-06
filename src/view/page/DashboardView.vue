<template>
  <div class="grid grid-cols-6 gap-4">
      <div class="lg:col-span-2 col-span-6">
        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-shadow duration-300 ease-in-out">
            <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Suhu Sekarang</h3>
                <p class="text-gray-600 dark:text-gray-400">{{ tempNo }}°C</p>
            </div>
        </div>
      </div>
      <div class="lg:col-span-2 col-span-6">
        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-shadow duration-300 ease-in-out">
            <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Status Lampu</h3>
                <p class="text-gray-600 dark:text-gray-400">{{ lampStatus }}</p>
            </div>
        </div>
      </div>
      <div class="lg:col-span-2 col-span-6">
        <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-shadow duration-300 ease-in-out">
            <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mode Incubator</h3>
                <p class="text-gray-600 dark:text-gray-400">Dalam Pengembangan</p>
            </div>
        </div>
      </div>
      <div class="col-span-6 row-start-1 lg:row-start-2">
        <div class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div class="p-5">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Grafik Suhu</h3>
            <canvas id="temperatureChart"></canvas>
          </div>
        </div>
      </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Chart from 'chart.js/auto';
import api from '@/api/api';

const tempNo = ref<Number>(0);
const lampStatus = ref<String>('Mati');
let eventsource: EventSource; 

let chartInstance: Chart | null = null;
onMounted(() => {

 api.getLampStatus().then((resp) => {
    lampStatus.value = resp.lamp_status === 'ON' ? 'Hidup' : 'Mati';
  }).catch((err) => {
    console.error('Error fetching lamp status:', err);
  });
 eventsource = api.getRealTimeTemperature();
  const ctx = document.getElementById('temperatureChart');
  if (ctx) {
    chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Suhu (°C)',
          data: [],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      }
    });
  }
  eventsource.addEventListener('temp', (event) => {
    const tempData = JSON.parse(event.data);
    if (chartInstance && chartInstance.data.labels && chartInstance.data.datasets[0]) {
      chartInstance.data.datasets[0].data.push(tempData.temp);
      chartInstance.data.labels.push(new Date().toLocaleTimeString());
      if (chartInstance.data.datasets[0].data.length > 10) {
        chartInstance.data.datasets[0].data.shift();   // hapus data paling lama
        chartInstance.data.labels.shift();             // sinkronin label
      }

      chartInstance.update();
      tempNo.value = tempData.temp;
      chartInstance.update();
    }
  });
});

  onUnmounted(()=>{
      eventsource.close();
  })

</script>