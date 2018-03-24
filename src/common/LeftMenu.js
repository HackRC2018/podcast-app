// Lib imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Image, Text, View, Button, StyleSheet } from 'react-native';
import Drawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        height: '100%'
    },
    header: {
        height: 64,
        backgroundColor: '#CC5225'
    },
    iconHeader: {
        marginTop: 25,
        marginLeft: 75,
        marginBottom: 40,
        width: 150,
        height: 30,
    },
    button: {
        padding: 5,
        paddingLeft: 15,
        width: '100%',
        alignItems: 'flex-start',
    },
    buttonSeparator: {
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        width: '100%',
        alignItems: 'flex-start',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#B0B0B0',
        borderBottomColor: '#B0B0B0',
        borderStyle: 'solid'
    },
});


class SideMenu extends Component {
    static contextTypes = {
        drawer: PropTypes.object
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.iconHeader} source={require('../resources/logo_rc_premiere.png')} />
                </View>
                <View style={styles.button}><Button color="#808080" style={styles.button} title="À la une" onPress={() => Actions.main()} /></View>
                <View style={styles.button}><Button color="#808080" style={styles.button} title="Parcourir" onPress={() => Actions.browse()} /></View>
                <View style={styles.button}><Button color="#808080" style={styles.button} title="Balados" onPress={() => Actions.main()} /></View>
                <View style={styles.button}><Button color="#808080" style={styles.button} title="Émissions" onPress={() => Actions.main()} /></View>
                <View style={styles.button}></View>
                <View style={styles.buttonSeparator}>
                    <Button color="#808080" style={styles.button} title="Réglages" onPress={() => {this.context.drawer.close(); Actions.settings()}} />
                </View>
            </View>
        );
    }
}

export default class NavigationDrawer extends Component {
    render() {
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                onOpen={()=>Actions.refresh({key: state.key, open: true})}
                onClose={()=>Actions.refresh({key: state.key, open: false})}
                type="displace"
                content={<SideMenu />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                tweenHandler={(ratio) => ( {main: {opacity:Math.max(0.54,1-ratio)}} )} >
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}
