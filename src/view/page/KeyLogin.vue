<script setup lang="ts">
import { ref } from 'vue';
import { KeyRound, ArrowRight, ShieldCheck } from 'lucide-vue-next';
import {useUserStore} from "../../stores/user";
import { useRouter } from 'vue-router';

const deviceKey = ref('');
const router = useRouter();

const handleSubmit = async () => {
  if (deviceKey.value) {
    const resp = await fetch("https://go.protowa.id/auth",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        "deviceKey" : deviceKey.value,
      })
    })

    const data = await resp.json()

    if (data.status)
    {
      const userStore = useUserStore();
      userStore.setKey(deviceKey.value);
      console.log(router.push("/dashboard"))
    }
  }
};
</script>

<template>
  <div class="mobile-container flex flex-col justify-center px-6">
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2.5rem] shadow-xl shadow-blue-100 border border-blue-50 mb-6">
        <KeyRound :size="32" class="text-blue-600" />
      </div>
      <h1 class="text-2xl font-black text-[#1E293B] tracking-tight">Otentikasi Aman</h1>
      <p class="text-slate-400 text-sm mt-2">Monitor Dan Kontrol Incubator Anda</p>
    </div>

    <div class="bg-white p-8 rounded-[2.5rem] shadow-sm border border-blue-50/50">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2 ml-1">
            Kunci Perangkat
          </label>
          <div class="relative group">
            <input 
              v-model="deviceKey"
              type="text" 
              placeholder="Contoh: DEV-XXXX-XXXX"
              class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 text-slate-800 placeholder:text-slate-300 outline-none focus:border-blue-400 focus:bg-white transition-all duration-300"
            />
          </div>
          <p class="text-[11px] text-slate-400 mt-3 ml-1 leading-relaxed">
            * Masukan kunci perangkat anda yang anda dapatkan dari dasbor admin atau label fisik perangkat.
          </p>
        </div>

        <button 
          type="submit"
          :disabled="!deviceKey"
          class="w-full bg-[#1E293B] hover:bg-blue-700 disabled:bg-slate-200 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-200 active:scale-95"
        >
          Hubungkan Sekarang
          <ArrowRight :size="18" />
        </button>
      </form>
    </div>

    <div class="mt-8 text-center">
      <button class="text-slate-400 text-xs font-medium hover:text-blue-500 transition-colors flex items-center justify-center gap-1 mx-auto">
        <ShieldCheck :size="14" />
        Butuh bantuan akses?
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Gunakan .mobile-container yang sudah kita buat sebelumnya di AppLayout atau style.css */
.mobile-container {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  @apply bg-[#F0F7FF];
}
</style>