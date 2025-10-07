<script lang="ts">
	import AddTransactionForm from '$lib/components/AddTransactions.svelte';
	import { moneyStore } from '$lib/stores/moneyStore';
	import SavingsGoal from '$lib/components/SavingsGoal.svelte';

	interface Transaction {
		id: number;
		type: 'income' | 'expense';
		amount: number;
		category: string;
		date: string;
	}

	interface SavingsGoal {
		id: string;
		name: string;
		target: number;
		saved: number;
	}

	interface MoneyData {
		transactions: Transaction[];
		goals: SavingsGoal[];
	}

	let data: MoneyData;
	$: moneyStore.subscribe((val) => (data = val));

	let goalName= '';
	let goalTarget = '';

	function addGoal() {
		if (!goalName || !goalTarget) return;
		moneyStore.addGoal({
			id: Date.now(),
			name: goalName,
			target: parseFloat(goalTarget),
			saved: 0
		});
		goalName = '';
		goalTarget = '';
	}

	$: income = data.transactions
		.filter((t) => t.type === 'income')
		.reduce((sum, t) => sum + t.amount, 0);
	$: expense = data.transactions
		.filter((t) => t.type === 'expense')
		.reduce((sum, t) => sum + t.amount, 0);
	$: balance = income - expense;
</script>

<h1>Coined</h1>
<p>Balance: ${balance.toFixed(2)}</p>

<AddTransactionForm />

<section>
	<h2>Transactions</h2>
	{#if data.transactions.length === 0}
		<p>No transactions yet</p>
	{:else}
		<ul>
			{#each data.transactions as t}
				<li>{t.date} - {t.category}: {t.type} ${t.amount}</li>
			{/each}
		</ul>
	{/if}
</section>

<section>
	<h2>Savings Goal</h2>
	
	<form on:submit|preventDefault={addGoal}>
		<input type="text" placeholder="Goal name" bind:value={goalName} />
		<input type="number" placeholder="Target amount" bind:value={goalTarget} min="1" />
		<button type="submit">Add Goal</button>
	</form>

	{#if data.goals.length === 0}
		<p>No goals yet</p>
	{:else}
		{#each data.goals as goal}
			<SavingsGoal {goal} />
		{/each}
	{/if}
</section>

<style>
	section {
		margin-top: 1.5rem;
	}

	h1 {
		font-size: 2rem;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-bottom: 0.3rem;
	}
</style>
