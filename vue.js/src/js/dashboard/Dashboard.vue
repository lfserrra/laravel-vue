<template>
    <div class="section">
        <div class="container">
            <h4>{{ title }}</h4>
            <h5>{{ description }}</h5>

            <div class="row">
                <div class="col s6">
                    <div class="card z-depth-2">
                        <div class="card-content">
                            <p class="card-title">
                                <i class="material-icons">account_balance</i> Receber
                            </p>
                            <h5>{{ receive | currency 'R$ '}}</h5>
                        </div>
                    </div>
                </div>

                <div class="col s6">
                    <div class="card z-depth-2">
                        <div class="card-content">
                            <p class="card-title">
                                <i class="material-icons">account_balance</i> Pagar
                            </p>
                            <h5>{{ pay | currency 'R$ '}}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <div class="card z-depth-2" :class="{'green': (receive - pay) >= 0, 'red': (receive - pay) < 0}">
                        <div class="card-content">
                            <p class="card-title">
                                <i class="material-icons">account_balance</i> Saldo
                            </p>
                            <h5>{{ receive - pay | currency 'R$ ' }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {BillPayResource} from '../resources';
    import {BillReceiveResource} from '../resources';

    export default {
        data() {
            return {
                title: 'Dashboard',
                description: 'Dashboard sistema financeiro',
                accounts_payable: false,
                receive: 0,
                pay: 0
            };
        },

        created() {
            BillReceiveResource.total().then((response) => {
                this.receive = response.data.total;
            });

            BillPayResource.total().then((response) => {
                this.pay = response.data.total;
            });
        }
    };
</script>