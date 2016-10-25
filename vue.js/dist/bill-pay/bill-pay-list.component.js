"use strict";

window.billPayListComponent = Vue.extend({
    template: "\n    <style>\n        .pago{color: green;}\n        .nao-pago{color: red;}\n    </style>\n\n    <table border=\"1\" cellpadding=\"10\">\n        <thead>\n        <tr>\n            <th>#</th>\n            <th>Vencimento</th>\n            <th>Nome</th>\n            <th>Valor</th>\n            <th>Pago?</th>\n            <th colspan=\"2\">A\xE7\xF5es</th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr v-for=\"(i, bill) in bills\">\n            <td>{{ i + 1 }}</td>\n            <td>{{ bill.date_due | dateFormat 'pt-BR' }}</td>\n            <td>{{ bill.name | upperFormat }}</td>\n            <td>{{ bill.value | numberFormat 'pt-BR'}}</td>\n            <td :class=\"{'pago': bill.done, 'nao-pago': !bill.done}\">\n                {{ bill.done | doneLabel }}\n            </td>\n            <td>\n                <a v-link=\"{name: 'bill-pay.update', params: {id: bill.id}}\">Editar</a>\n            </td>\n            <td>\n                <button type=\"button\" @click.prevent=\"deleteBill(bill)\">Excluir</button>\n            </td>\n        </tr>\n        </tbody>\n    </table>",

    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        BillPay.query().then(function (response) {
            _this.bills = response.data;
        });
    },


    methods: {
        deleteBill: function deleteBill(bill) {
            var _this2 = this;

            if (confirm("Tem certeza que deseja excluir esse registro?")) {
                BillPay.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);

                    _this2.$dispatch('change-info-bill-pay');
                });
            }
        }
    }
});