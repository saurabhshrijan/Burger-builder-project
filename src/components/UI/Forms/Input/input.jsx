import React from 'react'
import classes from "../Input/input.css";
export default class Input extends React.Component {
    render() {
        let InputElementType = null;
        switch (this.props.eleName) {
            case 'input':
                InputElementType = <input 
                                    {...this.props.eleConfig} value ={this.props.value}
                                    className={this.props.isValid ? classes.input : classes.input + " " + classes.invalidField} 
                                    onChange={this.props.handleChange} 
                                    />
                break;
            case 'textarea':
                InputElementType = <textarea 
                                    {...this.props.eleConfig} value = {this.props.value}
                                    className={classes.textArea} 
                                    onChange={this.props.handleChange} 
                                    />
                break;
            case 'dropdown':
                InputElementType = <select onChange={this.props.handleChange}>
                                    {this.props.eleConfig.options.map(i => {
                                    return <option value={i} key ={i}>{i}</option>
                                    })}
                                    </select>
                break;
            default:
                InputElementType = <input 
                                    {...this.props.eleConfig}
                                    value={this.props.value} 
                                    className={classes.input} 
                                    onChange={this.props.handleChange} 
                                    />
                break;
        }
        return (
            <div>
               
                    <div className={classes.inputWrapper}>
                        {InputElementType}
                    </div>
                
            </div>

        )

    }
}
