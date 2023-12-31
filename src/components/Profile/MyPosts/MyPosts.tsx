import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {requiredField, requiredFieldLength} from "../../../utils/validators/validators";
import TextArea from "../../common/FormsControls/FormsControls";
import {postType} from "../../../types/types";
//88 pureComponent

type MyPostsType = {
    posts: Array<postType>
    addPost: (str: string) => void
}

const MyPosts = React.memo((props: MyPostsType) => {
    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);
    let onSubmit = (value: any) => {
        props.addPost(value.addPost);
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddPostReduxForm onSubmit={onSubmit}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

export default MyPosts;
const letVal = requiredFieldLength(30)


export const AddPostForm: React.FC<InjectedFormProps<FormDataType, loginOwnProps> & loginOwnProps> = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field
                        placeholder={"post Message"}
                        name={"addPost"}
                        component={TextArea}
                        validate={[requiredField, letVal]}
                    >
                    </Field>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
        </>)
}
type FormDataType = {
    addPost: string
}
type loginOwnProps = {}
export const AddPostReduxForm = reduxForm<FormDataType, loginOwnProps>({
    form: 'postForm'
})(AddPostForm)
