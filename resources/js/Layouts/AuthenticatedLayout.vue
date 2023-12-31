<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link, usePage, router } from '@inertiajs/vue3';
const page = usePage()
const user = computed(() => page.props.auth.user)
const userNameArr = ref(<string[]>[])
const userName = ref('')

userNameArr.value = user.value.name.split(' ')
userName.value = userNameArr.value[0]
const dropdownToggled = ref(false)

function closeDropdown(ev: MouseEvent) {
    const element = ev.target as HTMLElement
    if (dropdownToggled.value === true && !element.closest('#dashboard_dropdown-toggle')) {
        dropdownToggled.value = false

    }
}
onMounted(() => {
    document.documentElement.addEventListener('click', closeDropdown)

})
onUnmounted(() => {
    document.removeEventListener('click', closeDropdown)
})
</script>

<template>
    <section class="lg:h-screen lg:w-screen">
        <div class="lg:grid lg:grid-cols-[15%_85%]">
            <div
                class="lg:border-l lg:min-h-screen -lg:w-full -lg:fixed z-10 bottom-0 shadow lg:p-8 flex lg:flex-col bg-white -lg:bg-gray-50 lg:gap-4 -lg:justify-evenly">
                <ApplicationLogo class="w-16 aspect-square lg:mb-20 -lg:hidden" />
                <Link :href="route('user.dashboard', user.id)" class=" py-2 px-3 flex -lg:flex-col lg:gap-3 rounded"
                    :class="[route().current('user.dashboard') ? 'bg-secondary text-white' : 'text-gray-600']">
                <span class="-lg:text-2xl text-center">
                    <i class="fas fa-home"></i>
                </span>
                <span>
                    Home
                </span>
                </Link>
                <Link :href="route('user.dashboard.messages', user.id)" class="py-2 px-3 flex -lg:flex-col lg:gap-3 rounded"
                    :class="[route().current('user.dashboard.messages') ? 'bg-secondary text-white' : 'text-gray-600']">
                <span class="-lg:text-2xl text-center">
                    <i class="fas fa-message"></i>
                </span>
                <span>
                    Messages
                </span>
                </Link>
                <Link :href="route('user.dashboard.saved', user.id)" class="py-2 px-3 flex -lg:flex-col lg:gap-3 rounded"
                    :class="[route().current('user.dashboard.saved') ? 'bg-secondary text-white' : 'text-gray-600']">
                <span class="-lg:text-2xl text-center">
                    <i class="fas fa-bookmark"></i>
                </span>
                <span>
                    Saved
                </span>
                </Link>
                <Link :href="route('user.profile.edit', user.id)" class="py-2 px-3 flex -lg:flex-col lg:gap-3 rounded"
                    :class="[route().current('user.profile.edit') ? 'bg-secondary text-white' : 'text-gray-600']">
                <span class="-lg:text-2xl text-center">
                    <i class="fas fa-user"></i>
                </span>
                <span>
                    Profile
                </span>
                </Link>
                <Link :href="route('Home')" class="py-2 px-3 flex -lg:flex-col lg:gap-3 rounded">
                <span class="-lg:text-2xl text-center">
                    <i class="fas fa-right-from-bracket"></i>
                </span>
                <span>
                    Exit
                </span>
                </Link>
            </div>
            <div>
                <div class="border-b w-full flex justify-between items-center px-8 py-4">
                    <div>
                        <div class="flex items-center gap-1 font-bold">
                            <span>
                                Hi,
                            </span>
                            <span>
                                {{ userName }}
                            </span>
                            <span class="-rotate-45 text-orange-200">
                                <i class="fas fa-hand"></i>
                            </span>
                        </div>

                    </div>
                    <div class="flex gap-2 items-center">
                        <button type="button" title="New listing" @click=" router.get(route('listings.create'))"
                            class="text-white hover:bg-accent-hover bg-accent flex items-center justify-center gap-2 h-8 w-28 rounded-md text-sm ">
                            <span>
                                <i class="fas fa-circle-plus"></i>
                            </span>
                            <span class="capitalize">
                                new listing
                            </span>
                        </button>
                        <div class=" relative">

                            <button @click="dropdownToggled = !dropdownToggled" id="dashboard_dropdown-toggle" type="button"
                                class="flex gap-2.5 items-center dashboard_dropdown-toggle">
                                <span v-if="user.avatar">
                                    <img :src="user.avatar" alt="user avatar" class="w-8 aspect-square rounded-full">
                                </span>
                                <span v-else
                                    class="w-8 aspect-square flex justify-center items-center bg-slate-900 rounded-full text-white border border-accent">
                                    <i class="fas fa-user"></i>
                                </span>
                                <span id="user_name">
                                    {{ userName }}
                                </span>
                                <span id="dropdown-icon" class="text-sm">
                                    <i class="fas fa-caret-down"></i>
                                </span>
                            </button>
                            <div class="absolute bg-white shadow py-4 px-8 z-50 top-10 -right-4  flex-col items-start gap-2 transition-opacity duration-500 ease-in-out"
                                id="dashboard_dropdown "
                                :class="[dropdownToggled ? 'flex opacity-100' : 'hidden opacity-0']">

                                <Link :href="route('user.dashboard', user.id)" class="capitalize">
                                dashboard
                                </Link>
                                <Link :href="route('user.profile.edit', user.id)" class="capitalize">
                                profile
                                </Link>
                                <Link method="post" as="button" :href="route('logout')" class="capitalize">
                                logout
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
                <main>
                    <slot />
                </main>
            </div>
        </div>

    </section>
</template>
