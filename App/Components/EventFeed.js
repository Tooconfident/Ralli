'use strict';
import React, { Component } from 'react';
import Separator from './Helpers/Separator'
import {
  StyleSheet,
  Text,
  ListView,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
    backgroundColor: '#6600ff',
    borderRadius: 8,
    paddingVertical: 20,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible',
    borderWidth: 2,
    borderColor: '#8c8c8c',
    borderTopColor: 'white',
    borderLeftColor: 'white',
    opacity: .97
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rowText: {
    color: 'white',
    overflow: 'visible',
  }
});

// all event objects a user has been invited to (array) MVP
var userEventsData = [{title: 'Party in hell', desc: 'The last pary you will ever go to'}, {title: 'A funeral', desc: 'Hope they had angel mail'}, {title: 'Drug Deal Gone Wrong', desc: 'Same old shit'}]

class EventFeed extends Component{
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(userEventsData),
      message: '',
      error: '',
      user: this.props.userData
    }
  }

  renderRow(rowData){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image source={require('./Common/small-icon.png')} />
          <Text style={styles.rowText}> {rowData.title}: {rowData.desc} </Text>
        </View>

      </View>
    )
  }
  render(){
    console.log(this.props);
    return (
      <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow} />
      </View>
    )
  }
};

module.exports = EventFeed;
