import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {requiredField, requiredFieldLength} from "../../../utils/validators/validators";
import TextArea from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo((props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);
    let onSubmit = (value) => {
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
export const AddPostForm = (props) => {
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
export const AddPostReduxForm = reduxForm({
    form: 'postForm'
})(AddPostForm)
