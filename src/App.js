// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import Modal from './components/Modal'
import AddItem_Transaction from './components/transactions/AddItem_Transaction'
import ChangeTask_Transaction from './components/transactions/ChangeTask_Transaction'
import ChangeDate_Transaction from './components/transactions/ChangeDate_Transaction'
import ChangeStatus_Transaction from './components/transactions/ChangeStatus_Transaction'
import MoveUp_Transaction from './components/transactions/MoveUp_Transaction'
import MoveDown_Transaction from './components/transactions/MoveDown_Transaction'
import DeleteItem_Transaction from './components/transactions/DeleteItem_Transaction'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true,
      show: false,
      showAddNewList: true,
      showUndo: false,
      showRedo: false,
      showListTools: false
    }
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.keyCheck, false);
  }
  keyCheck = (event) => {
    if(event.key == "z" && event.ctrlKey){
      this.doUndo();
    }
    if(event.key == "y" && event.ctrlKey){
      this.doRedo();
    }
  }


  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);
    this.tps.clearAllTransactions();
    this.checkUndo();
    this.checkRedo();
    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
      showAddNewList: false,
      showListTools: true
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);
  }

  toggleModalOn = () => {
    this.setState({
      show:true      
    }, this.afterToDoListsChangeComplete);
  }

  toggleModalOff = () => {
    console.log(1);
    this.setState({
      show:false      
    }, this.afterToDoListsChangeComplete);
  }

  addNewItemTransaction = () =>{
    let transaction = new AddItem_Transaction(this);
    this.tps.addTransaction(transaction);
    this.checkUndo();
    this.checkRedo();
  }

  addNewItemToList = () =>{
      let newItem = this.makeNewToDoListItem();
      let temp = newItem;
      temp.id = this.state.nextListItemId;
      let currentItemsList = this.state.currentList;
      currentItemsList.items.push(temp);
      let indexOfList = -1;
      for (let i = 0; i < this.state.toDoLists.length; i++) {
          if(this.state.toDoLists[i] == this.state.currentList){
            indexOfList = i;
          }
      }
      let listItemId = this.state.nextListItemId + 1;
      let listOfLists = this.state.toDoLists;
      listOfLists[indexOfList] = currentItemsList;
      this.setState({
        toDoList: listOfLists,
        currentList: currentItemsList,
        nextListItemId: listItemId,
      }, this.afterToDoListsChangeComplete);
      return temp;
  }

  closeCurrentList = () =>{
    this.tps.clearAllTransactions();
    this.checkUndo();
    this.checkRedo();
    this.setState({
      currentList: {items: []},
      showAddNewList: true,
      showListTools: false
    }, this.afterToDoListsChangeComplete);
  }

  deleteCurrentList = () => {
    this.tps.clearAllTransactions();
    this.checkUndo();
    this.checkRedo();
    let listToDelete = this.state.currentList;
    let indexOfList = -1;
    for (let i = 0; i < this.state.toDoLists.length; i++) {
        if(this.state.toDoLists[i] == listToDelete){
          indexOfList = i;
        }
    }
    this.state.toDoLists.splice(indexOfList, 1);
    this.setState({
      toDoLists: this.state.toDoLists,
      currentList: {items: []},
      nextListId: this.state.nextListId,
      show:false,
      showAddNewList: true,
      showListTools: false
    }, this.afterToDoListsChangeComplete);
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.highListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      description: "No Description",
      dueDate: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }


  changeTaskTransaction = (item, value) =>{
    let transaction = new ChangeTask_Transaction(this, item, value);
    this.tps.addTransaction(transaction);
    this.checkUndo();
    this.checkRedo();
  }
  changeTask = (item, value) => {
    let changedVal = value
    let index = this.state.currentList.items.indexOf(item);
    let listItem = this.state.currentList.items[index];
    item.description = changedVal;
    this.state.currentList.items[index] = item;
    let listCurrent = this.state.currentList;
    this.setState({
      currentList: listCurrent
    })
    return item;
  }

  changeDateTransaction = (item, value) =>{
    let transaction = new ChangeDate_Transaction(this, item, value);
    this.tps.addTransaction(transaction);
    this.checkUndo();
    this.checkRedo();
  }
  changeDate = (item, value) => {
    let changedVal = value
    let index = this.state.currentList.items.indexOf(item);
    let listItem = this.state.currentList.items[index];
    item.due_date = changedVal;
    this.state.currentList.items[index] = item;
    let listCurrent = this.state.currentList;
    this.setState({
      currentList: listCurrent
    })
    return item;
  }

  changeStatusTransaction = (item, value) =>{
    let transaction = new ChangeStatus_Transaction(this, item, value);
    this.tps.addTransaction(transaction);
    this.checkUndo();
    this.checkRedo();
  }
  changeStatus = (item, value) => {
    let changedVal = value
    let index = this.state.currentList.items.indexOf(item);
    let listItem = this.state.currentList.items[index];
    item.status = changedVal;
    this.state.currentList.items[index] = item;
    let listCurrent = this.state.currentList;
    this.setState({
      currentList: listCurrent
    })
    return item;
  }

  moveItemUpTransaction = (item) =>{
    let transaction = new MoveUp_Transaction(this, item);
    this.tps.addTransaction(transaction);
    this.checkUndo();
    this.checkRedo();
  }
  moveItemUp = (item) =>{
    let index = this.state.currentList.items.indexOf(item);
    let listItem = this.state.currentList.items[index];
    let switchItemIndex = index-1;
    let switchItem = this.state.currentList.items[switchItemIndex];
    let listCurrent = this.state.currentList;
    listCurrent.items[switchItemIndex] = listItem;
    listCurrent.items[index] = switchItem;
    this.setState({
      currentList: listCurrent
    })
  }

  moveItemDownTransaction = (item) =>{
    let transaction = new MoveDown_Transaction(this, item);
    this.tps.addTransaction(transaction);
    this.checkUndo();
    this.checkRedo();
  }
  moveItemDown = (item) =>{
    let index = this.state.currentList.items.indexOf(item);
    let listItem = this.state.currentList.items[index];
    let switchItemIndex = index+1;
    let switchItem = this.state.currentList.items[switchItemIndex];
    let listCurrent = this.state.currentList;
    listCurrent.items[switchItemIndex] = listItem;
    listCurrent.items[index] = switchItem;
    this.setState({
      currentList: listCurrent
    })
  }

  deleteItemTransaction = (item) =>{
    let index = this.state.currentList.items.indexOf(item);
    let transaction = new DeleteItem_Transaction(this, item, index);
    this.tps.addTransaction(transaction);    
    this.checkUndo();
    this.checkRedo();
  }

  deleteItem = (item) =>{
    let index = this.state.currentList.items.indexOf(item);
    let listCurrent = this.state.currentList;
    listCurrent.items.splice(index, 1);
    this.setState({
      currentList: listCurrent
    })
  }
  undoDeleteItem = (item, index) =>{
    let listCurrent = this.state.currentList;
    listCurrent.items.splice(index, 0, item);
    this.checkUndo();
    this.checkRedo();
    this.setState({
      currentList: listCurrent
    })
  }

  changeListName = (name) =>{
    if(name != ""){
      let newName = name;
      let listCurrent = this.state.currentList;
      let index = this.state.toDoLists.indexOf(listCurrent);
      listCurrent.name = name;
      let allLists = this.state.toDoLists;
      allLists[index] = listCurrent;
      this.setState({
        toDoLists: allLists,
        currentList: listCurrent
      })
    }
  }

  isTopElement = (item) =>{
    let currentItem = item;
    let listCurrent = this.state.currentList;
    if(listCurrent.items[0] == currentItem){
      return true;
    }
    else{
      return false;
    }
  }
  isBottomElement = (item) =>{
    let currentItem = item;
    let listCurrent = this.state.currentList;
    let lastItem = listCurrent.items[listCurrent.items.length - 1];
    if(lastItem == currentItem){
      return true;
    }
    else{
      return false;
    }
  }
  checkUndo = () =>{
    if(this.tps.hasTransactionToUndo()){
      this.setState({
        showUndo: true
      })
    }
    else{
      this.setState({
        showUndo: false
      })
    }
  }
  checkRedo = () =>{
    if(this.tps.hasTransactionToRedo()){
      this.setState({
        showRedo: true
      })
    }
    else{
      this.setState({
        showRedo: false
      })
    }
  }
  doUndo = () =>{
    this.tps.undoTransaction();
    this.checkUndo();
    this.checkRedo();
  }
  doRedo = () =>{
    this.tps.doTransaction();
    this.checkUndo();
    this.checkRedo();
  }

  render() {
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          showAddListButton={this.state.showAddNewList}
          getIndexCallback={this.state.currentList}
          changeNameCallback={this.changeListName}
        />
        <Workspace 
          toDoListItems={items}
          addItemCallback = {this.addNewItemTransaction}
          closeListCallback = {this.closeCurrentList}
          deleteListCallback={this.toggleModalOn}
          changeTaskCallback={this.changeTaskTransaction}
          changeDateCallback={this.changeDateTransaction}
          changeStatusCallback={this.changeStatusTransaction}
          moveUpCallback = {this.moveItemUpTransaction}
          moveDownCallback = {this.moveItemDownTransaction}
          deleteItemCallback = {this.deleteItemTransaction}
          showUndo = {this.state.showUndo}
          showRedo = {this.state.showRedo}
          showListTools = {this.state.showListTools}
          topElementCallback = {this.isTopElement}
          bottomElementCallback = {this.isBottomElement}
          undoCallback = {this.doUndo}
          redoCallback = {this.doRedo}

        />
        <Modal
          show={this.state.show}
          closeModalCallback={this.toggleModalOff}
          confirmModalCallback={this.deleteCurrentList}
        />

      </div>
    );
  }
}

export default App;