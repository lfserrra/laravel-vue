window.billListComponent = Vue.extend({
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
                <button type="button" @click.prevent="loadBill(bill)">Editar</button>
            </td>
            <td>
                <button type="button" @click.prevent="excluir(bill)">Excluir</button>
            </td>
        </tr>
        </tbody>
    </table>`,

    data: function () {
        return {
            bills: this.$root.$children[0].bills
        };
    },

    methods: {
        loadBill: function (bill) {
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-formType', 'update');
        },

        excluir: function (bill) {
            if (confirm("Tem certeza que deseja excluir esse registro?")) {
                this.bills.$remove(bill);
            }
        },
    },

    events: {
        'new-bill': function (bill) {
            this.bills.push(bill);
        }
    }
});