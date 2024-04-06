import {ChartType, Plugin} from 'chart.js';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    customCanvasBGColorLine?: {
        color: string
    };
  }
}