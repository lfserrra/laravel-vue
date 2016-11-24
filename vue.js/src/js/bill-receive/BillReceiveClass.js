module.exports = class BillReceiveClass {
    constructor(data = {}) {
        this.date_due = '';
        this.name = '';
        this.value = 0;
        this.done = false;

        Object.assign(this, data);
    }

    toJSON() {
        return {
            date_due: this.getDateDue(this.date_due),
            name: this.name,
            value: this.value,
            done: this.done
        }
    }

    getDateDue(date_due) {
        let dateDueObject = date_due;

        if (!(date_due instanceof Date)) {
            dateDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
        }

        if (isNaN(dateDueObject.getTime()) || !dateDueObject) {
            return date_due;
        }

        return dateDueObject.toISOString().split('T')[0];
    }
}