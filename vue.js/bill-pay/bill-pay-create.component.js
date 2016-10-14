var billPayCreateComponent = Vue.extend({
    template: `
    <form @submit.prevent="submit">
        <label>Vencimento: </label>
        <input type="text" v-model="bill.data_due">

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
                'Conta de Luz',
                'Conta de Água',
                'Conta de Telefone',
                'Conta de Supermercado',
                'Conta de Cartão de Crédito',
                'Empréstimo',
                'Gasolina'
            ],

            bill: {
                data_due: '',
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
            this.getBill(this.$route.params.index);
        }
    },

    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                this.$root.$children[0].billsPay.push(this.bill);
            }

            this.bill = {
                data_due: '',
                name: '',
                value: 0,
                done: false
            };

            this.$router.go({name: 'bill-pay.list'});
        },

        getBill: function (index) {
            this.bill = this.$root.$children[0].billsPay[index];
        }
    },

    events: {
        'change-bill': function (bill) {
            this.bill = bill;
        }
    }
});