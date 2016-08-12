var app = new Vue({
    el: '#app',
    data: {
        title: 'Contas a pagar',
        bills: [
            {data_due: '20/08/2016', name: 'Conta de Luz', value: 250.99, done: 1},
            {data_due: '21/08/2016', name: 'Conta de Água', value: 55.99, done: 1},
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

            return !count ? 'Nenhum conta a pagar' : 'Existem ' + count + ' a serem pagas';
        }
    }
});