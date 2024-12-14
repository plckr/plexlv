import type { Component } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';

export * as Icons from './exports';

export type IconType = Component<SVGAttributes<SVGSVGElement>>;
