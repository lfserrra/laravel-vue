window.billReceiveListComponent = Vue.extend({
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
            <td>{{ bill.date_due }}</td>
            <td>{{ bill.name }}</td>
            <td>{{ bill.value | currency 'R$ ' 2}}</td>
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

    data: function () {
        return {
            bills: []
        };
    },

    created: function(){
        var self = this;

        BillReceive.query().then(function(response){
            self.bills = response.data;
        })
    },

    methods: {
        deleteBill: function (bill) {
            if (confirm("Tem certeza que deseja excluir esse registro?")) {
                var self = this;

                BillReceive.delete({id: bill.id}).then(function(response){
                    self.bills.$remove(bill);

                    self.$dispatch('change-info-bill-receive');
                });
            }
        }
    }
});