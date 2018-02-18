import React , {Component} from 'react';
import Panel from './Panel';
import S from './style.scss';
import Validation from 'util/validation'

let propTypes={
    signUpAjax: PT.func,
    signUpMsg: PT.object
};

export default class SignUpPanel extends Component{

    constructor(props){
        super(props);
        this.state={
            username:'',
            passw:'',
            cfpassw:'',
            nameErr:false,
            passwErr:false,
            cfPasswErr:false

        };

        this.validation=new Validation();
        this.validation.addByValue('username',[
            {strategy:'isEmpty',errorMsg:'用户名不能为空'},
            {strategy:'hasSpace',errorMsg:'用户名不能有空格'},
            {strategy:'maxLength:6',errorMsg:'长度最长为6'}
        ]);
        this.validation.addByValue('passw',[
            {strategy:'isEmpty',errorMsg:'密码不能为空'},
            {strategy:'hasSpace',errorMsg:'密码不能有空格'},
            {strategy:'maxLength:6',errorMsg:'长度最长为6'}
        ]);


        this.nameChange=this.nameChange.bind(this);
        this.passwChange=this.passwChange.bind(this);
        this.cfpasswChange=this.cfpasswChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onSubmit(ev){
        ev.preventDefault();
        ev.stopPropagation();

        let {validation}=this;

        let{username,passw,cfpassw}=this.state;

        let nameErr=this.validation.valiOneByValue('username',username);
        let passwErr=this.validation.valiOneByValue('passw',passw);
        let cfPasswErr=passw===cfpassw ?'':'密码不一致';

        this.setState({
            nameErr,passwErr,cfPasswErr
        });

        if(!nameErr && !passwErr && !cfPasswErr){
           this.props.signUpAjax({
               username,passw,cfpassw
           })
        }

    }
    
    nameChange(ev){
        let {target}=ev;
        let wsg=this.validation.valiOneByValue('username',target.value);
        this.setState({
            username:target.value,
            nameErr:wsg
        })

    }
    passwChange(ev){
        let {target}=ev;
        let wsg=this.validation.valiOneByValue('passw',target.value);
        let {cfPasswErr}=this.state;
        this.setState({
            passw:target.value,
            passwErr:wsg
        });
        if(cfPasswErr){
            this.cfpasswChange();
        }
    }

    cfpasswChange(){
        let {passwDom,cfPasswDom}=this.refs;
        let cfPasswErr=passwDom.value===cfPasswDom.value?'':'密码不一致';
        this.setState({
            cfpassw:cfPasswDom.value,
            cfPasswErr
        })
    }
    render(){

        let {nameChange,passwChange,cfpasswChange,onSubmit}=this;
        let{username,passw,cfpassw,nameErr,passwErr,cfPasswErr}=this.state;
        let {signUpMsg}=this.props;

        let resInfo=null;

        if(signUpMsg){
            if(signUpMsg.code===0){
                resInfo=(
                        <div className='ui message positive'>
                            <p>{signUpMsg.msg}</p>
                            <p>马上帮你登录</p>
                        </div>
                );
            }else{
                resInfo=(
                        <div className='ui message error'>
                            <p>{signUpMsg.msg}</p>
                        </div>
                );
            }
        }

        let nameErrMsg= nameErr? (
                <p className={S.err}>{nameErr}</p>
        ): null;

        let passwErrMsg=passwErr?(
                <p className={S.err}>{passwErr}</p>
        ):null;

        let cfPasswErrMsg=cfPasswErr?(
                <p className={S.err}>{cfPasswErr}</p>
        ):null;

        return (
            <div className={S.sign_panel}>
                {resInfo}
                <form
                    className="ui form"
                    onSubmit={onSubmit}
                >
                    <div className={`field ${nameErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="用户名"
                            ref="nameDom"
                            value={username}
                            onChange={nameChange}
                        />
                        {nameErrMsg}
                    </div>
                    <div className={`field ${nameErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="密码"
                            ref="passwDom"
                            value={passw}
                            onChange={passwChange}
                        />
                        {passwErrMsg}
                    </div>
                    <div className={`field ${cfPasswErr?'error':''}`}>
                        <input
                            type="text"
                            placeholder="确认密码"
                            ref="cfPasswDom"
                            value={cfpassw}
                            onChange={cfpasswChange}
                        />
                        {cfPasswErrMsg}
                    </div>
                    <div className="field">
                        <button type="submit"
                            className="ui button fluid primary"
                        >注册</button>
                    </div>
                </form>
            </div>
        );
    }
}

SignUpPanel.propTypes=propTypes;