import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ApiService } from '../api.service';

Chart.register(...registerables);

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {
  @Input() prices: { currentPrices: { time: number, price: number }[], predictedPrices: { time: number, price: number }[] } = { currentPrices: [], predictedPrices: [] };
  chart: any;

  ngOnInit() {
    // this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['prices'] && this.prices.currentPrices.length > 0) {
      this.createChart();
    }
  }

  createChart() {
    const currentPrices = this.prices.currentPrices;
    const predictedPrices = this.prices.predictedPrices;

    // Combine current and predicted prices while maintaining order by time
    const allPrices = [...currentPrices, ...predictedPrices].sort((a, b) => a.time - b.time);

    const labels = allPrices.map(price => new Date(price.time));
    const data = allPrices.map(price => price.price);

    // Create the chart
    this.chart = new Chart('priceChart', {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Prices (USDT)',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                      unit: 'hour',
                      tooltipFormat: 'MMM d, HH:mm',
                      displayFormats: {
                          hour: 'MMM d, HH:mm',
                          day: 'MMM d',
                      }
                  },
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Price (USDT)'
                    },
                    min: Math.min(...data) * 0.99,
                    max: Math.max(...data) * 1.01,
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}




}
