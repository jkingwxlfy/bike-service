import { useState, useRef, useEffect } from "react";

import "./mytextarea.sass";

const MyTextArea = ({ callback, placeholder, ...props }) => {
    const myRef = useRef(null);
    const [areaValue, setAreaValue] = useState("");

    useEffect(() => {
        myRef.current.style.height = "auto";
        myRef.current.style.height = myRef.current.scrollHeight + "px";
    }, [areaValue]);

    const onEditArea = (event) => {
        setAreaValue(event.target.value);
        if (callback) {
            callback(event);
        }
    };

    return (
        <textarea
            {...props}
            className="my-textarea"
            placeholder={placeholder ? placeholder : "Расскажите подробнее"}
            onChange={(event) => onEditArea(event)}
            ref={myRef}
        ></textarea>
    );
};

export default MyTextArea;
