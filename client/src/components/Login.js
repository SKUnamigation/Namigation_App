import React, { Component } from 'react'
import Predict from './Predict';
import '../App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default class Login extends Component {
    constructor(props) {   // 초기 설정
        super(props);
        this.state = {
            userNum: "",
            name: "",
            // isLogin: true,
            isLogin: false,
            delay: 100,
            data: 'No result',
            screen:"notfull",
            isQR : null,
            LoginTime:0,
            isWrong:0,
        }
        this.GetVoiceValue = this.GetVoiceValue.bind(this);   
    }
    GetVoiceValue(data) { this.setState({userNum: data}) }

    handleLogin = e => {
        e.preventDefault() //페이징 이동 없게
        const login_info = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
        };
        fetch("/api/login", login_info).then(res => {
            return res.json();
        }).then(json => {
                if (json[0] != undefined) {
                    window.localStorage.setItem("userInfo", JSON.stringify(json))
                    this.setState({
                            userNum: json[0].usernum,
                            name: json[0].name,
                            isLogin: true });}
                else {
                    this.setState(
                        {
                            isWrong:false,
                        }
                    )
                    if(this.state.isWrong===false){
                    // alert("아이디 혹은 비밀번호를 확인하세요")
                    this.setState(
                        {
                            isWrong:0
                        }
                    )
                }
                }});
    }

    handleuserNum = e => {this.setState({ userNum: e.target.value})}

    render() {
        if(this.state.isQR===true&&this.state.LoginTime===0){
            try {
                setTimeout(() => {
                    try {
                        document.getElementById('btnLogin').click();     
                    } catch (error) {

                    }}, 1500);
            } catch (error) {
                console.log("로그인 오류")   
            }}
        return (
            <>
            <body scroll="no"></body>
                <Header />
                <div className="Content">
                    <div className="LoginPage">
                    <button id="FullScreenButton"></button>
                        {
                            this.state.isLogin === false ? (
                                <div className="Login-form">
                                    <form className="LoginForm" onSubmit={this.handleLogin}>
                                        <div id="title">Namigation</div>
                                        <br></br>
            <BarcodeScannerComponent width={500} height={500}
              onUpdate={(err, result) => {
                if (result) {
                document.getElementById("FullScreenButton").click();
                    this.setState({userNum: result.text, isQR:true})}
                else{
                this.setState(
                    {userNum: "QR 코드를 인식해주세요", isQR:false});}
              }}
            />
                          
             <div><input id="LoginInput" type="text" value={this.state.userNum} onChange={this.handleuserNum.bind(this)} placeholder="제공받은 유저키를 입력해주세요"></input>
             <button type="hidden" class="btn btn-primary" id="btnLogin" type="submit">1</button>
            </div>
            </form></div>) 
            :           ///로그인이 되었다면 Predict 화면 
            (<div><Predict name={this.state.name} userNum={this.state.userNum} isLogin={this.state.isLogin}></Predict></div>)}</div></div>
            </>
        )
    }
}
