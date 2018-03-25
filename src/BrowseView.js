// Lib imports
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ListView, TouchableOpacity } from 'react-native';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import { Actions } from 'react-native-router-flux';

// App imports
import URL from './common/URL';


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    headerChange: {
        width: 380,
        height: 30,
        justifyContent: 'center',
        backgroundColor: 'orange'
    },
    headerChangeText: {
        color: '#FFFFFF',
        textAlign: 'center'
    }
});
const stylesRow = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        width: 350
    },
    textContainer: {
        padding: 10
    },
    title: {
        fontSize: 16
    },
    published: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    summary: {
        marginLeft: 12,
        fontSize: 12
    },
    photo: {
        height: 75,
        width: 75
    }
});

class Row extends Component {
    render() {
        var imageUrl = this.props.data.image_url && this.props.data.image_url !== '' ? {uri: this.props.data.image_url} : require('./resources/default_image.png');
        var title = this.props.data.title && this.props.data.title.replace(/<\/?[^>]+>/ig, " ");
        title = title && title.replace(/&nbsp;/ig, " ");
        return (
            <View style={stylesRow.container}>
                <Image source={imageUrl} style={stylesRow.photo} />
                <View style={stylesRow.textContainer}>
                    <View>
                        <Text style={stylesRow.title} numberOfLines={1}>{title}</Text>
                    </View>
                    <View>
                        <Text style={stylesRow.published}>{moment(this.props.data.published).format('MMMM Do YYYY, h:mm')}</Text>
                    </View>
                    {/*
                    <View>
                        <HTMLView value={this.props.data.summary} />
                    </View>
                    */}
                </View>
            </View>
        );
    }
}

class HeaderChangeTags extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }
    onChange() {
        fetch(URL.usersTags, {
            method: 'DELETE'
        }).catch(() => {
            Actions.firstPreferences();
        });
    }
    render() {
        return (
            <TouchableOpacity onPress={this.onChange}>
                <View style={styles.headerChange}>
                    <Text style={styles.headerChangeText}>Peaufiner mes thèmatiques</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

class BrowseView extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 2', 'row 2', 'row 2', 'row 2']),
        };
    }
    componentDidMount() {
        fetch(URL.podcasts, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            response.json().then((response) => {
                console.log(response);
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({dataSource: ds.cloneWithRows(response.podcasts)});
            })
        }).catch((error) => {
            console.log(error);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <HeaderChangeTags />
                <ListView dataSource={this.state.dataSource} renderRow={(data) => <Row data={data} />} />
            </View>
        );
    }
}

export default BrowseView;
