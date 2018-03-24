// Lib imports
import React, { Component } from 'react';
import { Actions, ActionConst, Scene, Router } from 'react-native-router-flux';
import { Platform, StyleSheet, Text, View } from 'react-native';
import LeftMenu from './src/common/LeftMenu';
import NavBar from './src/common/NavBar';
import BrowseView from './src/BrowseView';
import LandingView from './src/LandingView';
import SettingsView from './src/SettingsView';


const scenes = Actions.create(
    <Scene key="root" tabTitle="root">
        <Scene key="main" component={LeftMenu} open={false} type={ActionConst.REPLACE}>
            <Scene key="mainNavbar" navBar={NavBar} drawerImage={require('./src/resources/hamburger.png')} >
                <Scene key="landing" component={LandingView} title="Hack Ton Podcast" initial />
                <Scene key="browse" component={BrowseView} title="Parcourir" type={ActionConst.REPLACE} />
                <Scene key="settings" component={SettingsView} title="Réglages" type={ActionConst.REPLACE} />
            </Scene>
        </Scene>
    </Scene>
);


export default class App extends Component {
    render() {
        return (
            <Router
                scenes={scenes}
                navigationBarStyle={styles.navBar}
                barButtonIconStyle={styles.navBarButton}
                titleStyle={styles.navBarTitle} />
        );
    }
}

// Styles

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#CC5225',
    },
    navBarButton: {
        tintColor: '#FFFFFF'
    },
    navBarTitle: {
        color: '#FFFFFF',
        fontWeight: '100'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
