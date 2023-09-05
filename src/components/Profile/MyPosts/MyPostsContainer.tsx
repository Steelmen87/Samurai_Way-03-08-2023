import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {postType} from "../../../types/types";
import {AppStateType} from "../../../redux/redux-store";

type mapStateToPropsType = {
    posts: Array<postType>
}
type mapDispatchToPropsType = {
    addPost: (value: string) => void
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {addPost: addPostActionCreator})(MyPosts);

export default MyPostsContainer;