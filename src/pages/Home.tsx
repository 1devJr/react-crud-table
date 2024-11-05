import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import { Link } from "@tanstack/react-router";

export const Home = (): FunctionComponent => {
	const { t, i18n } = useTranslation();

	const onTranslateButtonClick = async (): Promise<void> => {
		if (i18n.resolvedLanguage === "en") {
			await i18n.changeLanguage("es");
		} else {
			await i18n.changeLanguage("en");
		}
	};

	return (
		<div className="bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center">
			<button type="submit" onClick={onTranslateButtonClick}>
				translate
			</button>
			<p className="text-white text-6xl">{t("home.greeting")}</p>
			<Link to="/table">{t("home.table")}</Link>
		</div>
	);
};
