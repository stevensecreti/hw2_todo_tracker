// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import { ThreeDRotationSharp } from '@material-ui/icons';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");

        this.state = {
            taskInput: false,
            dateInput: false,
            statusInput: false
        }
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    taskInputOn = () => {
        console.log(this);
        this.setState({
            taskInput: true
        }); 
    }

    taskInputOnBlur = () =>{
        this.setState({
            taskInput: false
        }); 
    }

    dateInputOn = () => {
        this.setState({
            dateInput: true
        });  
    }

    dateInputOnBlur = () =>{
        this.setState({
            dateInput: false
        }); 
    }

    statusInputOn = () => {
        this.setState({
            statusInput: true
        });    
    }

    statusInputOnBlur = () =>{
        this.setState({
            statusInput: false
        }); 
    }

    handleTaskChange = (event) =>{
        this.props.changeTaskCallback(this.props.toDoListItem, event.target.value);
        this.taskInputOnBlur();
    }
    handleDateChange = (event) =>{
        this.props.changeDateCallback(this.props.toDoListItem, event.target.value);
        this.dateInputOnBlur();
    }
    handleStatusChange = (event) =>{
        this.props.changeStatusCallback(this.props.toDoListItem, event.target.value);
        this.statusInputOnBlur();
    }
    moveItemUp = () =>{
        this.props.moveUpCallback(this.props.toDoListItem);
    }
    moveItemDown = () =>{
        this.props.moveDownCallback(this.props.toDoListItem);
    }
    deleteItem = () =>{ 
        this.props.deleteItemCallback(this.props.toDoListItem);
    }
    isTopItem = () =>{
        return this.props.topElemenetCallback(this.props.toDoListItem);
    }
    isBottomItem = () =>{
        return this.props.bottomElementCallback(this.props.toDoListItem);
    }


    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";
        let taskInput = null;
        let dateInput = null;
        let statusInput = null;
        let moveUp = null;
        let moveDown = null;
        if(this.state.taskInput){
            taskInput = <input className='item-col task-col' id ={'task-input-' + listItem.id} type = {'text'} onBlur = {this.handleTaskChange} autoFocus></input>
        }
        else{
            taskInput = <div className='item-col task-col' onClick ={this.taskInputOn}>{listItem.description}</div>
        }
        if(this.state.dateInput){
            dateInput = <input className='item-col due-date-col' id ={'due-date-col-' + listItem.id} type = {'date'} onBlur = {this.handleDateChange} autoFocus></input>
        }
        else{
            dateInput = <div className='item-col due-date-col' id ={'due-date-col-' + listItem.id} onClick = {this.dateInputOn}>{listItem.due_date}</div>
        }
        if(this.state.statusInput){
            statusInput = <select className='item-col status-col'  id ={'status-col-' + listItem.id} className={statusType} onBlur = {this.handleStatusChange} autoFocus>
                <option value="incomplete">incomplete</option>
                <option value="complete">complete</option>
            </select>    
        }
        else{
            statusInput = <div className='item-col status-col'  id ={'status-col-' + listItem.id} className={statusType} onClick = {this.statusInputOn}>{listItem.status}</div>
        }
        if(this.props.topElementCallback(this.props.toDoListItem)){
            moveUp = null;
        }
        else{
            moveUp = <KeyboardArrowUp className='list-item-control todo-button' onClick = {this.moveItemUp}/>
        }
        if(this.props.bottomElementCallback(this.props.toDoListItem)){
            moveDown = null;
        }
        else{
            moveDown = <KeyboardArrowDown className='list-item-control todo-button' onClick = {this.moveItemDown}/>
        }

        
        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {taskInput}
                {dateInput}
                {statusInput}
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    {moveUp}
                    {moveDown}
                    <Close className='list-item-control todo-button' onClick = {this.deleteItem}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;