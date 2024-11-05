import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, type createRouter } from "@tanstack/react-router";
import type { FunctionComponent } from "./common/types";

import { ThemeProvider } from "@/components/theme-provider"
import { TableProvider } from "./context/contextTable";
// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

const queryClient = new QueryClient();

type AppProps = { router: ReturnType<typeof createRouter> };

const App = ({ router }: AppProps): FunctionComponent => {
	return (
		<TableProvider>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					{/* <TanStackRouterDevelopmentTools
					router={router}
					initialIsOpen={false}
					position="bottom-right"
					/> */}
					{/* <ReactQueryDevtools initialIsOpen={false} /> */}
					{/* <Outlet /> */}
				</QueryClientProvider>
			</ThemeProvider>
		</TableProvider>
	);
};

export default App;
