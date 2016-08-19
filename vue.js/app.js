Vue.filter('doneLabel', function (value) {
    return (value == 1) ? 'Sim' : 'Não';
});

var app = new Vue({
    el: '#app',
    data: {
        title: 'Contas a pagar',
        activeView: 0,
        formType: 'insert',
        menus: [
            {id: 0, name: 'Listar contas'},
            {id: 1, name: 'Criar conta'}
        ],

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

        bills: [
            {data_due: '20/08/2016', name: 'Conta de Luz', value: 250.99, done: 1},
            {data_due: '21/08/2016', name: 'Conta de Água', value: 55.99, done: 0},
            {data_due: '22/08/2016', name: 'Conta de Telefone', value: 25.99, done: 1},
            {data_due: '23/08/2016', name: 'Conta de Supermercado', value: 700.99, done: 1},
            {data_due: '24/08/2016', name: 'Conta de Cartão de Crédito', value: 1599.80, done: 1},
            {data_due: '25/08/2016', name: 'Empréstimo', value: 2000.70, done: 1},
            {data_due: '26/08/2016', name: 'Gasolina', value: 300.85, done: 1}
        ]
    },

    computed: {
        status: function(){
            var count = 0;

            for(var i = 0; i < this.bills.length; i++){
                if(!this.bills[i].done){
                    count++;
                }
            }

            if(!this.bills.length){
                return 'Nenhuma conta cadastrada';
            }

            return !count ? 'Nenhuma conta a pagar' : 'Existem ' + count + ' a serem pagas';
        },

        corStatus: function(){
            var count = 0;

            for(var i = 0; i < this.bills.length; i++){
                if(!this.bills[i].done){
                    count++;
                }
            }

            if(!this.bills.length){
                return 'cinza';
            }

            return !count ? 'verde' : 'vermelho';
        }
    },

    methods: {
        showView: function(menu){
            this.activeView = menu.id;
        },

        submit: function(){
            if(this.formType == 'insert'){
                this.bills.push(this.bill);
            }

            this.activeView = 0;
            this.limparForm();
        },

        loadBill: function(bill){
            this.formType = 'update';
            this.bill = bill;
            this.activeView = 1;
        },

        excluir: function(bill){
            if(confirm("Tem certeza que deseja excluir esse registro?")){
                this.bills.$remove(bill);
            }
        },

        limparForm: function(){
            this.bill = {
                data_due: '',
                name: '',
                value: 0,
                done: 0
            };

            this.formType = 'insert';
        }
    }
});