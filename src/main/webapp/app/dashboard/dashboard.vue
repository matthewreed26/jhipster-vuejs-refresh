<template>
    <div class="dashboard">
        <h1>My Dashboard:</h1>
        <br>
        <h2>Accounts:</h2>
        <div class="table-responsive" v-if="bankAccounts">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span >Name</span></th>
                    <th><span >Balance</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="bankAccount in bankAccounts" :key="bankAccount.id">
                    <td><router-link :to="{name: 'BankAccountView', params: {bankAccountId: bankAccount.id}}">{{bankAccount.name}}</router-link></td>
                    <td>{{bankAccount.balance}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <br>
        <h3>Operations:</h3>
        <div class="table-responsive" v-if="operations">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span >Date</span></th>
                    <th><span >Description</span></th>
                    <th><span >Amount</span></th>
                    <th><span >Bank Account</span></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="operation in operations" :key="operation.id">
                    <td>{{operation.date | formatDate}}</td>
                    <td>{{operation.description}}</td>
                    <td>{{operation.amount}}</td>
                    <td>
                        <span v-if="operation.bankAccount">{{operation.bankAccount.name}}</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" src="./dashboard.component.ts">
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
