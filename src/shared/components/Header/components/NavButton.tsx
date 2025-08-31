import { clearUser } from "@/features/user/model/userSlice"
import { useLogoutMutation } from "@/features/user/userApi"
import { useAppSelector, useAppDispatch } from "@/shared/hooks/redux"
import { Link, useNavigate } from "react-router-dom"
import ReactionButton from "../../ReactionButton/ReactionButton"
import { memo } from "react"
import routesConfig from "@/app/config/routesConfig"

function NavButton() {
    const { isAuth, user } = useAppSelector(state => state.userReducer)
    const [logout] = useLogoutMutation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        logout()
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

const MemoNavButton = memo(NavButton)

export default MemoNavButton