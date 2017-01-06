
import React from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import Row from './Row';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingBottom: 20,
  },
});

class OnboardingListView extends React.Component {

  formatData(data) {
    // We're sorting by alphabetically so we need the alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    // Each section is going to represent a letter in the alphabet so we loop over the alphabet
    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
      // Get the character we're currently looking for
      const currentChar = alphabet[sectionId];

      // Get users whose first name starts with the current letter
      const users = data.filter((user) => user.name.toUpperCase().indexOf(currentChar) === 0);

      // If there are any users who have a first name starting with the current letter then we'll
      // add a new section otherwise we just skip over it
      if (users.length > 0) {
        // Add a section id to our array so the listview knows that we've got a new section
        sectionIds.push(sectionId);

        // Store any data we would want to display in the section header. In our case we want to show
        // the current character
        dataBlob[sectionId] = { character: currentChar };

        // Setup a new array that we can store the row ids for this section
        rowIds.push([]);

        // Loop over the valid users for this section
        for (let i = 0; i < users.length; i++) {
          // Create a unique row id for the data blob that the listview can use for reference
          const rowId = `${sectionId}:${i}`;

          // Push the row id to the row ids array. This is what listview will reference to pull
          // data from our data blob
          rowIds[rowIds.length - 1].push(rowId);

          // Store the data we care about for this row
          dataBlob[rowId] = users[i];
        }
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }
 
  constructor(props) {
    console.log('----')
    console.log(props)
    super(props);
    const demoData = data = [
    {
      "gender": "male",
      "name": 'menstyle',
      "location": {
        "street": "1446 oak lawn ave",
        "city": "lakewood",
        "state": "arizona",
        "postcode": 60649
      },
      "email": "aiden.lucas@example.com",
      "login": {
        "username": "smallostrich903",
        "password": "kristine",
        "salt": "r5u9JFIh",
        "md5": "0e2f37c4b8baafacd62562857e9ecda5",
        "sha1": "e39a1487902ecc6d54287080c26794504348a4de",
        "sha256": "96220812c203891d9e7fc287e5fa73275ac8159d277ea088b051e80ec43abc99"
      },
      "registered": 1056249168,
      "dob": 1216516975,
      "phone": "(661)-131-8187",
      "cell": "(408)-707-4720",
      "id": {
        "name": "SSN",
        "value": "294-55-5909"
      },
      "picture": {
        "active": "https://s-media-cache-ak0.pinimg.com/474x/ed/03/2f/ed032f21a1c2c510ae059a0eb2156513.jpg",
        "deactive": "https://s-media-cache-ak0.pinimg.com/474x/9b/e3/6b/9be36b11487fa9d0811afc7e17da4c18.jpg",
      },
      "nat": "US"
    },
    {
      "gender": "male",
      "name": 'classicstyle',
      "location": {
        "street": "1446 oak lawn ave",
        "city": "lakewood",
        "state": "arizona",
        "postcode": 60649
      },
      "email": "aiden.lucas@example.com",
      "login": {
        "username": "smallostrich903",
        "password": "kristine",
        "salt": "r5u9JFIh",
        "md5": "0e2f37c4b8baafacd62562857e9ecda5",
        "sha1": "e39a1487902ecc6d54287080c26794504348a4de",
        "sha256": "96220812c203891d9e7fc287e5fa73275ac8159d277ea088b051e80ec43abc99"
      },
      "registered": 1056249168,
      "dob": 1216516975,
      "phone": "(661)-131-8187",
      "cell": "(408)-707-4720",
      "id": {
        "name": "SSN",
        "value": "294-55-5909"
      },
      "picture": {
        "active": "https://s-media-cache-ak0.pinimg.com/474x/e9/8d/40/e98d404387ab32ebc793bbf4e2880f27.jpg",
        "deactive": "https://s-media-cache-ak0.pinimg.com/564x/eb/0a/e1/eb0ae16397d333218be99e5f49dea673.jpg",
      },
      "nat": "US"
    },
    {
      "gender": "male",
      "name": 'girlstyle',
      "location": {
        "street": "1446 oak lawn ave",
        "city": "lakewood",
        "state": "arizona",
        "postcode": 60649
      },
      "email": "aiden.lucas@example.com",
      "login": {
        "username": "smallostrich903",
        "password": "kristine",
        "salt": "r5u9JFIh",
        "md5": "0e2f37c4b8baafacd62562857e9ecda5",
        "sha1": "e39a1487902ecc6d54287080c26794504348a4de",
        "sha256": "96220812c203891d9e7fc287e5fa73275ac8159d277ea088b051e80ec43abc99"
      },
      "registered": 1056249168,
      "dob": 1216516975,
      "phone": "(661)-131-8187",
      "cell": "(408)-707-4720",
      "id": {
        "name": "SSN",
        "value": "294-55-5909"
      },
      "picture": {
        "active": "https://s-media-cache-ak0.pinimg.com/474x/3e/e0/f7/3ee0f76f7ed9ec124748abfb7cddc07c.jpg",
        "deactive": "https://s-media-cache-ak0.pinimg.com/474x/5f/f6/dd/5ff6ddd48f7d8aba8f6210acfdbca62b.jpg",
      },
      "nat": "US"
    },
    {
      "gender": "male",
      "name": 'sexystyle',
      "location": {
        "street": "8467 preston rd",
        "city": "allentown",
        "state": "maine",
        "postcode": 71108
      },
      "email": "mario.walters@example.com",
      "login": {
        "username": "tinyrabbit750",
        "password": "detroit",
        "salt": "KQ9v0DxF",
        "md5": "720e03bf546c0e0d52c19cfb395bcb7b",
        "sha1": "7e01f165e1da1bf643a2a990f3e07a31239712cb",
        "sha256": "107e1e74180163911ffd09bbb40654e1ccafdcb9f7ed049c5f99b2a2491af631"
      },
      "registered": 1011808304,
      "dob": 381810389,
      "phone": "(612)-481-1846",
      "cell": "(213)-966-9760",
      "id": {
        "name": "SSN",
        "value": "501-03-3665"
      },
      "picture": {
        "deactive": "https://s-media-cache-ak0.pinimg.com/474x/85/6a/82/856a827f6280033c6b778d114eb88e8e.jpg",
        "active": "https://s-media-cache-ak0.pinimg.com/474x/21/7e/db/217edb93473fe01e816459e481f04ff6.jpg",
      },
      "nat": "US"
       }
      ];
    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      getSectionData,
      getRowData,
    });

    const { dataBlob, sectionIds, rowIds } = this.formatData(demoData);
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds),
    };
  }

  handlerSelection(id,active){
    console.log('bubble up')
    this.props.handlerSelection(id,active);
  }

  render() {
    return (
      <ListView
        removeClippedSubviews={true} 
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(data) => <Row {...data} active={false} onPress={this.handlerSelection.bind(this)} />}
      />
    );
  }
}

export default OnboardingListView;