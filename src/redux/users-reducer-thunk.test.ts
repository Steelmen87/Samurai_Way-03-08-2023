import {follow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {ResponseType, ResultCodesEnum} from './../api/api'

jest.mock("../api/users-api");
const userApiMock = usersAPI;
const result: ResponseType = {
    messages: [],
    resultCode: ResultCodesEnum.Success,
    data: {},
    fieldsErrors: []
}
//@ts-ignore
userApiMock.follow.mockReturnValue(Promise.resolve(result))

test('user-reducer-thunk test 1', async () => {
    const thunk = follow(1)
    const dispatchMock = jest.fn()

    await thunk(dispatchMock)
    expect(dispatchMock).toBeCalledTimes(3)
})