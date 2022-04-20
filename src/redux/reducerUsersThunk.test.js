import usersApi, { ResultCodeEnum } from "../components/api/api"
import { actions, follow } from "./reducerUsers"
jest.mock("../components/api/api")
const userApiMock = usersApi
const result = {
    resultCode: ResultCodeEnum.Succses,
    message: [],
    data: {}
}
userApiMock.getFollow.mockReturnValue(Promise.resolve(result))
const dispatchkMock  = jest.fn()
beforeEach(()=>{
    dispatchkMock.mockClear()
    userApiMock.getFollow.mockClear()
})
test("success follow thunk", async () => {
    const thunk = follow(1)
    await thunk(dispatchkMock)
    expect(dispatchkMock).toBeCalledTimes(3)
    expect(dispatchkMock).toHaveBeenNthCalledWith(1, actions.followingProcces(true, 1))
    expect(dispatchkMock).toHaveBeenNthCalledWith(2, actions.followAccess(1))
    expect(dispatchkMock).toHaveBeenNthCalledWith(3, actions.followingProcces(false, 1))
})
