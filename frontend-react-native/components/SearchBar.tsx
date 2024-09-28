import React, { useState, useRef } from 'react';
import {Text, TextInput, View, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SearchBar(props) {
    const { searchFunction, searchText = 'Find me something new...' } = props;
    const [text, setText] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const iconOpacity = useRef(new Animated.Value(1)).current; // Opacity for search/clear icon
    const widthAnim = useRef(new Animated.Value(300)).current;  // Animated width for the search bar

    const animateSearch = () => {
        Animated.timing(iconOpacity, {
          toValue: 0, // Fade out current icon
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          setIsSearching(true); // Switch to clear icon
          Animated.timing(iconOpacity, {
            toValue: 1, // Fade in new icon
            duration: 200,
            useNativeDriver: true,
          }).start();
        });
    };

    // Handle clearing the search input and reset animation
      const handleClearSearch = () => {
        setText('');
        setIsSearching(false);
        Animated.timing(iconOpacity, {
          toValue: 0, // Fade out current icon
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(iconOpacity, {
            toValue: 1, // Fade back to search icon
            duration: 200,
            useNativeDriver: true,
          }).start();
        });
    };

    // Handle search bar focus, animate bar width when focused
      const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(widthAnim, {
          toValue: 350, // Expand width when focused
          duration: 300,
          useNativeDriver: false, // Width needs to run on the JS thread
        }).start();
      };

      // Handle losing focus, reset width
      const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(widthAnim, {
          toValue: 300, // Shrink back to original width when focus is lost
          duration: 300,
          useNativeDriver: false,
        }).start();
      };

    // Function to handle search suggestions as the user types
    // Returns a list of possible search result titles based on phrase user typed
    const handleSearchSuggestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/suggestions', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchQuery: query }),
        });

        const data = await response.json();
        console.log('Response from backend:', data);
      } catch (error) {
        console.error('Error sending search query:', error);
      }
    };

    // Function to handle the search submission
    // uses fetch to send a POST request with the search query as json.
    const handleSearch = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/search', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchQuery: query }),
          });

          const data = await response.json();
          console.log('Response from backend:', data);
        } catch (error) {
          console.error('Error sending search query:', error);
        }
    };

    return(
        <View style={styles.container}>
        <Animated.View style={[styles.searchBar, { width: widthAnim }]}>
        <TouchableOpacity onPress={isSearching ? handleClearSearch : handleSearch}>
          <Animated.View style={{ opacity: iconOpacity }}>
            {isSearching ? (
              <Icon name="close-circle" size={20} color="#000" style={styles.icon} />
            ) : (
              <Icon name="search" size={20} color="#000" style={styles.icon} />
            )}
          </Animated.View>
        </TouchableOpacity>
        <TextInput
            style={styles.input}
            placeholder={searchText}
            onChangeText={newText => setText(newText)}
            defaultValue={text}
          />
        </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      paddingVertical: 16,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#f0f0f0',
    },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1, // Takes up remaining space after the icon
    fontSize: 16,
  },
});