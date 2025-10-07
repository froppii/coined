<script lang="ts" context="module">
    export interface Goal {
        id: string;
        name: string;
        target: number;
        saved: number;
    }
</script>

<script lang="ts">
    import { moneyStore } from '../stores/moneyStore';
    
    export let goal: Goal;

    let addAmount: string = '';

    function updateGoal() {
        if (!addAmount) return;
        const newSaved = goal.saved + parseFloat(addAmount);
        moneyStore.updateGoal(Number(goal.id), newSaved);
        addAmount = '';
    }
</script>

<div class="goal">
    <h3>{goal.name}</h3>
    <p>{goal.saved} / {goal.target}</p>
    <progress value={goal.saved} max={goal.target}></progress>

    <input type="number" placeholder="Add amount" bind:value={addAmount} />
    <button on:click={updateGoal}>Save</button>
</div>

<style>
    .goal {
        border: 1px solid #ccc;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }
    progress {
        width: 100%;
        height: 1rem;
        margin: 0.5rem 0;
    }
</style>
