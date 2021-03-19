'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(app, item) {
        super()
        this.app = app;
        this.item = item;
    }

    doTransaction() {
        this.app.moveItemUp(this.item);
    }

    undoTransaction() {
        this.app.moveItemDown(this.item);
    }
}