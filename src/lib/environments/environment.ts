import { environment as dev } from './environment.dev';
import { environment as prod } from './environment.prod';

export const environment = import.meta.env.DEV ? dev : prod;
console.log("USING ENVIROMENT: ", environment);