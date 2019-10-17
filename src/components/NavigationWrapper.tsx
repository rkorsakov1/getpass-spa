import { AppBar, Button, CssBaseline, Divider, Drawer, Grid, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Clear, Menu } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import LanguagePicker from './LanguagePicker';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { GithubCircle } from 'mdi-material-ui';

const styles = (theme: Theme): Record<"menuButton" | "drawer" | "content" | "repository", CSSProperties | (() => CSSProperties)> => createStyles({
	menuButton: {
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	drawer: {
		width: '100%',
	},
	content: {
		[theme.breakpoints.down('xs')]: {
			marginTop: '60px',
		},
		flexGrow: 1,
		padding: 10,
	},
	repository: {
		margin: "0px 8px 0px 32px",
		color: "black"
	}
});

interface NavigationProps extends WithStyles<typeof styles>, RouteComponentProps {
	children: JSX.Element;
	rtl?: boolean;
}

const NavigationWrapper: React.FC<NavigationProps> =
	({ children, classes, history, rtl }): JSX.Element => {
		const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
		const { t, i18n } = useTranslation();

		const handleDrawerToggle = (): void => {
			setMobileOpen(!mobileOpen);
		};

		const handleNavigation = (destination: string, handleChange: boolean): void => {
			if (handleChange) {
				handleDrawerToggle();
			}
			const { language } = i18n;
			history.push(`/${language}${destination}`);
		};

		const RepositoryButton = (): JSX.Element => (
			<IconButton
				className={classes.repository}
				onClick={(): Window | null => window.open("https://github.com/stellarbear/getpass", '_blank')} >
				<GithubCircle />
			</IconButton>
		)
		const LanguageButton = (): JSX.Element => <LanguagePicker inverted={true} />

		const RepositoryAndLanguageButton = (): JSX.Element => (
			<div>
				{RepositoryButton()}
				{LanguageButton()}
			</div>
		)

		const renderNavigationList = (handleChange: boolean): JSX.Element => (
			<React.Fragment>
				<Button onClick={(): void => handleNavigation('/faq', handleChange)}>{t('navigation.qa')}</Button>
				<Button onClick={(): void => handleNavigation('/pro', handleChange)}>{t('navigation.generate')}</Button>
				<Button onClick={(): void => handleNavigation('/lite', handleChange)}>{t('navigation.random')}</Button>
				<Button onClick={(): void => handleNavigation('/download', handleChange)}>{t('navigation.download')}</Button>
				<Button disabled onClick={(): void => handleNavigation('/', handleChange)}>{t('navigation.about')}</Button>

				{!handleChange ? RepositoryAndLanguageButton() : <></>}
			</React.Fragment>
		);

		const renderDrawer = (): JSX.Element => (
			<Drawer
				variant="temporary"
				anchor={rtl ? 'right' : 'left'}
				open={mobileOpen}
				onClose={handleDrawerToggle}
				classes={{
					paper: classes.drawer,
				}}
			>
				<Grid
					direction="column"
					justify="flex-start"
					alignItems="stretch"
					container>
					<Grid
						container
						direction="row"
						justify="flex-start"
						alignItems="center">
						<IconButton onClick={handleDrawerToggle} style={{ margin: '8px' }}>
							<Clear />
						</IconButton>
					</Grid>
					<Divider />
					{renderNavigationList(true)}
				</Grid>
			</Drawer>

		);

		const MenuButton = (): JSX.Element => <IconButton
			color="inherit"
			aria-label="Open drawer"
			onClick={handleDrawerToggle}
			className={classes.menuButton}
		>
			<Menu />
		</IconButton>;

		const LeftButton = (): JSX.Element => {
			return (rtl) ? RepositoryAndLanguageButton() : MenuButton();
		};

		const RightButton = (): JSX.Element => {
			return (rtl) ? MenuButton() : RepositoryAndLanguageButton();
		};

		const renderMobileAppBar = (): JSX.Element => {
			return (
				<AppBar position="fixed">
					<Toolbar>
						<Grid
							container
							direction="row"
							justify="space-between"
							alignItems="center"
						>
							{LeftButton()}
							<Typography variant="h6" color="inherit" noWrap>
								{t('navigation.title')}
							</Typography>
							{RightButton()}
						</Grid>
					</Toolbar>
				</AppBar>);
		};

		const renderDesktopAppBar = (): JSX.Element => (
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				style={{ margin: 8 }}
			>
				{renderNavigationList(false)}
			</Grid>
		);

		return (
			<React.Fragment>
				<CssBaseline />
				<Hidden smUp implementation="css">
					{renderMobileAppBar()}
				</Hidden>
				<Hidden smUp implementation="css">
					{renderDrawer()}
				</Hidden>
				<main className={classes.content}>
					<Hidden xsDown implementation="css">
						{renderDesktopAppBar()}
					</Hidden>
					{children}
				</main>
			</React.Fragment>
		);
	}

NavigationWrapper.defaultProps = {
	rtl: false
}

export default
withStyles(styles)(
	withRouter(NavigationWrapper));
