'use strict';

var { width, height } = Dimensions.get('window');
import Separator from './Helpers/Separator';
import Badge from './Helpers/Badge';
import ChatPage from './ChatPage';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Image,
  TabBarIOS,
  ScrollView,
  ListView,
  AlertIOS,
  Dimensions
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#48BBEC',
  },
  wrapper: {
    flex: 1
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  label: {
    fontSize: 14
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  },
  plusButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#48BBEC',
    borderWidth: 1.5,
    width: width * .30,
    height: 30,
    borderRadius: 8,
    marginBottom: 10
  },
  buttonText: {
    color: '#48BBEC'
  },
  pluscontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  rowContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20,
    marginVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible',
    borderWidth: 2,
    borderColor: '#48BBEC',
    opacity: .97
  },
  listviewbox: {
    paddingHorizontal: 10
  }
});

var userData = {username: 'Timmert', email: 'timmer@time.com', pic_url: 'http://plan59.com/images/JPGs/sunshine_1954_fresh_00.jpg', location: 'San Francisco, CA' };
var groupsData = [
    {name: 'Group 1'},
    {name: 'Group 2'},
    {name: 'Group 3'},
    {name: 'Group 4'},
    {name: 'Group 5'}
  ];

class GroupsPage extends Component {
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    this.state = {
      dataSource: this.ds.cloneWithRows(groupsData)
    }
  }

  saveResponse(promptValue){
    // api call to create group with promptValue(the name is stored in prompt value)
    this.setState({ promptValue: promptValue })
    var group = this.state.promptValue
    console.log(group)
    groupsData.push({name: group})
    console.log(groupsData)
    this.setState({
      dataSource: this.ds.cloneWithRows(groupsData)
    })
  }

  addToGroup(groupName){
    AlertIOS.prompt('Add User Email', null, this.saveResponse.bind(this))
  };
  goToChat(groupName){
    this.props.navigator.push({
      component: ChatPage,
      title: groupName,
      passProps: {groupName: groupName, userData: userData},
      rightButtonIcon: require('./Common/Plus-button.png'),
      onRightButtonPress: this.addToGroup.bind(this, groupName)
    })
  };

  renderRow(rowData){
    console.log(this.state.promptValue);
    return (
      <View>
        <TouchableHighlight
        onPress={this.goToChat.bind(this, rowData.name)}
        underlayColor='#48BBEC'>
        <View style={styles.rowContainer}>
          <Image style={styles.groupImage} source={require('./Common/usergroup.png')} />
          <Text style={styles.name}>   {rowData.name} </Text>
        </View>
        </TouchableHighlight>
        <Separator />
      </View>
    )
  }

  render() {
    return(
      <ScrollView style={styles.container}>
        <Badge userData={userData} />
        <View
        style={styles.pluscontainer}>
          <TouchableHighlight
          style={styles.plusButton}
          onPress={() => AlertIOS.prompt('Enter Group name:', null, this.saveResponse.bind(this))}
          underlayColor='gray'>
            <Text style={styles.buttonText}>Create Group</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.listviewbox}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
          </View>
      </ScrollView>
    )
  }
};

module.exports = GroupsPage;
