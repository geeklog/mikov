export default function (strategy?: string): {
    birth(o: any): void;
    work(o: any): void;
    retire(o: any): void;
    readonly workers: any[];
    readonly idlers: any[];
    get: () => any;
    readonly nWorkers: number;
    readonly nIdles: number;
};
