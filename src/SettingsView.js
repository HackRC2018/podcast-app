import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});


class SettingsView extends Component {
    constructor(props) {
        super(props);
        this.clearData = this.clearData.bind(this);
    }
    clearData() {
        fetch(URL.usersTags, {
            method: 'DELETE'
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Button title="Remise a zéro des préferences" onPress={this.clearData} />
            </View>
        );
    }
}

export default SettingsView;
