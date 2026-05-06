<script setup lang="ts">
import { ref } from 'vue';
import { Menu, X, LayoutDashboard, ShieldCheck, Settings, LogOut } from 'lucide-vue-next';

const isSidebarOpen = ref(false);
</script>

<template>
  <div class="min-h-screen bg-[#F1F5F9] font-sans text-slate-700">
    <header class="lg:hidden flex items-center justify-between p-4 bg-[#1E293B] text-white">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <ShieldCheck :size="18" class="text-white" />
        </div>
        <span class="font-bold tracking-tight">Inkubator Ayam</span>
      </div>
      <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 hover:bg-slate-700 rounded-lg transition-colors">
        <X v-if="isSidebarOpen" />
        <Menu v-else />
      </button>
    </header>

    <div class="flex min-h-screen">
      <aside :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-[#1E293B] text-slate-300 grow-0 transition-transform duration-300 lg:static lg:transform-none border-r border-slate-800',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]">
        <div class="p-6 flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <ShieldCheck class="text-white" />
          </div>
          <span class="font-bold text-xl text-white tracking-tight">Inkubator Ayam</span>
        </div>

        <nav class="mt-4 px-4 space-y-1">
          <p class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Main Menu</p>
          <a href="/dashboard" class="flex items-center gap-3 p-3 rounded-xl" :class="$route.path == '/dashboard' 
                                                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                                                                                : 'hover:bg-slate-800 hover:text-white'"> 
            <LayoutDashboard :size="20"/> Dashboard 
          </a>
          <!-- <a href="#" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all group"> 
            <Database :size="20" class="group-hover:text-blue-400"/> Monitoring 
          </a> -->
          <a href="/setting" class="flex items-center gap-3 p-3 rounded-xl" :class="$route.path == '/setting' 
                                                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                                                                                : 'hover:bg-slate-800 hover:text-white'"> 
            <Settings :size="20" class="group-hover:text-blue-400" /> Settings 
          </a>
        </nav>

        <div class="absolute bottom-8 w-full px-4">
          <button class="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut :size="20"/> Logout
          </button>
        </div>
      </aside>

      <main class="flex-1 p-4 lg:p-10 max-w-7xl mx-auto w-full">
        <router-view />
      </main>
    </div>

    <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"></div>
  </div>
</template>