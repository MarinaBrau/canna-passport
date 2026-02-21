declare module "react-simple-maps" {
  import type { ReactNode, CSSProperties, MouseEvent } from "react";

  export interface RSMGeo {
    rsmKey: string;
    id: string | number;
    type: string;
    properties: Record<string, string | number | boolean | null>;
    geometry: object;
  }

  export interface GeographiesChildrenProps {
    geographies: RSMGeo[];
    outline: RSMGeo;
    graticule: RSMGeo;
  }

  export interface GeographyStyleObject {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    outline?: string;
    cursor?: string;
    filter?: string;
    transition?: string;
    opacity?: number;
  }

  export function ComposableMap(props: {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
      parallels?: [number, number];
    };
    width?: number;
    height?: number;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
  }): JSX.Element;

  export function ZoomableGroup(props: {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children?: ReactNode;
    onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void;
  }): JSX.Element;

  export function Geographies(props: {
    geography: string | object;
    children: (props: GeographiesChildrenProps) => ReactNode;
  }): JSX.Element;

  export function Geography(props: {
    geography: RSMGeo;
    style?: {
      default?: GeographyStyleObject;
      hover?: GeographyStyleObject;
      pressed?: GeographyStyleObject;
    };
    onClick?: (geo: RSMGeo, event: MouseEvent) => void;
    onMouseEnter?: (geo: RSMGeo, event: MouseEvent) => void;
    onMouseLeave?: (geo: RSMGeo, event: MouseEvent) => void;
    tabIndex?: number;
    className?: string;
  }): JSX.Element;

  export function Sphere(props?: {
    id?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  }): JSX.Element;

  export function Graticule(props?: {
    stroke?: string;
    strokeWidth?: number;
    step?: [number, number];
    clipPath?: string;
  }): JSX.Element;

  export function Marker(props: {
    coordinates: [number, number];
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }): JSX.Element;
}
