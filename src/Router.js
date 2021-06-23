import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import Spinner from "./components/spinner/Loading-spinner";
import { ContextLayout } from "./utility/Layout";
import { Redirect } from "react-router-dom";

// Route-based code splitting
// main
const Dashboard = lazy(() => import("./views/dashboard/Dashboard"));
const Dropzone = lazy(() => import("./views/Invoice/dropzone"));
const MyDocs = lazy(() => import("./views/MyDocs"));
const faq = lazy(() => import("./views/faq/FAQ"));
const accountSettings = lazy(() =>
	import("./views/account-settings/AccountSettings")
);
// auth-related
const sso = lazy(() => import("./views/SSO"));
const verify = lazy(() => import("./views/Verify"));
// misc
const error404 = lazy(() => import("./views/misc/error/404"));
const error500 = lazy(() => import("./views/misc/error/500"));
const authorized = lazy(() => import("./views/misc/NotAuthorized"));

class AppRouter extends React.Component {
	render() {
		// Set Layout and Component Using App Route
		const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
			<Route
				{...rest}
				render={(props) => {
					return (
						// using Context API
						<ContextLayout.Consumer>
							{(context) => {
								let LayoutTag =
									fullLayout === true
										? context.fullLayout
										: context.VerticalLayout;

								return (
									<>
										<LayoutTag {...props}>
											<Suspense fallback={<Spinner />}>
												<Component {...props} />
												{/* checking for tokens */}
												{!localStorage.getItem(
													"access_token"
												) &&
													!localStorage.getItem(
														"refresh_token"
													) && <Redirect to="/sso" />}
											</Suspense>
										</LayoutTag>
									</>
								);
							}}
						</ContextLayout.Consumer>
					);
				}}
			/>
		);

		return (
			// Set the directory path if you are deploying in sub-folder
			<>
				<Router history={history}>
					<Switch>
						<RouteConfig exact path="/" component={Dashboard} />
						<RouteConfig path="/uploads" component={Dropzone} />
						<RouteConfig path="/my-docs" component={MyDocs} />
						<RouteConfig path="/faq" component={faq} />
						<RouteConfig
							path="/account-settings"
							component={accountSettings}
						/>
						<RouteConfig path="/sso" component={sso} fullLayout />
						<RouteConfig
							path="/verify"
							component={verify}
							// render={<SSO />}
						/>
						<RouteConfig path="/error/404" component={error404} />
						<RouteConfig
							path="/error/500"
							component={error500}
							fullLayout
						/>
						<RouteConfig
							path="/not-authorized"
							component={authorized}
							fullLayout
						/>
						<RouteConfig component={error404} fullLayout />
					</Switch>
				</Router>
			</>
		);
	}
}

export default AppRouter;
