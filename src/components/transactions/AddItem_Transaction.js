'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddItem_Transaction extends jsTPS_Transaction {
    constructor(app) {
        super()
        this.app = app;
        this.item = null;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.item = this.app.addNewItemToList();
    }

    undoTransaction() {
        this.app.deleteItem(this.item);
    }
}