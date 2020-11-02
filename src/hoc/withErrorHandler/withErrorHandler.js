import React from 'react';
import Modal from "../../components/UI/Modal/Modal"
import Aux from "../Auxilary/Auxilary"
export const withErrorHandler = (WrappedComponent,axios)=>{
    return class extends React.Component{
        state = {
            error:null
        }
        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use((req)=>{
                this.setState({error:null});
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(res=>res,(err)=>{
                console.log(err)
                this.setState({error:err})
            })
           
        }
        
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler = () =>{
            this.setState({error:null});
        }
        render(){
                return(
                    <Aux>
                        <Modal 
                        show = {this.state.error} 
                        modalClosed = {this.errorConfirmedHandler}>
                            {this.state.error ? this.state.error.message:null}
                        </Modal>
                    <WrappedComponent {...this.props}/>
                    </Aux>
                )
            }
    }  
}