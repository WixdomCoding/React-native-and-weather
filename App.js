import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';

const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ title: 'Weather' }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Home' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

const MainScreen = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Function to fetch weather data from OpenWeatherMap API
    const fetchWeatherData = async () => {
      try {
        const apiKey = '7a46f1b4438777f29966892705f402b2';
        const city = 'Flemingsberg'; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (

    <View style={styles.container}>

      <View style={styles.topcontainer}>
        <Text style={{ fontSize: 30 }}>Weather</Text>
      </View>

      <View style={styles.cover}>
            
        <View>
            {weatherData ? (
            <View style={styles.citycount}>
                <Text style={{ fontSize: 20 }}>
                {weatherData.name}, {weatherData.sys.country}
                </Text>
                <Text style={{ fontSize: 20 }}>{weatherData.weather[0].description}</Text>
            </View>
            ) : (
            <Text style={{ fontSize: 20 }}>Loading weather data...</Text>
            )}
        </View>

        {weatherData ? (

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, backgroundColor: 'white', padding: 20, height: 150, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontSize: 30 }}>{weatherData.main.temp} °C</Text>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', padding: 20, height: 150 }}>
                    <Text style={{ fontSize: 16 }}>Feels like: {weatherData.main.feels_like} °C</Text>
                    <Text style={{ fontSize: 16 }}>Wind: {weatherData.wind.speed} m/s</Text>
                    <Text style={{ fontSize: 16 }}>Humidity: {weatherData.main.humidity}%</Text>
                    <Text style={{ fontSize: 16 }}>Precip: {weatherData.rain?.['1h'] || 0} mm</Text>
                    <Text style={{ fontSize: 16 }}>Pressure: {weatherData.main.pressure} hPa</Text>
                </View>
            </View>
            ) : (
            <Text style={{ fontSize: 20 }}>Loading weather data...</Text>
            )}
            <View style={styles.apibox}>
                {weatherData ? (
                // Display date and time
                <Text style={{ fontSize: 20 }}>
                    {new Date().toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                    })}
                </Text>
                ) : null}
            </View>

        {/* Button to navigate to Home.js */}
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topcontainer: {
    backgroundColor: '#FDE7FF',
    width: '100%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    backgroundColor: '#b53e3e',
    flex: 1,
    justifyContent: 'center',
  },
  citycount: {
    backgroundColor: '#f5c55e',
    width: '100%',
    padding: 20,
  },
  midapibox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apibox: {
    backgroundColor: '#f5c55e',
    width: '100%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
  },
});