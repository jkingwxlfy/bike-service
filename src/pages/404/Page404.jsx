import { NavLink } from "react-router-dom";

import { MyButton } from "../../components/UI";

import "./page404.sass";

const Page404 = () => {
	return (
		<section className="page-404">
			<div className="page-404_container">
				<h1>Страница не найдена</h1>
				<NavLink to="/">
					<MyButton>Вернуться на главную</MyButton>
				</NavLink>
			</div>
		</section>
	);
};

export default Page404;
