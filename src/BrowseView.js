import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ListView } from 'react-native';
import moment from 'moment';


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 64,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});
const stylesRow = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        width: 360
    },
    title: {
        marginLeft: 12,
        fontSize: 16
    },
    published: {
        marginLeft: 12,
        fontSize: 12,
        fontWeight: 'bold'
    },
    summary: {
        marginLeft: 12,
        fontSize: 12,
    },
    photo: {
        height: 75,
        width: 75
    },
});

const Row = (props) => (
    <View style={stylesRow.container}>
        <Image source={{ uri: props.data.image}} style={stylesRow.photo} />
        <View>
            <View>
                <Text style={stylesRow.title} numberOfLines={1}>{props.data.title}</Text>
            </View>
            <View>
                <Text style={stylesRow.published}>{moment(props.data.published).format('MMMM Do YYYY, h:mm')}</Text>
            </View>
            <View>
                <Text style={stylesRow.summary}>{props.data.summary}</Text>
            </View>
        </View>
    </View>
);

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
                <ListView dataSource={this.state.dataSource} renderRow={(data) => <Row data={data} />} />
            </View>
        );
    }
}

export default BrowseView;
