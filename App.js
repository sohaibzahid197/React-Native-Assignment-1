import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const sections = [
          {
            title: 'Section 1',
            data: response.data.slice(0, 5), // Slice to get only the first 5 items as an example
          },
          {
            title: 'Section 2',
            data: response.data.slice(5, 10), // Slice to get the next 5 items as an example
          },
        ];
        setData(sections);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => (
          <View style={{ padding: 16 }}>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={{ backgroundColor: 'lightgray', padding: 8 }}>
            <Text>{section.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;
