window.billReceiveListComponent = Vue.extend({
    template: `
    <style>
        .pago{color: green;}
        .nao-pago{color: red;}
    </style>

    <table>
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
                <td>{{ bill.date_due | dateFormat 'pt-BR' }}</td>
                <td>{{ bill.name | upperFormat}}</td>
                <td>{{ bill.value | numberFormat 'pt-BR' }}</td>
                <td :class="{'pago': bill.done, 'nao-pago': !bill.done}">
                    {{ bill.done | doneLabel }}
                </td>
                <td>
                    <a v-link="{name: 'bill-receive.update', params: {id: bill.id}}">Editar</a>
                </td>
                <td>
                    <button type="button" @click.prevent="deleteBill(bill)">Excluir</button>
                </td>
            </tr>
        </tbody>
    </table>`,

    data() {
        return {
            bills: []
        };
    },

    created(){
        BillReceive.query().then((response) => {
            this.bills = response.data;
        })
    },

    methods: {
        deleteBill(bill) {
            if (confirm("Tem certeza que deseja excluir esse registro?")) {
                BillReceive.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);

                    this.$dispatch('change-info-bill-receive');
                });
            }
        }
    }
});