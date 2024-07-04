<template>
  <div class="pie-chart-container">
    <h2 class="chart-title">{{ title }}</h2>
    <div class="chart-wrapper">
      <svg :width="size" :height="size" viewBox="0 0 100 100" class="pie-svg">
        <defs>
          <filter id="dropShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="1" dy="1" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="50"
          cy="50"
          :r="radius"
          fill="#f2f2f2"
          class="pie-background"
          filter="url(#dropShadow)"
        />
        <g class="slices">
          <path
            v-for="(slice, index) in slices"
            :key="index"
            :d="slice.path"
            :fill="slice.color"
            :class="{ highlighted: index === highlightedSlice }"
            class="pie-slice"
            @mousemove="highlightSlice(index, $event)"
            @mouseout="resetHighlight"
            filter="url(#dropShadow)"
          />
        </g>
      </svg>
      <div
        v-if="highlightedSlice !== -1"
        class="percentage"
        :style="percentageStyle"
      >
        {{ ((chartData[highlightedSlice].value / total) * 100).toFixed(1) }}%
      </div>
    </div>
    <div class="total">Total de frutas: {{ total }}</div>
    <div v-if="showLegend" class="legend">
      <div
        v-for="(item, index) in chartData"
        :key="index"
        class="legend-item"
        :class="{ highlighted: index === highlightedSlice }"
        @mouseover="highlightSlice(index)"
        @mouseout="resetHighlight"
      >
        <span class="color-box" :style="{ backgroundColor: item.color }"></span>
        <span class="legend-label">{{ item.label }}: {{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//COMO USAR
/*
import Grafico from "../components/graficos/Grafico.vue";
const fruitData = ref({
  Manzanas: 30,
  Naranjas: 50,
  Plátanos: 20,
  Pastel: 40,
  Peras: 15,
  Uvas: 25,
  Uvas1: 25,
  Paltas: 80,
  Mango: 19,
});

      <h1>Gráfico de Pastel</h1>
      <Grafico
        :fruits="fruitData"
        :size="300"
        title="Distribución de Frutas"
        :showLegend="true"
        :showPercentages="true"
      />
*/
import { computed, ref } from "vue";

interface FruitData {
  [key: string]: number;
}

interface Props {
  fruits: FruitData;
  size?: number;
  showLegend?: boolean;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
  showLegend: true,
  title: "Fruit Distribution",
});

const radius = 45;
const center = { x: 50, y: 50 };

function generateUniqueColors(count: number): string[] {
  const hueStep = 360 / count;
  return Array.from({ length: count }, (_, i) => {
    const hue = i * hueStep;
    return `hsl(${hue}, 70%, 60%)`;
  });
}

const chartData = computed(() => {
  const entries = Object.entries(props.fruits);
  const uniqueColors = generateUniqueColors(entries.length);
  return entries.map(([label, value], index) => ({
    label,
    value,
    color: uniqueColors[index],
  }));
});

const total = computed(() =>
  Object.values(props.fruits).reduce((sum, value) => sum + value, 0)
);

const slices = computed(() => {
  let startAngle = 0;
  return chartData.value.map((item) => {
    const angle = (item.value / total.value) * 360;
    const slice = calculateSlice(startAngle, angle);
    startAngle += angle;
    return {
      path: slice,
      color: item.color,
    };
  });
});

function calculateSlice(startAngle: number, angle: number): string {
  const startRadians = (startAngle - 90) * (Math.PI / 180);
  const endRadians = (startAngle + angle - 90) * (Math.PI / 180);
  const largeArcFlag = angle > 180 ? 1 : 0;

  const startX = center.x + radius * Math.cos(startRadians);
  const startY = center.y + radius * Math.sin(startRadians);
  const endX = center.x + radius * Math.cos(endRadians);
  const endY = center.y + radius * Math.sin(endRadians);

  return `M ${center.x},${center.y} L ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
}

const highlightedSlice = ref(-1);
const percentageStyle = ref({});

function highlightSlice(index: number, event?: MouseEvent) {
  highlightedSlice.value = index;
  if (event) {
    const rect = (event.target as SVGPathElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    percentageStyle.value = {
      left: `${x}px`,
      top: `${y}px`,
    };
  }
}

function resetHighlight() {
  highlightedSlice.value = -1;
}
</script>

<style scoped>
.pie-chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto", Arial, sans-serif;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.chart-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.chart-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pie-svg {
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pie-svg:hover {
  transform: scale(1.05);
}

.pie-background {
  stroke: #e0e0e0;
  stroke-width: 2;
}

.pie-slice {
  transition: all 0.3s ease;
  cursor: pointer;
}

.pie-slice:hover,
.pie-slice.highlighted {
  opacity: 0.8;
  transform: scale(1.03) translateY(-2px);
}

.percentage {
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 3px 6px;
  border-radius: 10px;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.total {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-top: 20px;
}

.legend {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  width: 100%;
}

.legend-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: #f9f9f9;
}

.legend-item:hover,
.legend-item.highlighted {
  background-color: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.color-box {
  width: 24px;
  height: 24px;
  margin-right: 0.8rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.legend-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

@media (max-width: 600px) {
  .pie-chart-container {
    padding: 20px;
  }

  .chart-title {
    font-size: 20px;
  }

  .legend {
    grid-template-columns: 1fr;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.pie-chart-container {
  animation: fadeIn 0.5s ease-out;
}
</style>