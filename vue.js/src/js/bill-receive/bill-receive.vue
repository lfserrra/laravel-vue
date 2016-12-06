<template>
    <div class="section">
        <div class="container">
            <h4>{{ title }}</h4>
            <div class="row">
                <div class="col s6">
                    <div class="card z-depth-2" :class="{'grey': status === false, 'green': status === 0, 'red': status > 0}">
                        <div class="card-content white-text">
                            <p class="card-title">
                                <i class="material-icons">account_balance</i>
                            </p>
                            <h5>{{ status | receiveStatusGeneral }}</h5>
                        </div>
                    </div>
                </div>

                <div class="col s6">
                    <div class="card z-depth-2">
                        <div class="card-content">
                            <p class="card-title">
                                <i class="material-icons">payment</i>
                            </p>
                            <h5>{{ total | currency 'R$ ' }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="divider"></div>

    <router-view></router-view>
</template>

<script>
    import {BillReceiveResource} from '../resources';

    export default {
        data() {
            return {
                title: 'Contas a Receber',
                status: false,
                total: 0
            };
        },

        created(){
            this.updateStatus();
            this.updateTotal();
        },

        methods: {
            calculateStatus(bills){
                if (!bills.length) {
                    this.status = false;
                }

                let count = 0;
                for (let i = 0; i < bills.length; i++) {
                    if (!bills[i].done) {
                        count++;
                    }
                }

                this.status = count;
            },

            updateStatus(){
                BillReceiveResource.query().then((response) => {
                    this.calculateStatus(response.data);
                });
            },

            updateTotal(){
                BillReceiveResource.total().then((response) => {
                    this.total = response.data.total;
                });
            }
        },

        events: {
            'change-info-bill-receive'(){
                this.updateStatus();
                this.updateTotal();
            }
        }
    };
</script>