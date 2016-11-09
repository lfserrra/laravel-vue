'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.filter('doneLabel', function (value) {
    return value == 1 ? 'Paga' : 'Não Paga';
});

Vue.filter('payStatusGeneral', function (value) {
    if (value === false) {
        return 'Nenhuma conta cadastrada';
    }

    if (!value) {
        return 'Nenhuma conta a pagar';
    }

    if (value === 1) {
        return 'Existe 1 conta a pagar';
    }

    return value + ' contas a pagar';
});

Vue.filter('receiveStatusGeneral', function (value) {
    if (value === false) {
        return 'Nenhuma conta cadastrada';
    }

    if (!value) {
        return 'Nenhuma conta a receber';
    }

    if (value === 1) {
        return 'Existe 1 conta a receber';
    }

    return value + ' contas a receber';
});

Vue.filter('numberFormat', {
    read: function read(value, language) {
        var number = 0;

        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : 0;
        }

        return new Intl.NumberFormat(language, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write: function write(value) {
        var number = 0;

        if (value.length > 0) {
            number = value.replace(/[^\d,]/g, '').replace(/\,/g, '.');

            number = isNaN(number) ? 0 : parseFloat(number);
        }

        return number;
    }
});

Vue.filter('dateFormat', {
    read: function read(value, language) {
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== undefined) {
            if (!(value instanceof Date)) {
                var dateRegex = value.match(/\d{4}\-\d{2}\-\d{2}/g);
                var dateString = dateRegex ? dateRegex[0] : dateRegex;

                if (dateString) {
                    value = new Date(dateString + "T03:00:00");
                } else {
                    return value;
                }
            }

            return new Intl.DateTimeFormat(language).format(value).split(' ')[0];
        }

        return value;
    },
    write: function write(value) {
        var dateRegex = value.match(/\d{2}\/\d{2}\/\d{4}/g);

        if (dateRegex) {
            var dateString = dateRegex[0];
            var date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");

            if (!isNaN(date.getTime())) {
                return date;
            }
        }

        return value;
    }
});

Vue.filter('upperFormat', {
    read: function read(value) {
        return value.toUpperCase();
    },
    write: function write(value) {
        return value.toLowerCase();
    }
});