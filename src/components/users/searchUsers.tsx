import { useFormik } from "formik";
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getUsers} from "../../redux/reducerUsers";
type FormikValues = {
    search: string
}
type PropsType = {
    currentPage: number
    pageSize: number
    setCurrentPage: (defaultCurrentPage: number) => void
}
export const SearchUsers: React.FC<PropsType> = ({ currentPage, pageSize, setCurrentPage}) => {
    const dispatch = useDispatch()
    const [toggleOnlyFriends, setToggleOnlyFriends] = useState(false);
    let defaultCurrentPage = 1;
    useEffect(() => {
        dispatch(getUsers(formik.values.search, toggleOnlyFriends, currentPage, pageSize))
    }, [currentPage, pageSize])
    const formik = useFormik<FormikValues>({
        initialValues: {
            search: "",
        },
        onSubmit: (values, submitProps) => {
            dispatch(getUsers(values.search, toggleOnlyFriends, currentPage, pageSize))
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input name="search"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.search}
                    placeholder="search"></input>
            </div>
            <div>
                <input
                    name="onlyFriends"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    onClick={() => {
                        setToggleOnlyFriends(!toggleOnlyFriends)
                        setCurrentPage(defaultCurrentPage)
                        dispatch(getUsers(formik.values.search, !toggleOnlyFriends, defaultCurrentPage, pageSize))
                    }}
                    type={"checkbox"} /> show only friends
            </div>
            <div>
                <button type="submit">Search</button>
            </div>
        </form>
    );
}