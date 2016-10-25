const names = [
    'Conta de luz',
    'Conta de \u00e1gua',
    'Conta de telefone',
    'Supermercado',
    'Conta de Cartão de Crédito',
    'Empréstimo',
    'Gasolina'
];

window.billPayCreateComponent = Vue.extend({
    template: `
    <form @submit.prevent="submit">
        <label>Vencimento: </label>
        <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'">

        <br><br>

        <label>Conta: </label>
        <select v-model="bill.name | upperFormat">
            <option v-for="name in names" :value="name | upperFormat">{{ name | upperFormat }}</option>
        </select>

        <br><br>

        <label>Valor: </label>
        <input type="text" v-model="bill.value | numberFormat 'pt-BR'">

        <br><br>

        Pago? <input type="checkbox" v-model="bill.done" :true-value="1" :false-value="0">

        <br><br><br><br>

        <button type="submit">Enviar</button>
    </form>
    `,

    data() {
        return {
            names: names,

            bill: new BillPayClass(),

            formType: 'insert'
        };
    },

    created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit() {
            let data = this.bill.toJSON();

            if (this.formType == 'insert') {
                BillPay.save({}, data).then((response) => {
                    this.$dispatch('change-info-bill-pay');

                    this.$router.go({name: 'bill-pay.list'});
                });
            } else {
                BillPay.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info-bill-pay');

                    this.$router.go({name: 'bill-pay.list'});
                });
            }
        },

        getBill(id) {
            BillPay.get({id: id}).then((response) => {
                this.bill = new BillPayClass(response.data);
            });
        }
    }
});