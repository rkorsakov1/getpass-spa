import React, { useState } from 'react';
import { Divider, CssBaseline, AppBar, Drawer, Hidden, IconButton, Toolbar, Typography, Button, Grid } from '@material-ui/core';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Clear, Menu } from '@material-ui/icons';
import { navigation } from 'components/RouterWrapper';
import { at, I18n, useTranslation } from 'localization';
import LanguagePicker from 'components/LanguagePicker';

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
			marginTop: '40px',
		},
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
});

enum Direction { left = 0, right }

interface Props extends WithStyles<typeof styles> {
	children: JSX.Element,
	direction: Direction,
	classes: any,
}

const Navigation = withStyles(styles)(
	({ children, classes, direction }: Props) => {
		const [mobileOpen, setMobileOpen] = useState(false);
		const { t } = useTranslation();

		const handleDrawerToggle = () => {
			setMobileOpen(!mobileOpen);
		};

		const handleNavigation = (destination: string, handleChange: boolean) => {
			if (handleChange) {
				handleDrawerToggle();
			}
			navigation.push(destination);
		};

		const renderNavigationList = (handleChange: boolean) => (
			<React.Fragment>
				<Button onClick={() => handleNavigation('/qa', handleChange)}>{t(at(I18n.NavigationQA))}</Button>
				<Button onClick={() => handleNavigation('/generator', handleChange)}>{t(at(I18n.NavigationGenerator))}</Button>
				<Button onClick={() => handleNavigation('/random', handleChange)}>{t(at(I18n.NavigationRandom))}</Button>
				<Button onClick={() => handleNavigation('/download', handleChange)}>{t(at(I18n.NavigationDownload))}</Button>
				<Button disabled onClick={() => handleNavigation('/', handleChange)}>{t(at(I18n.NavigationAbout))}</Button>
				{!handleChange ? <LanguagePicker /> : <></>}
			</React.Fragment>
		);

		const renderDrawer = () => (
			<Drawer
				variant="temporary"
				anchor={direction === Direction.left ? 'left' : 'right'}
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
		</IconButton>

		const LeftButton = () => {
			return (direction === Direction.right) ? LanguageButton() : MenuButton()
		}

		const RightButton = () => {
			return (direction === Direction.right) ? MenuButton() : LanguageButton()
		}

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
							getpass!
					</Typography>
						{RightButton()}
					</Grid>
				</Toolbar>
			</AppBar>);
		}

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
);

export { Navigation, Direction };