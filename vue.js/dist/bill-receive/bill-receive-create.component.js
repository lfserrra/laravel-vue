'use strict';

var names = ['Conta de luz', 'Conta de \xE1gua', 'Conta de telefone', 'Supermercado', 'Conta de Cartão de Crédito', 'Empréstimo', 'Gasolina'];

window.billReceiveCreateComponent = Vue.extend({
    template: '\n    <form @submit.prevent="submit">\n        <label>Vencimento: </label>\n        <input type="text" v-model="bill.date_due | dateFormat \'pt-BR\'">\n\n        <br><br>\n\n        <label>Conta: </label>\n        <select v-model="bill.name | upperFormat">\n            <option v-for="name in names" :value="name | upperFormat">{{ name | upperFormat}}</option>\n        </select>\n\n        <br><br>\n\n        <label>Valor: </label>\n        <input type="text" v-model="bill.value | numberFormat \'pt-BR\'">\n\n        <br><br>\n\n        Pago? <input type="checkbox" v-model="bill.done" :true-value="1" :false-value="0">\n\n        <br><br><br><br>\n\n        <button type="submit">Enviar</button>\n    </form>\n    ',

    data: function data() {
        return {
            names: names,

            bill: new BillReceiveClass(),

            formType: 'insert'
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },


    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();

            if (this.formType == 'insert') {
                BillReceive.save({}, data).then(function (response) {
                    _this.$dispatch('change-info-bill-receive');

                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                BillReceive.update({ id: this.bill.id }, data).then(function (response) {
                    _this.$dispatch('change-info-bill-receive');

                    _this.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillReceive.get({ id: id }).then(function (response) {
                _this2.bill = new BillReceiveClass(response.data);
            });
        }
    }
});