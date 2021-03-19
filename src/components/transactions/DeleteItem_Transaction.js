'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(app, item, index) {
        super()
        this.app = app;
        this.item = item;
        this.index = index;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.app.deleteItem(this.item);
    }

    undoTransaction() {
        this.app.undoDeleteItem(this.item, this.index);
    }
}