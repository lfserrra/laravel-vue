'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BillPayClass = function () {
    function BillPayClass() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, BillPayClass);

        this.date_due = '';
        this.name = '';
        this.value = 0;
        this.done = false;

        Object.assign(this, data);
    }

    _createClass(BillPayClass, [{
        key: 'toJSON',
        value: function toJSON() {
            return {
                date_due: this.getDateDue(this.date_due),
                name: this.name,
                value: this.value,
                done: this.done
            };
        }
    }, {
        key: 'getDateDue',
        value: function getDateDue(date_due) {
            var dateDueObject = date_due;

            if (!(date_due instanceof Date)) {
                dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
            }

            if (isNaN(dateDueObject.getTime()) || !dateDueObject) {
                return date_due;
            }

            return dateDueObject.toISOString().split('T')[0];
        }
    }]);

    return BillPayClass;
}();