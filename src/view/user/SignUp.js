
import SignUpPanel from 'components/user/SignUpPanel';
import EntryPanel from 'components/user/Panel';

let propTypes={
  signUpAjax: PT.func,
  signUpMsg: PT.object,
    clearLoginMsg: PT.func
};

export default class SignUp extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillUnmount(){
        this.props.clearLoginMsg();
    }

    render(){
        let {signUpMsg,signUpAjax}=this.props;
        return (
            <EntryPanel >
                <SignUpPanel
                        {...{
                            signUpMsg,
                            signUpAjax
                        }}
                />
            </EntryPanel>
        );
    }
}

SignUp.propTypes=propTypes;