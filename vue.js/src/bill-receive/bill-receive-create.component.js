const names = [
    'Conta de luz',
    'Conta de \u00e1gua',
    'Conta de telefone',
    'Supermercado',
    'Conta de Cartão de Crédito',
    'Empréstimo',
    'Gasolina'
];

window.billReceiveCreateComponent = Vue.extend({
    template: `
    <form @submit.prevent="submit">
        <label>Vencimento: </label>
        <input type="text" v-model="bill.date_due | dateFormat 'pt-BR'">

        <br><br>

        <label>Conta: </label>
        <select v-model="bill.name | upperFormat">
            <option v-for="name in names" :value="name | upperFormat">{{ name | upperFormat}}</option>
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

            bill: new BillReceiveClass(),

            formType: 'insert'
        };
    },

    created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },

    methods: {
        submit() {
            let data = this.bill.toJSON();

            if (this.formType == 'insert') {
                BillReceive.save({}, data).then((response) => {
                    this.$dispatch('change-info-bill-receive');

                    this.$router.go({name: 'bill-receive.list'});
                });
            }else{
                BillReceive.update({id: this.bill.id}, data).then((response) =>{
                    this.$dispatch('change-info-bill-receive');

                    this.$router.go({name: 'bill-receive.list'});
                });
            }
        },

        getBill(id) {
            BillReceive.get({id: id}).then((response) => {
                this.bill = new BillReceiveClass(response.data);
            });
        }
    }
});