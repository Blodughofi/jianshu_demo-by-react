
import S from './style.scss';
import cfg from 'config/config.json'

let propTypes={
    notebooks: PT.array,
    userInfo: PT.object,
    notebookClick: PT.func,
    isMe : PT.bool,
    updateUserIntro : PT.func
};

export default class Aside extends React.Component{
    constructor(props){
        super(props);
        this.state={
            inEdit: false,
            editVal: ''
        };

        this.editMe=this.editMe.bind(this);
        this.editContent=this.editContent.bind(this);
        this.cancelEdit=this.cancelEdit.bind(this);
        this.editDone=this.editDone.bind(this);
    }

    editDone(ev){
        ev.stopPropagation();
        ev.preventDefault();

        let {editVal}= this.state;

        let {userInfo:{user_id},updateUserIntro} = this.props;

        $.post(`${cfg.url}/editIntro`,{user_intro:editVal,user_id})
         .done(({code})=>{
            if(code===0){
                updateUserIntro(editVal);
                this.setState({inEdit : false})
            }
         })
    }

    editMe(ev){
        ev.stopPropagation();
        ev.preventDefault();

        let {user_intro} = this.props.userInfo;

        this.setState({inEdit: true, editVal: user_intro});
    }

    editContent(ev){
        this.setState({editVal:ev.target.value});
    }

    cancelEdit(){
        this.setState({inEdit: false});
    }

    render(){

        let {notebooks,userInfo,notebookClick,isMe}=this.props;

        let {editMe,editContent,cancelEdit,editDone} = this;

        let {inEdit,editVal} = this.state;

        notebooks=notebooks.map((elt,i)=>{
            let {id:collection_id,collection_name}=elt;

            return (
                    <div className='item'
                         key={i}
                         onClick={event=>{
                             notebookClick(collection_id,collection_name)
                         }}
                    >
                        <i className='book icon'></i>
                        <div className='content'>
                            {collection_name}
                        </div>
                    </div>
            )
        });

        return (
            <div className={S.aside}>

                <div className="introduce">
                    <div className="title">
                        个人介绍
                        {
                            isMe? (
                                    <div
                                            className='ui button tiny basic right floated'
                                            onClick={editMe}
                                    >
                                        <i className='icon write'></i>
                                        编辑
                                    </div>
                            ) : null
                        }
                        <div className="ui divider hidden"></div>

                        {inEdit ? (
                                <from action=''
                                      className='ui from'
                                >
                                    <div className='field'>
                                        <textarea
                                                value={editVal}
                                                onChange={editContent}
                                        ></textarea>
                                    </div>
                                    <button className='ui positive button'
                                            type='submit'
                                            onClick={editDone}
                                    >提交</button>
                                    <button className='ui negative button'
                                            type='submit'
                                            onClick={cancelEdit}
                                    >取消</button>
                                </from>
                        ) : (
                                <p>{userInfo.user_intro}</p>
                        )}



                    </div>
                </div>

                <div className="ui divider hidden"></div>

                <div className={S.volume}>
                    <div className={S.title}>
                        我的文集
                    </div>
                    <div className="ui list">
                        {notebooks}
                    </div>
                </div>

            </div>
        );
    }
}

Aside.propTypes=propTypes;