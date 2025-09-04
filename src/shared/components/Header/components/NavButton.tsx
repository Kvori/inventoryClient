import { clearUser } from "@/features/user/userSlice"
import { useAppSelector, useAppDispatch } from "@/app/hooks/redux"
import { Link } from "react-router-dom"
import ReactionButton from "../../ReactionButton/ReactionButton"
import routesConfig from "@/app/config/routesConfig"

function NavButton() {
    const { isAuth, user } = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const onLogout = () => {
        localStorage.removeItem('token')
        dispatch(clearUser())
    }
    return (
        <>
            {isAuth && user ?
                <>
                    <span style={{ marginRight: 10 }}>
                        Signed in as: <Link to={routesConfig.user.getProfile(String(user.id))}>{user.name}</Link>
                    </span>
                    <ReactionButton onClick={onLogout}>Logout</ReactionButton>
                </>
                :
                <ReactionButton as={Link} to={routesConfig.auth.login}>
                    Login
                </ReactionButton>
            }
        </>
    );
}

export default NavButton