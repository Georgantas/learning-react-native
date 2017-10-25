
// import a library to help create a component

import React from 'react';
import { View } from 'react-native';
import Header from './src/components/header';
import AlbumList from './src/components/AlbumList';

// create a component
const App = () => {
  // flex: 1, so that scroll view can work properly
  // we want this view to take up the whole screen
  return (
    <View style={{ flex: 1 }}>
      <Header headerText={'Albums'} />
      <AlbumList />
    </View>
  );
};

// render the component to the device
export default App;
