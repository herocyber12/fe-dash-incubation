<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import api from '@/api/api';

    const minTemp = ref<Float64Array>(new Float64Array([0]));
    const maxTemp = ref<Float64Array>(new Float64Array([0]));
    const targetNotif = ref<string>('');
        
    onMounted(async () => {
        try {
            let waNotify = '';
            const resp = await api.getConfigDevice();

            if(resp.wa_notify) {
                waNotify = String(resp.wa_notify);
            }

            if(resp.success){
                minTemp.value = resp.min_temperature;
                maxTemp.value = resp.max_temperature;
                targetNotif.value = waNotify;
            }
        } catch (error) {
            console.error('Error fetching device config:', error);
        }
    });

    async function saveSettings() {
        try {
            const resp = await api.updateSettings(minTemp.value, maxTemp.value, targetNotif.value);

            console.log(resp);
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    }
</script>
<template>
    <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div class="col-span-1">
            <div class="w-full bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-shadow duration-300 ease-in-out">
                <div class="p-5">
                    <label for="minTemp" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Minimal Suhu</label>
                    <input type="number" step="any" id="minTemp" v-model="minTemp" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 p-2 rounded-md">
                </div>
            </div>
        </div>
        <div class="col-span-1">
            <div class="w-full bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-shadow duration-300 ease-in-out">
                <div class="p-5">
                    <label for="maxTemp" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Maksimal Suhu</label>
                    <input type="number" step="any" id="maxTemp" v-model="maxTemp" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 p-2 rounded-md">
                </div>
            </div>
        </div>
        <div class="col-span-1">
            <div class="w-full bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-shadow duration-300 ease-in-out">
                <div class="p-5">
                    <label for="targetNotif" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor Wa (Untuk Notifikasi)</label>
                    <input type="text" id="targetNotif" v-model="targetNotif" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 p-2 rounded-md">
                </div>
            </div>
        </div>
    </div>

        <div class=" pt-5 flex items-center lg:justify-end justify-center">
            <button v-on:click="saveSettings" class="lg:w-[12rem] w-full bg-[#1E293B] hover:bg-blue-700 text-white font-bold py-2 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-200 active:scale-95">
                Simpan Pengaturan
            </button>
        </div>
</template>