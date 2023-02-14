<template>
<div class="chart-container">
  <Bar v-if='chartData.labels' id="my-chart-id" :options="chartOptions" :data="chartData" />
</div>
</template>

<script>
import { bitcoinService } from "../services/bitcoin.service.js";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: null,
        datasets: [
          {
            label: "Value (USD)",
            backgroundColor: "#c92b6dcc",
            data: null,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
  async mounted () {
        this.loaded = false

        try {
        const priceHistory = await bitcoinService.getMarketPriceHistory()
        this.chartData.labels = priceHistory.labels
        this.chartData.datasets[0].data = priceHistory.datasets[0].data

        this.loaded = true
        } catch (e) {
        console.error(e)
        }
  },
}
</script>