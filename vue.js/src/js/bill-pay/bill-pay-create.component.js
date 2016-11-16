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
    <div class="container">
        <h3>{{ title }}</h3>
        
        <form @submit.prevent="submit">
            <div class="row">
                <div class="input-field col s6">
                    <label for="date_due" class="active">Vencimento</label>
                    <input id="date_due" type="text" v-model="bill.date_due | dateFormat 'pt-BR'" placeholder="Informe a data">
                </div>
            
                <div class="input-field col s6">
                    <label for="value" class="active">Valor</label>
                    <input id="value" type="text" v-model="bill.value | numberFormat 'pt-BR'" placeholder="Informe o valor">
                </div>
            </div>
    
            <div class="row">
                <div class="input-field col s6">
                    <label for="name" class="active">Conta</label>
                    <select v-model="bill.name | upperFormat" id="name" class="browser-default">
                    <option value="" disabled selected>Escolha um nome</option>
                        <option v-for="name in names" :value="name | upperFormat">{{ name | upperFormat }}</option>
                    </select>
                </div>
                
                <div class="input-field col s6">
                    <input type="checkbox" id="done" v-model="bill.done" :true-value="1" :false-value="0">
                    <label for="done">Pago?</label>
                </div>
            </div>
    
            <div class="row">
                <div class="col s12">
                    <button type="submit" class="btn btn-large right">Enviar</button>
                </div>
            </div>
        </form>
    </div>
    `,

    data() {
        return {
            names: names,

            bill: new BillPayClass(),

            formType: 'insert',

            title: 'Nova conta'
        };
    },

    created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.title = 'Editar conta';
            this.getBill(this.$route.params.id);
        }

        $(document).ready(function () {
            $('#name').material_select();
        });
    },

    methods: {
        submit() {
            let data = this.bill.toJSON();

            if (this.formType == 'insert') {
                BillPay.save({}, data).then((response) => {
                    Materialize.toast('Conta criada com sucesso', 4000);

                    this.$dispatch('change-info-bill-pay');

                    this.$router.go({name: 'bill-pay.list'});
                });
            } else {
                BillPay.update({id: this.bill.id}, data).then((response) => {
                    Materialize.toast('Conta editada com sucesso', 4000);

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