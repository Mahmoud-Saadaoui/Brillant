// Type declarations for recharts compatibility with React 19
declare module 'recharts' {
  export interface ResponsiveContainerProps {
    width?: string | number;
    height?: string | number;
    children?: React.ReactNode;
    className?: string;
    debounce?: number;
    aspect?: number;
    id?: string | number;
    minWidth?: string | number;
    minHeight?: string | number;
    initialWidth?: number;
    initialHeight?: number;
  }

  export const ResponsiveContainer: React.FC<ResponsiveContainerProps>;

  export interface LineChartProps {
    data?: any[];
    width?: number;
    height?: number;
    margin?: { top?: number; right?: number; left?: number; bottom?: number };
    children?: React.ReactNode;
    className?: string;
  }

  export const LineChart: React.FC<LineChartProps>;

  export interface LineProps {
    dataKey?: string | number | ((obj: any) => any);
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
    fillOpacity?: number;
    strokeDasharray?: string | number;
    strokeOpacity?: number;
    dot?: boolean | object;
    activeDot?: boolean | object;
    type?: 'basis' | 'basisClosed' | 'basisOpen' | 'bumpX' | 'bumpY' | 'bumpXInverted' | 'linear' | 'linearClosed' | 'monotone' | 'monotoneX' | 'monotoneY' | 'natural' | 'step' | 'stepAfter' | 'stepBefore';
    legendType?: 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye' | 'none';
    hide?: boolean;
    connectNulls?: boolean;
    yAxisId?: string | number;
    xAxisId?: string | number;
    name?: string;
    unit?: string;
    children?: any[];
    label?: any;
  }

  export const Line: React.FC<LineProps>;

  export interface BarChartProps {
    data?: any[];
    width?: number;
    height?: number;
    margin?: { top?: number; right?: number; left?: number; bottom?: number };
    children?: React.ReactNode;
    className?: string;
    layout?: 'horizontal' | 'vertical';
  }

  export const BarChart: React.FC<BarChartProps>;

  export interface BarProps {
    dataKey?: string | number | ((obj: any) => any);
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    fillOpacity?: number;
    strokeOpacity?: number;
    legendType?: 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye' | 'none';
    hide?: boolean;
    yAxisId?: string | number;
    xAxisId?: string | number;
    name?: string;
    unit?: string;
    children?: any[];
    label?: any;
    radius?: number | [number, number, number, number];
  }

  export const Bar: React.FC<BarProps>;

  export interface PieChartProps {
    data?: any[];
    width?: number;
    height?: number;
    margin?: { top?: number; right?: number; left?: number; bottom?: number };
    children?: React.ReactNode;
    className?: string;
  }

  export const PieChart: React.FC<PieChartProps>;

  export interface PieProps {
    data?: any[];
    dataKey?: string | number | ((obj: any) => any);
    nameKey?: string | number | ((obj: any) => any);
    cx?: string | number;
    cy?: string | number;
    innerRadius?: number | string;
    outerRadius?: number | string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    fillOpacity?: number;
    strokeOpacity?: number;
    paddingAngle?: number;
    label?: any;
    labelLine?: any;
    legendType?: 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye' | 'none';
    hide?: boolean;
    children?: any[];
    name?: string;
    unit?: string;
  }

  export const Pie: React.FC<PieProps>;

  export interface CellProps {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    fillOpacity?: number;
    strokeOpacity?: number;
    name?: string;
    value?: any;
  }

  export const Cell: React.FC<CellProps>;

  export interface XAxisProps {
    dataKey?: string | number | ((obj: any) => any);
    type?: 'category' | 'number';
    hide?: boolean;
    axisLine?: boolean | object;
    tickLine?: boolean;
    tick?: boolean | object;
    stroke?: string;
    strokeWidth?: number;
    interval?: 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | number;
    ticks?: any[];
    tickFormatter?: (value: any, index: number) => any;
    ticksGenerator?: (ticks: any[]) => any[];
    scale?: string | Function;
    name?: string;
    unit?: string;
    label?: any;
    children?: any[];
    xAxisId?: string | number;
    allowDuplicatedCategory?: boolean;
    allowDecimals?: boolean;
    angle?: number;
    className?: string;
    height?: number;
    mirror?: boolean;
    orientation?: 'top' | 'bottom';
    padding?: { left?: number; right?: number };
    reversed?: boolean;
    tickMargin?: number;
    minTickGap?: number;
    tickSize?: number;
    textAnchor?: 'start' | 'middle' | 'end';
    width?: number;
    viewBox?: object;
    z?: number;
  }

