import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
    },
    image: {
        flex: 1,
        marginTop: 60
    },
    news: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 0
    },
    title: {
        fontSize: 20,
        fontWeight: '800'
    },
    date: {
        fontSize: 14,
        marginBottom: 10
    },
    body: {
        fontSize: 16,
        textAlign: 'justify'
    }
});


class LandingView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image source={require('./resources/team.jpg')} />
                </View>
                <View style={styles.news}>
                    <Text style={styles.title}>
                        "Hack Ton Podcast" gagne le hackathon de Radio Canada 2018
                    </Text>
                    <Text style={styles.date}>
                        Le 25 Mars 2018 - 19h45
                    </Text>
                    <Text style={styles.body}>
                        Le week-end dernier avait lieu le second marathon de programmation de Radio-Canada (hackathon). Organisé par le Service des médias numériques, il visait à élaborer une solution innovante qui permettrait de mieux exploiter les données et l'environnement numérique du radiodiffuseur public.
                    </Text>
                </View>
            </View>
        );
    }
}

export default LandingView;
