// Lib imports
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

// App imports
import URL from './common/URL';


// Styles
const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        width: '100%',
        height: 100
    },
    headerText: {
        top: 38,
        fontSize: 30,
        fontWeight: '200',
        color: '#FFFFFF',
        textAlign: 'center'
    }
});


class BubbleButton extends Component {
    render() {
        var styleButton = {
            margin: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            width: this.props.size,
            height: this.props.size,
            borderRadius: this.props.size / 2
        };
        var styleText = {
            fontSize: 20,
            lineHeight: this.props.size,
            textAlign: 'center',
            color: '#FFFFFF'
        };
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={styleButton}>
                    <Text style={styleText}>{this.props.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

class FirstPreferencesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            tagSelected: 0
        };
        this.confirm = this.confirm.bind(this);
    }
    componentDidMount() {
        fetch(URL.tags, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            response.json().then((response) => {
                this.setState({tags: response.tags});
            })
        }).catch((error) => {
            console.log(error);
        });
    }
    confirm() {
        Actions.main();
        Actions.browse();
    }
    onPressTag(tag) {
        var tags = this.state.tags;
        var indexTag = tags.indexOf(tag);
        var data = {
            'tag': tag.label
        };
        fetch(URL.usersTags, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            tags.splice(indexTag, 1);
            this.setState({
                tags: tags,
                tagSelected: this.state.tagSelected + 1
            });
            if (this.state.tagSelected === 5) {
                this.confirm();
            }
        }).catch((error) => {
            // Error
        });
    }
    render() {
        var bubbles = this.state.tags.map((tag) => {
            var randomSize = Math.floor((Math.random() * 100) + 50);
            console.log(tag);
            return (
                <BubbleButton key={tag._id.$oid} name={tag.label} size={randomSize} onPress={this.onPressTag.bind(this, tag)} />
            );
        });
        return (
            <ImageBackground source={require('./resources/bgBubble.png')} style={styles.backgroundImage}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Pointe ce que tu aimes</Text>
                </View>
                <Text>
                    <Text>
                       {bubbles}
                    </Text>
                </Text>
            </ImageBackground>
        );
    }
}

export default FirstPreferencesView;
