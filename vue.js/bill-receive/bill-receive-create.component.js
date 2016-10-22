var billReceiveCreateComponent = Vue.extend({
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
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit: function () {
            var self = this;

            if (this.formType == 'insert') {
                BillReceive.save({}, self.bill).then(function(response){
                    self.$dispatch('change-info-bill-receive');

                    self.$router.go({name: 'bill-receive.list'});
                });
            }else{
                BillReceive.update({id: self.bill.id}, self.bill).then(function(response){
                    self.$dispatch('change-info-bill-receive');

                    self.$router.go({name: 'bill-receive.list'});
                });
            }
        },

        getBill: function (id) {
            var self = this;

            BillReceive.get({id: id}).then(function(response){
                self.bill = response.data;
            });
        }
    }
});