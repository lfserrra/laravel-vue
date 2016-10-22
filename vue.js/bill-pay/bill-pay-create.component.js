var billPayCreateComponent = Vue.extend({
    template: `
    <form @submit.prevent="submit">
        <label>Vencimento: </label>
        <input type="text" v-model="bill.date_due">

        <br><br>

        <label>Conta: </label>
        <select v-model="bill.name">
            <option v-for="name in names" :value="name">{{ name }}</option>
        </select>

        <br><br>

        <label>Valor: </label>
        <input type="text" v-model="bill.value">

        <br><br>

        Pago? <input type="checkbox" v-model="bill.done" :true-value="1" :false-value="0">

        <br><br><br><br>

        <button type="submit">Enviar</button>
    </form>
    `,

    data: function () {
        return {
            names: [
                'Conta de luz',
                'Conta de \u00e1gua',
                'Conta de telefone',
                'Supermercado',
                'Conta de Cartão de Crédito',
                'Empréstimo',
                'Gasolina'
            ],

            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            },

            formType: 'insert'
        };
    },

    created: function () {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function () {
            var self = this;

            if (this.formType == 'insert') {
                BillPay.save({}, self.bill).then(function(response){
                    self.$dispatch('change-info-bill-pay');

                    self.$router.go({name: 'bill-pay.list'});
                });
            }else{
                BillPay.update({id: self.bill.id}, self.bill).then(function(response){
                    self.$dispatch('change-info-bill-pay');

                    self.$router.go({name: 'bill-pay.list'});
                });
            }
        },

        getBill: function (id) {
            var self = this;

            BillPay.get({id: id}).then(function(response){
                self.bill = response.data;
            });
        }
    }
});