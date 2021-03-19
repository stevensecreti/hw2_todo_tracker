// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");

    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    changeName = (event) => {
        this.props.changeNameCallback(event.target.value);
    }

    render() {
        let currentList = this.props.getIndexCallback;
        let listText = <div className='todo-list-button' onClick = {this.handleLoadList}>{this.props.toDoList.name}<br /></div>;
        if(this.props.toDoList == currentList){
            listText = <div className = 'todo-list-button'><input className = 'topList' type = 'text' placeholder = {this.props.toDoList.name} onBlur = {this.changeName}></input><br /></div>
        }
        else{
            listText = <div className='todo-list-button' onClick = {this.handleLoadList}>{this.props.toDoList.name}<br /></div>
        }
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");

        return (
            <div>
                {listText}
            </div>
            
        )
    }
}

export default ListLink;