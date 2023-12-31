import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css';


type PropsType = {
    status: string
    updateStatus: (s: string) => void
}
type StateType = {
    status: string
    editMode: boolean
}

class ProfileStatus extends React.Component<PropsType & StateType, any> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {

        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }

        console.log("componentDidUpdate")
    }

    render() {
        console.log("render")
        return (
            <div>
                {!this.state.editMode &&
                <div>
                        <span
                            onDoubleClick={this.activateEditMode}>
                            {this.props.status || "-------"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode.bind(this)}
                           value={this.state.status}/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;