import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,  
} from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

let currentLocation;
const LOCATION_TRACKING = 'location-tracking';
TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return;
    }
    if (data) {
      currentLocation = data;
      const { locations } = data;
      let lat = locations[0].coords.latitude;
      let long = locations[0].coords.longitude;
      console.log(
        // `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
        locations
      );
      fetch('http://192.168.2.27:5000', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(locations)
      });
    }
});

export default function App() {

  const [locationStarted, setLocationStarted] = useState(false);
  function UserLocation() {
    const [locationStarted, setLocationStarted] = React.useState(false);
    const startLocationTracking = async () => {
      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 10000,
        distanceInterval: 0,
      });
      const hasStarted = await Location.hasStartedLocationUpdatesAsync(
          LOCATION_TRACKING
      );
      setLocationStarted(hasStarted);
      console.log('tracking started?', hasStarted);
    };
    React.useEffect(() => {
      const config = async () => {
        let resf = await Location.requestForegroundPermissionsAsync();
        let resb = await Location.requestBackgroundPermissionsAsync();
        if (resf.status != 'granted' && resb.status !== 'granted') {
            console.log('Permission to access location was denied');
        } else {
            console.log('Permission to access location granted');
        }
      };
      config();
    }, []);
    const startLocation = () => {
      startLocationTracking();
    }
    const stopLocation = () => {
    setLocationStarted(false);
    TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING)
      .then((tracking) => {
          if (tracking) {
              Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
          }
      })
    }
    return (
      <View>
        {locationStarted ?
          <TouchableOpacity onPress={stopLocation}>
              <Text style={styles.btnText}>Stop Tracking</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={startLocation}>
              <Text style={styles.btnText}>Start Tracking</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }


  const [latestLocation, updateLatestLocation] = useState(currentLocation);



  const BeaconPageContent = () => {
    return (
      <View style = {styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Beacon</Text>
        </View>
        <ScrollView style = {styles.textContainer}>
          <UserLocation />
          <Text style={styles.paragraph}>
            {JSON.stringify(latestLocation)}
          </Text>
        </ScrollView>
      </View>
    );
  }

  const SplashPageContent = () => {
    return (
      <View style = {styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>AISExchange</Text>
        </View>
        <ScrollView style = {styles.textContainer}>

          <Text style = {[styles.heading, styles.menuTitle]}>Map</Text>
          <Text style={styles.paragraph}>
            View the position of vessels sharing their position on AISExchange.
          </Text>
          <View style = {styles.navButton}>
            <Button 
              color = "#0d47a1" 
              title = "Open Map" 
              style = {styles.navButton}
              onPress = {() => {setContent(<MapPageContent />); drawer.current.closeDrawer();}}
            />
          </View>

          <Text style = {[styles.heading, styles.menuTitle]}>Beacon</Text>
          <Text style={styles.paragraph}>
            Broadcast your position on AISExchange.
          </Text>
          <View style = {styles.navButton}>
            <Button 
              color = "#0d47a1" 
              title = "Open Beacon" 
              style = {styles.navButton}
              onPress = {() => {setContent(<BeaconPageContent />); drawer.current.closeDrawer();}}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  const DocumentationPageContent = () => {
    return (
      <View style = {styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Documentation</Text>
        </View>
        <ScrollView style = {styles.textContainer}>
          <Text style={styles.paragraph}>
            {'\n'}
            AISExchange was created with the intention of creating a free and open source platform for the exchange of AIS data.            {'\n'}
          </Text>
        </ScrollView>
      </View>
    );
  }


  const MapPageContent = () => {
    return (
      <View style = {styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Map</Text>
        </View>
        <ScrollView style = {styles.textContainer}>
          <Text style={styles.paragraph}>
            {'\n'}
            Map Webview goes here
          </Text>
        </ScrollView>
      </View>
    );
  }

  const NewsPageContent = () => {
    return (
      <View style = {styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>News</Text>
        </View>
        <ScrollView style = {styles.textContainer}>
          <Text style={styles.paragraph}>
            {'\n'}
            No News!
          </Text>
        </ScrollView>
      </View>
    );
  }
  
  const AboutPageContent = () => {
    return (
      <View style = {styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>About</Text>
        </View>
        <ScrollView style = {styles.textContainer}>
          <Text style={styles.heading}>{'\n'}AISExchange</Text>
          <Text style={styles.paragraph}>
            AISExchange was created with the intention of creating a free and open source platform for the exchange of AIS data.          
            {'\n'}
          </Text>
          <Text style={styles.heading}>What is AIS?</Text>
          <Text style={styles.paragraph}>
            Automatic Identification Systems are a set of technologies that use transponders on ships to broadcast their identity, position, course and speed to other ships, coastal stations and satellites. This information is used by ships to avoid collisions, by port authorities to manage port operations, and by commercial organizations to track and manage their fleets.
            {'\n'}
          </Text>
          <Text style={styles.heading}>How does AIS typically work?</Text>
          <Text style={styles.paragraph}>
            Commercial vessels carry purpose-built AIS transponders. The signal broadcast by these transponders is received by other ships, coastal stations and satellites. The signal is then decoded and the information is displayed on the bridge of the receiving vessel.
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
          </Text>
        </ScrollView>
      </View>
    );
  }

  const [content, setContent] = React.useState((<SplashPageContent />));
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <View style = {styles.navButtonContainer}>
        <Text style = {[styles.heading, styles.menuTitle]}>AISExchange</Text>
        <View style = {styles.navButton}>
          <Button 
            color = "#0d47a1" 
            title = "Latest News" 
            style = {styles.navButton}
            onPress = {() => {setContent(<NewsPageContent />); drawer.current.closeDrawer();}}
          />
        </View>
        <View style = {styles.navButton}>
          <Button 
            color = "#0d47a1" 
            title = "Documentation" 
            style = {styles.navButton}
            onPress = {() => {setContent(<DocumentationPageContent />); drawer.current.closeDrawer();}}
          />        
        </View>
        <View style = {styles.navButton}>
          <Button 
            color = "#0d47a1" 
            title = "About AISExchange" 
            style = {styles.navButton}
            onPress = {() => {setContent(<AboutPageContent />); drawer.current.closeDrawer();}}
          />        
        </View>
        <Text style = {[styles.heading, styles.menuTitle]}>Map</Text>
        <View style = {styles.navButton}>
          <Button 
            color = "#0d47a1" 
            title = "Open Map" 
            style = {styles.navButton}
            onPress = {() => {setContent(<MapPageContent />); drawer.current.closeDrawer();}}
          />
        </View>
        <Text style = {[styles.heading, styles.menuTitle]}>Beacon</Text>
        <View style = {styles.navButton}>
          <Button 
            color = "#0d47a1" 
            title = "Open Beacon" 
            style = {styles.navButton}
            onPress = {() => {setContent(<BeaconPageContent />); drawer.current.closeDrawer();}}
          />
        </View>
      </View>
    </View>
  );

  const drawer = useRef(null);
  const drawerPosition = ("right");
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
      styles = {styles.drawer}
    >
      <StatusBar backgroundColor = "#002171"/>
      {content}
        <View style = {styles.bottomFixed}>
          <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
            <View style = {styles.menuButtonTextContainer}>
              <Text style = {styles.menuButtonText}>MENU</Text>
            </View>
          </TouchableOpacity>
        </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  navigationContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",

  },
  navButton: {
    marginTop: 10,
  },
  titleBar: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: "#0d47a1",
    padding: 16,
    borderColor: "#5472d3",
    borderBottomWidth: 2,
  },
  menuTitle: {
    color: "#5472d3",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    color: "#ffffff",
  },
  heading: {
    fontSize: 30,
  },
  paragraph: {
    fontSize: 20,
  },
  textContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  bottomFixed: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  menuButtonTextContainer : {
    backgroundColor: "#0d47a1",
    padding: 16,
    borderRadius: 8,
    borderColor: "#5472d3",
    borderWidth: 2,

  },
  menuButtonText: {
    color: "#ffffff",
    fontSize: 20,
  },
});
