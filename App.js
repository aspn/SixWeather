import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import config from './config';
import messages from './messages';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      weatherData: {},
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const darkSkyWeather = getDarkSkyWeather(position.coords.latitude, position.coords.longitude);
        darkSkyWeather.then((success) => {
          console.log('WEATHER SUCCESS');
          console.log(success);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            weatherData: success,
            error: null,
          });
        });
      },
      (error) => this.setState({
        error: error.message
      }), {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 1000
      },
    );

    async function getDarkSkyWeather(lat, long) {
      try {
        let response = await fetch(
          `https://api.darksky.net/forecast/${config.DARK_SKY_KEY}/${lat},${long}?units=ca`
        );
        let responseJson = await response.json();
        return responseJson;
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>6 weather</Text>
        <Text style={styles.locationText}>{this.state.latitude}</Text>
        <Text style={styles.locationText}>{this.state.longitude}</Text>
        <Text style={styles.locationText}>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: 'Futura',
    fontWeight: '700',
    fontSize: 50,
    letterSpacing: -0.6,
    color: '#A1917C',
  },
  locationText: {
    fontFamily: 'Futura',
    fontWeight: '100',
    fontSize: 20,
    letterSpacing: -0.6,
    color: '#A1917C',
  },
});
