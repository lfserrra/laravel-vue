window.billPayListComponent = Vue.extend({
    template: `
    <style>
        .pago{color: green;}
        .nao-pago{color: red;}
    </style>

    <table border="1" cellpadding="10">
        <thead>
        <tr>
            <th>#</th>
            <th>Vencimento</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Pago?</th>
            <th colspan="2">Ações</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i, bill) in bills">
            <td>{{ i + 1 }}</td>
            <td>{{ bill.data_due }}</td>
            <td>{{ bill.name }}</td>
            <td>{{ bill.value | currency 'R$ ' 2}}</td>
            <td :class="{'pago': bill.done, 'nao-pago': !bill.done}">
                <input type="checkbox" v-model="bill.done" :true-value="1" :false-value="0">
                {{ bill.done | doneLabel }}
            </td>
            <td>
                <a v-link="{name: 'bill-pay.update', params: {index: i}}">Editar</a>
            </td>
            <td>
                <button type="button" @click.prevent="deleteBill(bill)">Excluir</button>
            </td>
        </tr>
        </tbody>
    </table>`,

    data: function () {
        return {
            bills: this.$root.$children[0].billsPay
        };
    },

    methods: {
        deleteBill: function (bill) {
            if (confirm("Tem certeza que deseja excluir esse registro?")) {
                this.$root.$children[0].billsPay.$remove(bill);
            }
        },
    },
});