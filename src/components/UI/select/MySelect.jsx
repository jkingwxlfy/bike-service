import './myselect.sass';

const MySelect = ({selectOptions, defaultValue, ...props}) => {

    return (
        <div className="my-select">
            <select {...props}>
                <option hidden>{defaultValue}</option>
                {selectOptions.map(option =>
                    <option
                        key={option.name}
                        value={option.value}
                        selected={defaultValue === option.value}
                    >
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    )
}

export default MySelect;