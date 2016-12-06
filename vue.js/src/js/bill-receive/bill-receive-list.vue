<template>
    <div class="container">
        <h3>Minhas contas a receber</h3>

        <div class="row">
            <table class="bordered highlight centered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Vencimento</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Pago?</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(i, bill) in bills">
                    <td>{{ i + 1 }}</td>
                    <td>{{ bill.date_due | dateFormat 'pt-BR' }}</td>
                    <td>{{ bill.name | upperFormat }}</td>
                    <td>{{ bill.value | numberFormat 'pt-BR'}}</td>
                    <td class="white-text" :class="{'green lighten-2': bill.done, 'red lighten-2': !bill.done}">
                        {{ bill.done | doneLabel }}
                    </td>
                    <td>
                        <a v-link="{name: 'bill-receive.update', params: {id: bill.id}}" class="btn waves-effect waves-light">
                            <i class="material-icons">mode_edit</i>
                        </a>

                        <button type="button" @click.prevent="openModalDelete(bill)" class="btn red waves-effect waves-light">
                            <i class="material-icons">delete</i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <modal :modal="modal">
        <div slot="content" v-if="billToDelete">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta?</strong></p>
            <div class="divider"></div>

            <p>Nome: <strong>{{billToDelete.name}}</strong></p>
            <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong></p>
            <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat}}</strong></p>

            <div class="divider"></div>
        </div>

        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click.prevent="deleteBill()">Ok</button>
            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
        </div>
    </modal>
</template>

<script>
import {BillReceiveResource} from '../resources';
import Modal from '../Modal.vue';

export default {
    components: {
        'modal': Modal
    },

    data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },

    created(){
        BillReceiveResource.query().then((response) => {
            this.bills = response.data;
        });
    },

    ready(){
        $(`#${this.modal.id}`).modal();
    },

    methods: {
        deleteBill() {
            BillReceiveResource.delete({id: this.billToDelete.id}).then((response) => {
                this.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso', 4000);
                this.$dispatch('change-info-bill-receive');
            });
        },

        openModalDelete(bill){
            this.billToDelete = bill;

            $(`#${this.modal.id}`).modal('open');
        }
    }
};
</script>