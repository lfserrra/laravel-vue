'use strict';

var names = ['Conta de luz', 'Conta de \xE1gua', 'Conta de telefone', 'Supermercado', 'Conta de Cartão de Crédito', 'Empréstimo', 'Gasolina'];

window.billReceiveCreateComponent = Vue.extend({
    template: '\n    <div class="container">\n        <h3>{{ title }}</h3>\n        \n        <form @submit.prevent="submit">\n            <div class="row">\n                <div class="input-field col s6">\n                    <label for="date_due" class="active">Vencimento</label>\n                    <input id="date_due" type="text" v-model="bill.date_due | dateFormat \'pt-BR\'" placeholder="Informe a data">\n                </div>\n            \n                <div class="input-field col s6">\n                    <label for="value" class="active">Valor</label>\n                    <input id="value" type="text" v-model="bill.value | numberFormat \'pt-BR\'" placeholder="Informe o valor">\n                </div>\n            </div>\n    \n            <div class="row">\n                <div class="input-field col s6">\n                    <label for="name" class="active">Conta</label>\n                    <select v-model="bill.name | upperFormat" id="name" class="browser-default">\n                    <option value="" disabled selected>Escolha um nome</option>\n                        <option v-for="name in names" :value="name | upperFormat">{{ name | upperFormat }}</option>\n                    </select>\n                </div>\n                \n                <div class="input-field col s6">\n                    <input type="checkbox" id="done" v-model="bill.done" :true-value="1" :false-value="0">\n                    <label for="done">Pago?</label>\n                </div>\n            </div>\n    \n            <div class="row">\n                <div class="col s12">\n                    <button type="submit" class="btn btn-large right">Enviar</button>\n                </div>\n            </div>\n        </form>\n    </div>\n    ',

    data: function data() {
        return {
            names: names,

            bill: new BillReceiveClass(),

            formType: 'insert',

            title: 'Nova conta'
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.title = 'Editar conta';
            this.getBill(this.$route.params.id);
        }

        $(document).ready(function () {
            $('#name').material_select();
        });
    },


    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();

            if (this.formType == 'insert') {
                BillReceive.save({}, data).then(function (response) {
                    Materialize.toast('Conta criada com sucesso', 4000);

                    _this.$dispatch('change-info-bill-receive');

                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                BillReceive.update({ id: this.bill.id }, data).then(function (response) {
                    Materialize.toast('Conta editada com sucesso', 4000);

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