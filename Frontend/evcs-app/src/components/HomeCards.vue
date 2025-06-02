<script setup>
import Card from '@/components/Card.vue';

defineProps({
    title: {
        type: String,
        default: " Browse Charging Stations",
    },
    subtitle: {
        type: String,
        default: "View all the EV charging stations with detailed info on a map."
    }
})
</script>

<template>
    <section class="py-4">
        <div class="container-xl lg:container mx-auto">
            <div class="flex justify-center p-4">
                <Card bg="bg-green-100" class="w-full max-w-xl text-center">
                    <h2 class="text-2xl font-bold">{{ title }}</h2>
                    <p class="mt-2 mb-4">
                        {{ subtitle }}
                    </p>
                    <a href="jobs.html" class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-gray-700">
                        Browse
                    </a>
                </Card>
                <!-- <div class="bg-green-100 p-6 rounded-lg shadow-md">
                    <h2 class="text-2xl font-bold">For Employers</h2>
                    <p class="mt-2 mb-4">
                        List your job to find the perfect developer for the role
                    </p>
                    <a href="add-job.html"
                        class="inline-block bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600">
                        Add Job
                    </a>
                </div> -->
            </div>
        </div>
    </section>
</template>