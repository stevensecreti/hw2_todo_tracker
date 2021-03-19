'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(app, item, value) {
        super()
        this.app = app;
        this.oldItem = item;
        this.newValue = value;
        this.newItem = null;
        this.oldValue = item.status;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.newItem = this.app.changeStatus(this.oldItem, this.newValue);
    }

    undoTransaction() {
        this.app.changeStatus(this.newItem, this.oldValue);
    }
}