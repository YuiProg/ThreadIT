import React, { type ChangeEvent } from "react";
import Authenticate from "../helpers/authenticate.ts";
import AuthStore from "../store/authStore.ts";


type LoginState = {
    username?: string;
    email: string;
    password: string;
    isRegister: boolean;
}


class Login extends React.Component<{}, LoginState> {

    constructor(props : {}) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            isRegister: false
        }
    }

    private setInputs = (e : ChangeEvent<HTMLInputElement>) => {
        this.setState({
        ...this.state,
        [e.target.name]: e.target.value
        });
    }

    private handleAuth = (e: React.FormEvent<HTMLFormElement>, mode: string) => {
        e.preventDefault();
        const auth = new Authenticate({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        });
        switch (mode) {
            case 'register':
                auth.RegisterUser();
            break;
            case 'login':
                auth.LoginUser();
            break;
        }
    }
    
    render(): React.ReactNode {
        const {authenticating} = AuthStore.getState();
        return (
            <>
            <div className="w-full h-screen flex items-center justify-center">
                <form onSubmit={(e) => this.handleAuth(e, this.state.isRegister ? 'register' : 'login')} 
                    className="w-200 h-200 p-10 rounded-xl flex flex-col gap-2 justify-center"
                >
                    <h1 className="text-3xl font-bold mb-5 text-center">{this.state.isRegister ? 'REGISTER' : 'LOGIN'}</h1>
                    {this.state.isRegister && (
                        <>
                        <p className="text-gray-400 text-lg">Username:</p>
                        <input 
                            name="username" 
                            type="text" 
                            onChange={(e) => this.setInputs(e)} 
                            placeholder="..." 
                            className="input rounded-xl w-full h-20 border placeholder:text-center placeholder:text-2xl text-2xl text-center"
                            required
                        />
                        </>
                    )}
                    <p className="text-gray-400 text-lg">Email:</p>
                    <input 
                        name="email" 
                        onChange={(e) => this.setInputs(e)} 
                        type="email" placeholder="..." 
                        className="input rounded-xl w-full h-20 border placeholder:text-center placeholder:text-2xl text-2xl text-center"
                        required
                    />
                    <p className="text-gray-400 text-lg">Password:</p>
                    <input 
                        name="password" 
                        type="password" 
                        onChange={(e) => this.setInputs(e)} 
                        placeholder="..." 
                        className="input mb-5 rounded-xl w-full h-20 border placeholder:text-center placeholder:text-2xl text-2xl text-center"
                        required
                    />
                    <div className="flex w-full justify-center gap-3">
                        {this.state.isRegister ? (
                        <button type="submit" className="btn rounded-xl h-15 w-full hover:bg-secondary cursor-pointer active:bg-primary text-xl font-semibold">
                            {authenticating 
                            ? (
                                <span className="loading loading-spinner"></span>
                            ) 
                            : 'REGISTER'}
                        </button>
                        ) : (
                        <button type="submit" className="btn rounded-xl h-15 w-full hover:bg-secondary cursor-pointer active:bg-primary text-xl font-semibold">
                            {authenticating 
                            ? (
                                <span className="loading loading-spinner"></span>
                            ) 
                            : 'LOGIN'}
                        </button>
                        )}
                    
                    </div>
                    {!this.state.isRegister 
                    ? (<p>Don't have an account?  
                        <span onClick={() => this.setState({isRegister: true})} className="underline cursor-pointer active:text-primary ml-1">
                            Click here
                        </span>
                    </p>) 
                    : (<p>Already have an account? 
                        <span onClick={() => this.setState({isRegister: false})} className="underline cursor-pointer active:text-primary ml-1">
                            Click here
                        </span>
                    </p>)}
                    
                </form>
            </div>  
            </>
        );
    }
}

export default Login;