  export const XAxis: React.FC<XAxisProps>;

  export interface YAxisProps {
    dataKey?: string | number | ((obj: any) => any);
    type?: 'category' | 'number';
    hide?: boolean;
    axisLine?: boolean | object;
    tickLine?: boolean;
    tick?: boolean | object;
    stroke?: string;
    strokeWidth?: number;
    interval?: 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | number;
    ticks?: any[];
    tickFormatter?: (value: any, index: number) => any;
    ticksGenerator?: (ticks: any[]) => any[];
    scale?: string | Function;
    name?: string;
    unit?: string;
    label?: any;
    children?: any[];
    yAxisId?: string | number;
    allowDuplicatedCategory?: boolean;
    allowDecimals?: boolean;
    angle?: number;
    className?: string;
    domain?: [number, number];
    height?: number;
    mirror?: boolean;
    orientation?: 'left' | 'right';
    padding?: { top?: number; bottom?: number };
    reversed?: boolean;
    tickMargin?: number;
    minTickGap?: number;
    tickSize?: number;
    textAnchor?: 'start' | 'middle' | 'end';
    width?: number;
    viewBox?: object;
    z?: number;
  }

  export const YAxis: React.FC<YAxisProps>;

  export interface CartesianGridProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    horizontal?: boolean;
    vertical?: boolean;
    stroke?: string;
    fill?: string;
    fillOpacity?: number;
    strokeDasharray?: string | number;
    strokeOpacity?: number;
    strokeDashoffset?: number | string;
    strokeWidth?: number;
    horizontalCoordinatesGenerator?: (props: any) => number[];
    verticalCoordinatesGenerator?: (props: any) => number[];
    offset?: { x: number; y: number };
    chartWidth?: number;
    chartHeight?: number;
    className?: string;
  }

  export const CartesianGrid: React.FC<CartesianGridProps>;

  export interface TooltipProps {
    active?: boolean;
    allowEscapeViewBox?: { x?: boolean; y?: boolean };
    animationBegin?: number;
    animationDuration?: number;
    content?: React.ReactNode | ((props: any) => React.ReactNode);
    coordinate?: { x: number; y: number };
    cursor?: boolean | React.ReactNode | ((props: any) => React.ReactNode);
    formatter?: (value: any, name: any, props: any) => React.ReactNode;
    contentStyle?: object;
    itemStyle?: object;
    labelStyle?: object;
    wrapperStyle?: object;
    cursorStyle?: object;
    filterNull?: boolean;
    isAnimationActive?: boolean;
    payloadUniqBy?: ((entry: any) => any) | string[];
    position?: { x: number; y: number };
    trigger?: 'hover' | 'click';
    viewBox?: object;
    offset?: number;
    children?: any[];
  }

  export const Tooltip: React.FC<TooltipProps>;

  export interface LegendProps {
    content?: React.ReactNode | ((props: any) => React.ReactNode);
    iconSize?: number;
    iconType?: 'line' | 'square' | 'rect' | 'circle' | 'cross' | 'diamond' | 'star' | 'triangle' | 'wye' | 'plainline' | 'square' | 'rect';
    layout?: 'horizontal' | 'vertical';
    align?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'bottom' | 'middle';
    payload?: any[];
    chartWidth?: number;
    chartHeight?: number;
    margin?: { top: number; right: number; left: number; bottom: number };
    wrapperStyle?: object;
    onClick?: (e: any) => void;
    onMouseEnter?: (e: any) => void;
    onMouseLeave?: (e: any) => void;
    children?: any[];
  }

  export const Legend: React.FC<LegendProps>;
}
