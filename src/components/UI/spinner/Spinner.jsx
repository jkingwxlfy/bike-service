const Spinner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: '50px auto', background: 'none', display: 'block', shapeRendering: "auto", width: "300px", height: "300px"}} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="translate(82,50)">
                <g transform="rotate(0)">
                    <circle cx="0" cy="0" r="6" fill="#f948b0" fillOpacity="1">
                        <animateTransform attributeName="transform" type="scale" begin="-0.875s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.875s"></animate>
                    </circle>
                </g>
            </g><g transform="translate(72.62741699796952,72.62741699796952)">
            <g transform="rotate(45)">
                <circle cx="0" cy="0" r="6" fill="#f948b0" fillOpacity="0.875">
                    <animateTransform attributeName="transform" type="scale" begin="-0.75s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                    <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.75s"></animate>
                </circle>
            </g>
            </g><g transform="translate(50,82)">
                <g transform="rotate(90)">
                    <circle cx="0" cy="0" r="6" fill="#f948b0" fillOpacity="0.75">
                        <animateTransform attributeName="transform" type="scale" begin="-0.625s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.625s"></animate>
                    </circle>
                </g>
            </g><g transform="translate(27.37258300203048,72.62741699796952)">
                <g transform="rotate(135)">
                    <circle cx="0" cy="0" r="6" fill="#f948b0" fillOpacity="0.625">
                        <animateTransform attributeName="transform" type="scale" begin="-0.5s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.5s"></animate>
                    </circle>
                </g>
            </g><g transform="translate(18,50.00000000000001)">
                <g transform="rotate(180)">
                    <circle cx="0" cy="0" r="6" fill="#f948b0" fillOpacity="0.5">
                        <animateTransform attributeName="transform" type="scale" begin="-0.375s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.375s"></animate>
                    </circle>
                </g>
            </g><g transform="translate(27.372583002030474,27.37258300203048)">
                <g transform="rotate(225)">
                    <circle cx="0" cy="0" r="6" fill="#f948b0" fillOpacity="0.375">
                        <animateTransform attributeName="transform" type="scale" begin="-0.25s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.25s"></animate>
                    </circle>
                </g>
            </g><g transform="translate(49.99999999999999,18)">
                <g transform="rotate(270)">
                    <circle cx="0" cy="0" r="6" fill="#f948b0" fillOpacity="0.25">
                        <animateTransform attributeName="transform" type="scale" begin="-0.125s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.125s"></animate>
                    </circle>
                </g>
            </g><g transform="translate(72.62741699796952,27.372583002030474)">
                <g transform="rotate(315)">
                    <circle cx="0" cy="0" r="6" fill="#f948b0" fillOpacity="0.125">
                        <animateTransform attributeName="transform" type="scale" begin="0s" values="1.5 1.5;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
                        <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="0s"></animate>
                    </circle>
                </g>
            </g>
      </svg>
    )
}

export default Spinner;