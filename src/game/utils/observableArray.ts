export class ObservableArray<T> {
    private array: T[] = [];
    private listeners: ((addedItems: T[]) => void)[] = [];
    private timeoutId: NodeJS.Timeout | null = null;

    constructor() {
        this.setup();
    }

    private setup() {
        const originalPush = this.array.push;
        const self = this;

        this.array.push = function (...args: T[]): number {
            const result = originalPush.apply(this, args);
            self.notify(args);
            return result;
        };
    }

    private notify(addedItems: T[]) {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        this.timeoutId = setTimeout(() => {
            for (const listener of this.listeners) {
                listener(addedItems);
            }
        }, 1000);
    }

    public addListener(callback: (addedItems: T[]) => void) {
        this.listeners.push(callback);
    }

    public getArray(): T[] {
        return this.array;
    }
}

// // Exemplo de uso:
// const observableArray = new ObservableArray<number>();

// observableArray.addListener((addedItems) => {
//     console.log('Itens adicionados:', addedItems);
// });

// // Adicionando itens ao array
// observableArray.getArray().push(1);
// observableArray.getArray().push(2);
// observableArray.getArray().push(3);
