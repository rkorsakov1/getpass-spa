import { AppBar, Button, CssBaseline, Divider, Drawer, Grid, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Clear, Menu } from '@material-ui/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import LanguagePicker from './LanguagePicker';
import { REPLCommand } from 'repl';
// import { LanguagePicker } from 'components/LanguagePicker';
// import { at, I18n, useTranslation, fallback } from 'localization';

const styles = (theme: Theme) => createStyles({
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
});

interface NavigationProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
	children: JSX.Element;
	classes: any;
	rtl?: boolean;
}

const NavigationWrapper: React.FC<NavigationProps> =
	({ children, classes, history, rtl }): JSX.Element => {
		const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
		const { t, i18n } = useTranslation();

		const handleDrawerToggle = () => {
			setMobileOpen(!mobileOpen);
		};

		const handleNavigation = (destination: string, handleChange: boolean) => {
			if (handleChange) {
				handleDrawerToggle();
			}
			const { language } = i18n;
			history.push(`/${language}${destination}`);
		};

		const renderNavigationList = (handleChange: boolean) => (
			<React.Fragment>
				<Button onClick={() => handleNavigation('/faq', handleChange)}>{t('navigation.qa')}</Button>
				<Button onClick={() => handleNavigation('/generator', handleChange)}>{t('navigation.generate')}</Button>
				<Button onClick={() => handleNavigation('/random', handleChange)}>{t('navigation.random')}</Button>
				<Button onClick={() => handleNavigation('/download', handleChange)}>{t('navigation.download')}</Button>
				<Button disabled onClick={() => handleNavigation('/', handleChange)}>{t('navigation.about')}</Button>
				{!handleChange ? <LanguagePicker /> : <></>}
			</React.Fragment>
		);

		const renderDrawer = () => (
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

		const LanguageButton = () => <LanguagePicker />

		const MenuButton = () => <IconButton
			color="inherit"
			aria-label="Open drawer"
			onClick={handleDrawerToggle}
			className={classes.menuButton}
		>
			<Menu />
		</IconButton>;

		const LeftButton = () => {
			return (rtl) ? LanguageButton() : MenuButton();
		};

		const RightButton = () => {
			return (rtl) ? MenuButton() : LanguageButton();
		};

		const renderMobileAppBar = () => {
			return (<AppBar position="fixed" className={classes.appBar}>
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

		const renderDesktopAppBar = () => (
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
