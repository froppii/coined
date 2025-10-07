<script lang="ts">
    import { moneyStore } from '../stores/moneyStore';

    let type: 'income' | 'expense' = 'income';
    let amount = '';
    let category = '';

    function addTransaction() {
        if (!amount || !category) return;
        moneyStore.addTransaction({
            id: Date.now(),
            type,
            amount: parseFloat(amount),
            category,
            date: new Date().toISOString().split('T')[0]
        });
        amount = '';
        category = '';
    }
</script>

<form on:submit|preventDefault={addTransaction}>
    <h2>Add Transaction</h2>
    <select bind:value={type}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
    </select>

    <input type="number" placeholder="Amount" bind:value={amount} min="0" step="0.01" />
    <input type="text" placeholder="Category" bind:value={category} />

    <button type="submit">Add</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    input, select, button {
        padding: 0.4rem;
        font-size: 1rem;
    }
</style>