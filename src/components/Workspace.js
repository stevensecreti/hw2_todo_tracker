// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showUndo: this.props.showUndo,
            showRedo: this.props.showRedo,
            showListTools: this.props.showListTools,
        }
    }

    render() {
        let showUndo = null;
        let showRedo = null;
        let showAdd = null;
        let showTrash = null;
        let showClose = null;
        if(this.props.showUndo){
            showUndo = <Undo id="undo-button" className="list-item-control material-icons todo-button" onClick = {this.props.undoCallback}/>
        }
        else{
            showUndo = null;
        }
        if(this.props.showRedo){
            showRedo = <Redo id="redo-button" className="list-item-control material-icons todo-button" onClick = {this.props.redoCallback}/>
        }
        else{
            showRedo = null;
        }
        if(this.props.showListTools){
            showAdd = <AddBox id="add-item-button" className="list-item-control material-icons todo-button" onClick ={this.props.addItemCallback}/>
            showTrash = <Delete id="delete-list-button" className="list-item-control material-icons todo-button" onClick ={this.props.deleteListCallback}/> 
            showClose = <Close id="close-list-button" className="list-item-control material-icons todo-button" onClick ={this.props.closeListCallback}/>
        }
        else{
            showAdd = null;
            showTrash = null;
            showClose = null;
        }
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        {showUndo}
                        {showRedo}
                        {showAdd}
                        {showTrash}
                        {showClose}
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            changeTaskCallback ={this.props.changeTaskCallback}
                            changeDateCallback={this.props.changeDateCallback}
                            changeStatusCallback={this.props.changeStatusCallback}
                            moveUpCallback = {this.props.moveUpCallback}
                            moveDownCallback = {this.props.moveDownCallback}
                            deleteItemCallback = {this.props.deleteItemCallback}
                            topElementCallback = {this.props.topElementCallback}
                            bottomElementCallback = {this.props.bottomElementCallback}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;