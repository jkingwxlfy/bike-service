import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { MyButton, MyCheckBox, MyInput } from "../UI";
import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { headerSetStaffForm, headerSetModal } from "../header/headerSlice";
import { useDispatch } from "react-redux";
import { createEmployee } from "../staffList/staffListSlice";

import "./staffform.sass";

const StaffForm = () => {
    const [name, setName] = useState({
        firstName: "",
        lastName: "",
        approved: false,
    });
    const [error, setError] = useState(false);

    const { request } = useHttp();

    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email("* Неправильный формат почты")
                    .required("* Обязательное поле"),
                password: Yup.string().required("* Обязательное поле"),
            })}
            onSubmit={(values) => {
                request(
                    "https://sf-final-project-be.herokuapp.com/api/officers",
                    "POST",
                    JSON.stringify({ ...values, ...name })
                )
                    .then((data) => {
                        dispatch(createEmployee(data.data));
                        setError(false);
                        dispatch(headerSetModal(false));
                        dispatch(headerSetStaffForm(false));
                    })
                    .catch((error) => {
                        console.log(error);
                        setError(true);
                    });
            }}
        >
            <Form className="staff-form">
                <h2>Создать сотрудника</h2>
                <div className="staff-form_item">
                    <div className="staff-form_field">E-mail</div>
                    <Field name="email">
                        {({ field, meta }) => (
                            <>
                                <MyInput
                                    {...field}
                                    placeholder="Введите почту"
                                />
                                {meta.touched && meta.error && (
                                    <div className="form_error">
                                        {meta.error}
                                    </div>
                                )}
                            </>
                        )}
                    </Field>
                </div>
                <div className="staff-form_item">
                    <div className="staff-form_field">Пароль</div>
                    <Field name="password">
                        {({ field, meta }) => (
                            <>
                                <MyInput
                                    {...field}
                                    placeholder="Введите пароль"
                                />
                                {meta.touched && meta.error && (
                                    <div className="form_error">
                                        {meta.error}
                                    </div>
                                )}
                            </>
                        )}
                    </Field>
                </div>
                <div className="staff-form_item">
                    <div className="staff-form_field">Имя</div>
                    <MyInput
                        value={name.firstName}
                        onChange={(event) =>
                            setName({ ...name, firstName: event.target.value })
                        }
                        placeholder="Введите имя"
                    />
                </div>
                <div className="staff-form_item">
                    <div className="staff-form_field">Фамилия</div>
                    <MyInput
                        value={name.lastName}
                        onChange={(event) =>
                            setName({ ...name, lastName: event.target.value })
                        }
                        placeholder="Введите фамилию"
                    />
                </div>
                <MyCheckBox
                    value={name.approved}
                    onClick={(event) =>
                        setName({ ...name, approved: event.target.checked })
                    }
                    placeholder={
                        <div className="staff-form_checkbox">
                            Одобренный сотрудник
                        </div>
                    }
                />
                {error ? (
                    <div className="staff-form_error">
                        Ошибка добавления, проверьте правильность введённых
                        данных
                    </div>
                ) : null}
                <MyButton type="submit">Создать</MyButton>
            </Form>
        </Formik>
    );
};

export default StaffForm;
