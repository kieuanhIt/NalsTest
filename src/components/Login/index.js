import React, {Component,useState} from 'react';
import './login.scss';
import axios from 'axios' ;

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {username:'',
            password: ''};
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    // const [username, setUserName] = useState("");
    // const [password, setPassword] = useState("");
    handleChangeName (event) {
        this.setState({username:event.target.value})
    }
    handleChangePass (event) {
        this.setState({password:event.target.value})
    }
    handleSubmit () {
  
        axios.post('https://webtop.online/api/v1/login',
        {username:this.state.username,password:this.state.password}
        )
        .then( res => {
            console.log(res.data);
            localStorage.setItem('token',res.data.data);
            document.location.href='/'
        })
        .catch(error => alert("error"))
    }
    render() {  
        return(
            <form > 
                <label>UserName
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChangeName}/>
                </label>
                <label>
                    Password
                    <input type="text" value={this.state.password} name="password" onChange={this.handleChangePass} />
                </label>
                <a type="submit" onClick={this.handleSubmit} >Submit</a>
            </form>
        )
    }
}
export default Login;