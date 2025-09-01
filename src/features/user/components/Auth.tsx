import { Card, Container, Form, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "../../../shared/components/FormField/FormField";
import ReactionButton from "../../../shared/components/ReactionButton/ReactionButton";
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import routes from "../../../app/config/routesConfig";
import { useEffect } from "react";
import { useLoginMutation, useRegisterMutation } from "../userApi";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { setUser } from "../userSlice";

const getSchema = (isLogin: boolean) =>
    z
        .object({
            email: z.email("Некорректный email"),
            password: z.string().min(1, "Пароль обязателен"),
            ...(isLogin
                ? {}
                : {
                    name: z.string().min(1, "Имя обязательно"),
                    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
                }),
        })
        .refine(
            (data) => isLogin || data.password === data.confirmPassword,
            {
                path: ["confirmPassword"],
                message: "Пароли не совпадают",
            }
        );

function Auth() {
    const location = useLocation()
    const isLogin = location.pathname === routes.auth.login
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user, isAuth } = useAppSelector(state => state.userReducer)

    useEffect(() => {
        if (isAuth && user) navigate(routes.user.getProfile(user.id))
    }, [user, isAuth])

    const schema = getSchema(isLogin)
    type FormProps = z.infer<typeof schema>

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormProps>({ resolver: zodResolver(schema) })

    const [loginUser, { data: loginData, isLoading: loginLoading, error: loginError, isSuccess: loginSuccess, status: loginStatus }] = useLoginMutation()
    const [registerUser, { data: registerData, isLoading: registerLoading, error: registerError, isSuccess: registerSuccess, status: registerStatus }] = useRegisterMutation()

    const mutation = isLogin ? loginUser : registerUser
    const mutationState = isLogin
        ? { data: loginData, loading: loginLoading, error: loginError, success: loginSuccess, status: loginStatus }
        : { data: registerData, loading: registerLoading, error: registerError, success: registerSuccess, status: registerStatus }

    const onSubmit: SubmitHandler<FormProps> = ({ name, email, password }) => {
        mutation({ name, email, password })
    }

    useEffect(() => {
        if (mutationState.data && mutationState.success) {
            localStorage.setItem('token', mutationState.data.token)
            dispatch(setUser(mutationState.data.user))
        }
    }, [mutationState.success])

    return (
        <Container className="d-flex justify-content-center">
            <Card style={{ maxWidth: 500 }} className="w-100 p-5">
                <h1 className="d-flex justify-content-center mb-5">Authorization</h1>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    {!isLogin && <FormField
                        className="mb-3"
                        name="Name"
                        errorMessage={errors.name?.message}
                    >
                        <Form.Control
                            {...register("name")}
                            type="text"
                            isInvalid={!!errors.name}
                        />
                    </FormField>}
                    <FormField
                        className="mb-3"
                        name="Email"
                        errorMessage={errors.email?.message}
                    >
                        <Form.Control
                            {...register("email")}
                            type="email"
                            isInvalid={!!errors.email}
                        />
                    </FormField>
                    <FormField
                        className="mb-3"
                        name="Password"
                        errorMessage={errors.password?.message}
                    >
                        <Form.Control
                            {...register("password")}
                            type="password"
                            isInvalid={!!errors.password}
                        />
                    </FormField>
                    {!isLogin && <FormField
                        className="mb-3"
                        name="Confirm password"
                        errorMessage={errors.confirmPassword?.message}
                    >
                        <Form.Control
                            {...register("confirmPassword")}
                            type="password"
                            isInvalid={!!errors.confirmPassword}
                        />
                    </FormField>}
                    <ReactionButton
                        className="w-100 mb-3"
                        type="submit"
                        isLoading={mutationState.loading}
                    >
                        {isLogin ? "Login" : "Register"}
                    </ReactionButton>
                    {mutationState.error &&
                        <div className="p-2">
                            <p className="text-danger text-center m-0">{mutationState.error.data?.message}</p>
                        </div>
                    }
                    {isLogin ? (
                        <div className="d-flex justify-content-center">
                            <div>Если у вас нет аккаунта,&nbsp;</div>
                            <Nav.Link
                                className="link-info"
                                as={Link}
                                to={routes.auth.registration}
                            >
                                зарегестрируйтесь
                            </Nav.Link>
                        </div>

                    ) : (
                        <div className="d-flex justify-content-center">
                            <div>Если у вас есть аккаунт,&nbsp;</div>
                            <Nav.Link className="link-info" as={Link} to={routes.auth.login}>
                                войдите
                            </Nav.Link>
                        </div>
                    )}
                </Form>
            </Card>
        </Container>
    );
}

export default Auth;