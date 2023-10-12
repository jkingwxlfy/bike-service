import {useDispatch} from "react-redux";
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import {headerSetRegisterForm, headerSignIn} from "../header/headerSlice";
import {useHttp} from "../../hooks/http.hook";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {MyButton, MyInput} from '../UI';

import './authform.sass';

const AuthForm = () => {

    const [error, setError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {request} = useHttp();

    const onOpenRegisterForm = (event) => {
        event.preventDefault();

        dispatch(headerSetRegisterForm(true));
    }

    return (
        <Formik
            initialValues={{ email: "", password: ""}}
            validationSchema={Yup.object({
                email: Yup.string().required("* Обязательное поле"),
                password: Yup.string().required("* Обязательное поле"),
            })}
            onSubmit={(values) => {
                request("https://sf-final-project-be.herokuapp.com/api/auth/sign_in", "POST", JSON.stringify(values))
                    .then(data => {
                        console.log(data);
                        dispatch(headerSignIn(data.data));
                        navigate("/");
                    })
                    .catch(error => {
                        console.log(error);
                        setError(true);
                    })
            }}
        >
            <Form className="auth-form">
                <h2>Вход</h2>
                <div className="auth-form_wrapper">
                    <div className="auth-form_item">
                        <div className="auth-form_field">E-mail</div>
                        <Field name="email">
                            {({ field, meta }) => (
                                <>
                                    <MyInput {...field} placeholder="Введите почту"/>
                                    {meta.touched && meta.error && <div className="form_error">{meta.error}</div>}
                                </>
                            )}
                        </Field>
                    </div>
                    <div className="auth-form_item">
                        <div className="auth-form_field">Пароль</div>
                        <Field name="password">
                            {({ field, meta }) => (
                                <>
                                    <MyInput {...field} placeholder="Введите пароль"/>
                                    {meta.touched && meta.error && <div className="form_error">{meta.error}</div>}
                                </>
                            )}
                        </Field>
                    </div>
                    <br/>
                    {error ? <div className="auth-form_error">Ошибка авторизации</div> : null}
                    <MyButton type="submit">Войти</MyButton>
                    <br/>
                    <MyButton onClick={onOpenRegisterForm}>Зарегестрироваться</MyButton>
                </div>
            </Form>
        </Formik>
    )
}

export default AuthForm;