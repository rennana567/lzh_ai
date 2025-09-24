import {create} from 'zustand'
import Container from "../materials/Container";
import Button from "../materials/Button";

export interface ComponentConfig {
    name: string;
    defaultProps: Record<string, any>;
    compoent: any
}

interface State {
    componentConfig: {[key: string]: ComponentConfig}
}

interface Action {
    registerComponent: (name: string, componentConfig: ComponentConfig) => void
}
