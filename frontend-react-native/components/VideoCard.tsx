import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons'; // For play/pause icons

export default function VideoCard(props) {
    const [isPaused, setIsPaused] = useState(true);
    const videoRef = useRef(null); // reference to video player
    const { videoLocation = 'https://www.w3schools.com/html/mov_bbb.mp4' } = props;
    // reference to video location

    const togglePlayback = () => {
        setIsPaused(!isPaused); // Toggle play/pause
    }

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={togglePlayback} style={styles.videoContainer}>
            <Video
                      ref={videoRef}
                      source={{ uri: videoLocation }} // video URL here
                      paused={isPaused}  // Control playback
                      style={styles.video}
                      resizeMode="cover"  // Cover the entire video area
                      repeat={true}       // Repeat the video
                    />

            {/* Play/Pause Button */}
                    {isPaused && (
                      <View style={styles.playButtonContainer}>
                        <Icon name="play-circle" size={64} color="white" />
                      </View>
                    )}
            </TouchableOpacity>

            {/* Description or any text below the video */}
            <View style={styles.cardDetails}>
                <Text style={styles.videoTitle}>Video Title</Text>
                <Text style={styles.videoDescription}>
                  This is a description of the video. You can put any information here like comments, likes, etc.
                </Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    margin: 15,
    overflow: 'hidden', // Ensures rounded corners for video
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    height: 250,  // Adjust to your desired video height
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }],
    zIndex: 1,
  },
  cardDetails: {
    padding: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoDescription: {
    marginTop: 5,
    color: '#555',
  },
});
