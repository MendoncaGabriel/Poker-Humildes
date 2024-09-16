// observer.ts

export interface Observer {
    update(dado: any): void;
}

export class Subject {
    private observers: Observer[] = [];

    // Adiciona um observer
    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    // Remove um observer
    removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Notifica todos os observers
    notify(dado: any): void {
        this.observers.forEach(observer => observer.update(dado));
    }

    // Retorna a lista de observadores registrados
    listObservers(): Observer[] {
        return this.observers;
    }
}

/*
// Exemplo de uso
const subject = new Subject();

const observer1: Observer = {
    update(dado: any) {
        console.log('Observer 1 recebeu:', dado);
    }
};

const observer2: Observer = {
    update(dado: any) {
        console.log('Observer 2 recebeu:', dado);
    }
};

// Registrar observadores
subject.addObserver(observer1);
subject.addObserver(observer2);

// Listar observadores registrados
console.log('Observadores registrados:', subject.listObservers().length); // 2

// Notificar observadores
subject.notify('Novo dado');

// Remover um observador
subject.removeObserver(observer1);

// Notificar novamente
subject.notify('Outro dado');
*/