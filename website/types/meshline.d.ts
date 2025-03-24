import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { extend } from "@react-three/fiber";

/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}

extend({ MeshLineGeometry, MeshLineMaterial });
