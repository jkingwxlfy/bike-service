import {useState} from "react";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {useHttp} from "../../hooks/http.hook";
import {useDispatch} from "react-redux";
import {headerSetRegisterForm} from "../header/headerSlice";

import {MyButton, MyInput} from "../UI";

import './registerform.sass';

const RegisterForm = () => {

    const dispatch = useDispatch();
    const {request} = useHttp();

    const [error, setError] = useState(false);
    const [name, setName] = useState({firstName: "", lastName: ""});

    return (
        <Formik
            initialValues={{email: "", password: "", clientId: ""}}
            validationSchema={Yup.object({
                email: Yup.string().required("* Обязательное поле").email("* Неправильный формат почты"),
                password: Yup.string().required("* Обязательное поле"),
                clientId: Yup.string().required("* Обязательное поле")
            })}
            onSubmit={(values) => {
                request("https://sf-final-project-be.herokuapp.com/api/auth/sign_up", "POST", JSON.stringify({...values, ...name}))
                    .then((data) => {
                        dispatch(headerSetRegisterForm(false));
                    })
                    .catch(error => {
                        console.log(error);
                        setError(error);
                    })
            }}
        >
            <Form className="register-form">
                <h2>Регистрация</h2>
                <div className="register-form_wrapper">
                    <div className="register-form_email">
                        <div className="register-form_field">E-mail</div>
                        <Field name="email">
                            {({ field, meta }) => (
                                <>
                                    <MyInput {...field} placeholder="Введите почту"/>
                                    {meta.touched && meta.error && <div className="form_error">{meta.error}</div>}
                                </>
                            )}
                        </Field>
                    </div>
                    <div className="register-form_password">
                        <div className="register-form_field">Пароль</div>
                        <Field name="password">
                            {({ field, meta }) => (
                                <>
                                    <MyInput {...field} placeholder="Введите пароль"/>
                                    {meta.touched && meta.error && <div className="form_error">{meta.error}</div>}
                                </>
                            )}
                        </Field>
                    </div>
                    <div className="register-form_id">
                        <div className="register-form_field">ClientID</div>
                        <Field name="clientId">
                            {({ field, meta }) => (
                                <>
                                    <MyInput {...field} placeholder="Введите айди клиента"/>
                                    {meta.touched && meta.error && <div className="form_error">{meta.error}</div>}
                                </>
                            )}
                        </Field>
                    </div>
                    <div className="register-form_item">
                        <div className="register-form_field">Имя</div>
                        <MyInput
                            value={name.firstName}
                            onChange={(event) => setName({...name, firstName: event.target.value})}
                            placeholder="Введите имя"
                        />
                    </div>
                    <div className="register-form_item">
                        <div className="register-form_field">Фамилия</div>
                        <MyInput
                            value={name.lastName}
                            onChange={(event) => setName({...name, lastName: event.target.value})}
                            placeholder="Введите фамилию"
                        />
                    </div>
                </div>
                {error ? <div className="register-form_error">Ошибка регистрации, проверьте правильность введённых данных</div> : null}
                <MyButton type="submit">Зарегестрироваться</MyButton>
            </Form>
        </Formik>
    );
};

export default RegisterForm;