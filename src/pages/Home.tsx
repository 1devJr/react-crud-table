import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import { Link } from "@tanstack/react-router";

export const Home = (): FunctionComponent => {
	const { t, i18n } = useTranslation();

	const onTranslateButtonClick = async (): Promise<void> => {
		const languages = ["en", "es", "br"]; // Array com os códigos de idioma
		const randomLanguage = languages[Math.floor(Math.random() * languages.length)]; // Escolha aleatória
		await i18n.changeLanguage(randomLanguage); 
	};

	return (
		<div className="bg-blue-300  font-bold w-screen h-screen flex flex-col justify-center items-center">
			<button type="submit" onClick={onTranslateButtonClick}>
				translate
			</button>
			<p className="text-white text-6xl p-5">{t("translations:home.greeting")}</p>
			<Link to="/table">{t("translations:home.table")}</Link>
		</div>
	);
};
