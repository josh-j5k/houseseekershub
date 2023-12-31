<script setup lang="ts">
import { SingleListing } from '@/types/listings'
import CloseButton from '@/Components/CloseButton.vue';
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';
import { usePreloader } from '@/Composables/UsePreloader';
const { preload, showClosePreloader } = usePreloader()

const props = defineProps<{
    listing: SingleListing
}>()

const currentIndex = ref(0)
function prevPic() {
    currentIndex.value--
    if (currentIndex.value < 0) {
        currentIndex.value = props.listing.listing.listingImage?.length - 1

    }
}
function nextPic() {
    currentIndex.value++
    if (currentIndex.value > props.listing.listing.listingImage?.length - 1) {
        currentIndex.value = 0
    }
}
showClosePreloader()



</script>

<template>
    <Head :title="listing.listing.title" />
    <Preloader v-if="preload" />
    <section class="md:h-screen min-h-screen w-full overflow-x-hidden">
        <CloseButton route-name="listings.index" position="top-8 left-8" />
        <div class="grid lg:grid-cols-[75%_25%] grid-cols-1">
            <div
                class="min-h-screen isolate relative before:content-emptystring before:absolute before:w-full before:h-full before:inset-0 before:bg-[rgba(0,_0,_0,_0.2)] overflow-clip before:-z-10 flex justify-center items-center bg-slate-500">
                <div class="w-full h-full absolute">
                    <img v-if="listing.listing.listingImage?.length > 0" :src="listing.listing.listingImage[currentIndex]"
                        alt="" class="w-full h-full object-cover absolute inset-0 blur-lg -z-20">
                    <img v-else src="/Images/no_image_placeholder.jpg" alt=""
                        class="w-full h-full object-cover absolute inset-0 blur-lg -z-20">
                </div>
                <div>
                    <img v-if="listing.listing.listingImage?.length > 0" :src="listing.listing.listingImage[currentIndex]"
                        alt="" class="max-w-lg">
                    <img v-else src="/Images/no_image_placeholder.jpg" alt="" class="max-w-lg">
                </div>
                <button @click="prevPic" type="button" title="click to get previous image"
                    class="w-12 aspect-square rounded-full bg-white absolute left-4 top-1/2 -translate-y-1/2">
                    <span>
                        <i class="fas fa-chevron-left"></i>
                    </span>
                </button>
                <button @click="nextPic" type="button" title="click to get next image"
                    class="w-12 aspect-square rounded-full bg-white absolute right-4 top-1/2 -translate-y-1/2">
                    <span>
                        <i class="fas fa-chevron-right"></i>
                    </span>
                </button>
                <div v-if="listing.listing.listingImage.length > 0"
                    class="absolute flex gap-2 overflow-x-auto overflow-y-hidden py-1 mx-auto bottom-2 z-10 bg-[rgba(255,_255,_255,_0.1)] justify-center w-full h-16">
                    <template v-for="(item, index) in listing.listing.listingImage">
                        <img @click="currentIndex = index" :src="item" alt=""
                            class="w-20 aspect-square object-cover cursor-pointer"
                            :class="[index === currentIndex ? 'border-2 border-blue-500' : '']">
                    </template>
                </div>
            </div>
            <div class="bg-white py-12 px-8 shadow md:h-screen overflow-y-auto">
                <div>
                    <h1 class="capitalize font-bold text-3xl mb-3">
                        {{ listing.listing.title }}
                    </h1>
                    <p class="font-bold flex gap-1 text-sm text-accent">
                        <span>
                            XAF
                        </span>
                        <span>

                            <span v-if="listing.listing.propertyStatus === 'rent'">
                                <span>{{ listing.listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ",").concat('.00') }}</span>/Month
                            </span>
                            <span v-else>
                                {{ listing.listing.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
                                    ",").concat('.00') }}
                            </span>
                        </span>
                    </p>
                    <p class=" mb-6 text-sm text-gray-600">
                        <span>
                            Property for
                        </span>
                        <span>
                            {{ listing.listing.propertyStatus }}
                        </span>
                    </p>
                    <div class="flex gap-4">
                        <button type="button" title="message"
                            class="flex gap-3 bg-secondary text-white py-1 px-3 rounded-lg">
                            <span>
                                <i class="fa-regular fa-comments"></i>
                            </span>
                            <span class="capitalize">
                                message
                            </span>
                        </button>
                        <button type="button" title="like" class="flex gap-3 bg-secondary text-white py-1 px-3 rounded-lg">
                            <span>
                                <i class="fa-regular fa-heart"></i>
                            </span>
                        </button>
                        <button type="button" title="share" class="flex gap-3 bg-secondary text-white py-1 px-3 rounded-lg">
                            <span>
                                <i class="fa-solid fa-share"></i>
                            </span>
                        </button>
                        <button type="button" title="share" class="flex gap-3 bg-secondary text-white py-1 px-3 rounded-lg">
                            <span>
                                <i class="fa-solid fa-ellipsis"></i>
                            </span>
                        </button>
                    </div>
                </div>
                <hr class="w-full bg-slate-300 my-4">
                <div class="pb-4">
                    <p class="font-bold text-lg mb-1"> Location</p>
                    <p class="text-sm">{{ listing.listing.location }}</p>
                </div>
                <hr class="w-full bg-slate-300 my-4">
                <h2 class="font-bold text-lg mb-4">
                    Description
                </h2>
                <p>{{ listing.listing.description }}</p>
            </div>
        </div>
    </section>
</template>