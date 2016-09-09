var billCreateComponent = Vue.extend({
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

    props: ['bill'],

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
                done: 0
            },

            formType: 'insert'
        };
    },

    methods: {
        submit: function () {
            if (this.formType == 'insert') {
                this.$dispatch('new-bill', this.bill)
            }

            this.$dispatch('clear-form-bill');
        },
    },

    events: {
        'change-formType': function (formType) {
            this.formType = formType;
        },

        'change-bill': function (bill) {
            this.bill = bill;
        },

        'clear-form-bill': function () {
            this.bill = {
                data_due: '',
                name: '',
                value: 0,
                done: 0
            };

            this.$dispatch('change-formType', 'insert');
        }
    }
});