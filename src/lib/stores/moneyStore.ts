import { writable } from 'svelte/store';

interface Transaction {
    id: number;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    date: string;
}

interface SavingsGoal {
    id: number;
    name: string;
    target: number;
    saved: number;
}

function createMoneyStore() {
    const stored = localStorage.getItem('money-data');
    const initial = stored
        ? JSON.parse(stored)
        : { transactions: [], goals: [] as SavingsGoal[] };

    const { subscribe, update } = writable(initial);

    subscribe((val) => {
        localStorage.setItem('money-data', JSON.stringify(val));
    });

    return {
        subscribe,
        addTransaction: (t: Transaction) =>
            update((data) => ({
                ...data,
                transactions: [...data.transactions, { ...t, id: Date.now() }]
            })),
        addGoal: (g: SavingsGoal) =>
            update((data) => ({
                ...data,
                goals: [...data.goals, { ...g, id: Date.now() }]
            })),
        updateGoal: (id: number, saved: number) =>
            update((data) => ({
                ...data,
                goals: data.goals.map((g: SavingsGoal) => (g.id === id ? { ...g, saved } : g))
            }))
    }
}

export const moneyStore = createMoneyStore()