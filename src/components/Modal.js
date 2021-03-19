import React from "react";

export default class Modal extends React.Component{
    render(){
        if(!this.props.show){
            return null;
        }
        return <div class="modal" id="modal">
                    <div class ="modal-dialog">
                        <header class = "modal-header" id = "modal-header">
                            Delete List?
                        </header>
                        <div class = "modal-footer" id = "modal-footer">
                            <button class = "modal-button" id = "cancelDelete" label="Cancel" onClick = {this.props.closeModalCallback}>Cancel</button>
                            <button class = "modal-button" id = "confirmDelete" label="Confirm" onClick = {this.props.confirmModalCallback}>Confirm</button>    
                        </div>   
                    </div>
                </div>;
    }
}