// Lib imports
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animated, Text, View, Button, StyleSheet } from 'react-native';
import { NavBar } from 'react-native-router-flux';


class AppNavBar extends NavBar {
    static contextTypes = {
        drawer: PropTypes.object
    };
    _renderLeftButton() {
        return (
            <TouchableOpacity onPress={this.context.drawer.open}>
                <Text>Default</Text>
            </TouchableOpacity>
        );
    }
}

export default AppNavBar;
