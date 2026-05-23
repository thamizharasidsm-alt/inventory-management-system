import { useEffect, useRef } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, BarElement, Title,
} from 'chart.js';
import { useInventory } from '../../context/InventoryContext';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const COLORS = ['#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f43f5e','#84cc16'];

export default function ChartsSection() {
  const { state } = useInventory();
  const { products, categories } = state;

  const categoryProductCount = categories.map(cat => products.filter(p => p.category === cat).length);
  const categoryStock = categories.map(cat => products.filter(p => p.category === cat).reduce((s, p) => s + p.stock, 0));

  const pieData = {
    labels: categories,
    datasets: [{
      data: categoryProductCount,
      backgroundColor: COLORS,
      borderColor: '#fff',
      borderWidth: 3,
      hoverOffset: 10,
    }],
  };

  const pieOptions = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: { position: 'bottom', labels: { padding: 15, usePointStyle: true, font: { size: 12 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            return `${ctx.label}: ${ctx.parsed} products (${((ctx.parsed / total) * 100).toFixed(1)}%)`;
          },
        },
      },
    },
    cutout: '55%',
  };

  const barData = {
    labels: categories,
    datasets: [{
      label: 'Stock Quantity',
      data: categoryStock,
      backgroundColor: COLORS.map(c => c + 'bf'),
      borderColor: COLORS,
      borderWidth: 1,
      borderRadius: 6,
    }],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `Stock: ${ctx.parsed.y} units` } },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' }, title: { display: true, text: 'Quantity' } },
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
    },
  };

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3><i className="fas fa-chart-pie" /> Products per Category</h3>
        <Doughnut id="pieChart" data={pieData} options={pieOptions} />
      </div>
      <div className="chart-card">
        <h3><i className="fas fa-chart-bar" /> Category Stock Levels</h3>
        <Bar id="barChart" data={barData} options={barOptions} />
      </div>
    </div>
  );
}
