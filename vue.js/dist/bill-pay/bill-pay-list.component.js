'use strict';

window.billPayListComponent = Vue.extend({
    components: {
        'modal': modalComponent
    },

    template: '\n    <div class="container">\n        <h3>Minhas contas a pagar</h3>\n        \n        <div class="row">\n            <table class="bordered highlight centered">\n                <thead>\n                    <tr>\n                        <th>#</th>\n                        <th>Vencimento</th>\n                        <th>Nome</th>\n                        <th>Valor</th>\n                        <th>Pago?</th>\n                        <th colspan="2">A\xE7\xF5es</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr v-for="(i, bill) in bills">\n                        <td>{{ i + 1 }}</td>\n                        <td>{{ bill.date_due | dateFormat \'pt-BR\' }}</td>\n                        <td>{{ bill.name | upperFormat }}</td>\n                        <td>{{ bill.value | numberFormat \'pt-BR\'}}</td>\n                        <td class="white-text" :class="{\'green lighten-2\': bill.done, \'red lighten-2\': !bill.done}">\n                            {{ bill.done | doneLabel }}\n                        </td>\n                        <td>\n                            <a v-link="{name: \'bill-pay.update\', params: {id: bill.id}}">Editar</a>\n                        </td>\n                        <td>\n                            <button type="button" @click.prevent="openModalDelete(bill)">Excluir</button>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n    </div>\n    \n    <modal :modal="modal">\n        <div slot="content">\n            <h4>Mensagem de confirma\xE7\xE3o</h4>\n            <p><strong>Deseja excluir esta conta?</strong></p>\n            <div class="divider"></div>\n            \n            <p>Nome: <strong>{{billToDelete.name}}</strong></p>\n            <p>Valor: <strong>{{billToDelete.value | numberFormat}}</strong></p>\n            <p>Data de vencimento: <strong>{{billToDelete.date_due | dateFormat}}</strong></p>\n            \n            <div class="divider"></div>\n        </div>\n        \n        <div slot="footer">\n            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click.prevent="deleteBill()">Ok</button>\n            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>\n        </div>\n    </modal>\n    ',

    data: function data() {
        return {
            bills: [],
            billToDelete: null,
            modal: {
                id: 'modal-delete'
            }
        };
    },
    created: function created() {
        var _this = this;

        BillPay.query().then(function (response) {
            _this.bills = response.data;
        });
    },


    methods: {
        deleteBill: function deleteBill() {
            var _this2 = this;

            BillPay.delete({ id: this.billToDelete.id }).then(function (response) {
                _this2.bills.$remove(_this2.billToDelete);
                _this2.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso', 4000);
                _this2.$dispatch('change-info-bill-pay');
            });
        },
        openModalDelete: function openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').openModal();
        }
    }
});