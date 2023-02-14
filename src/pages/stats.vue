<template>
    <div class="stats-container main-layout">
        <ValueChart/>
        <AvgChart/>
    </div>
</template>



<script>
import ValueChart from "@/cmps/chart-value.vue"
import AvgChart from "@/cmps/chart-avg.vue"

export default {
    components: {
        ValueChart,
        AvgChart,
    },
}
</script>