import React, { Component, } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Picker,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import MapView from "react-native-maps";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import * as theme from "../theme";

const { Marker } = MapView;
const { heigth, width } = Dimensions.get("screen");
const parkingsSpots = [
  {
    id: 1,
    title: "parking 1",
    price: 5,
    rating: 4.2,
    spots: 20,
    free: 10,
    coordinate: {
      latitude: 37.78825,
      longitude: -122.43235,
    },
  },
  {
    id: 2,
    title: "parking 2",
    price: 7,
    rating: 3.8,
    spots: 25,
    free: 20,
    coordinate: {
      latitude: 37.76836,
      longitude: -122.4613,
    },
  },
  {
    id: 3,
    title: "parking 3",
    price: 10,
    rating: 5.8,
    spots: 50,
    free: 25,
    coordinate: {
      latitude: 37.7785,
      longitude: -122.43265,
    },
  },
  {
    id: 4,
    title: "parking 4 ",
    price: 15,
    rating: 7.5,
    spots: 60,
    free: 30,
    coordinate: {
      latitude: 37.7965,
      longitude: -122.42355,
    },
  },
];

class ParkingMap extends Component {
  state = {
    hours: {},
    active: null,
    activeModal: null,
  };

  componentDidMount() {
    const { parkings } = this.props;

    const hours = {};

    parkings.map((parking) => {
      hours[parking.id] = 1;
    });
    this.setState({ hours });
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headerTitle}>Detected Location</Text>
          <Text style={styles.headerLocation}>San Francisco, Us</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingTop: 25,
          }}
        >
          <TouchableWithoutFeedback>
            <Ionicons name="ios-menu" size={30} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  renderModal() {
    const { activeModal, hours } = this.state;
    
    if (!activeModal) return null;

    return (
      <Modal
        isVisible
        useNativeDrivers
        onBackButtonPress={() => this.setState({ activeModal: null })}
        onBackdropPress={() => this.setState({ activeModal: null })}
        onSwipeComplete={() => this.setState({ activeModal: null })}
        style={styles.modalContaner}
      >
        <View style={styles.modal}>
          <View>
            <Text>{activeModal.title}</Text>
          </View>
          <View>
            <Text>{activeModal.description}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>{activeModal.price}</Text>
            <Text>{activeModal.rating}</Text>
            <Text>{activeModal.distance}</Text>
            <Text>
              {activeModal.free}/{activeModal.total}
            </Text>
          </View>
          <View>
            <Text style={{ textAlign: "center" }}>
              Choose Your booking period:
            </Text>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <TouchableOpacity style={styles.btnBuy}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ fontSize: 25, color: "white" }}>
                  proceed to pay ${activeModal.total}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  renderParking(item) {
    const { hours } = this.state;
    return (
      <TouchableWithoutFeedback
        key={`parking=${item.id}`}
        onPress={() => this.setState({ active: item.id })}
      >
        <View style={styles.parking}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={{ fontSize: 18 }}>
              x {item.spots} {item.title}
            </Text>

            <View style={styles.hoursView}>
              <Text style={{ fontSize: 18 }}>05:00 hrs</Text>
            </View>
          </View>
          <View style={{ flex: 1.5, flexDirection: "row" }}>
            <View
              style={{
                flex: 0.75,
                justifyContent: "center",
                marginHorizontal: 24,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="ios-pricetag"
                  size={theme.SIZES.icon}
                  color="#7D818A"
                />
                <Text>${item.price}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="ios-star"
                  size={theme.SIZES.icon}
                  color="#7D818A"
                />

                <Text>{item.rating}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.buy}
              onPress={() => this.setState({ activeModal: item })}

            >
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{ fontSize: 25, color: "white" }}>
                  ${item.price * 2}
                </Text>
                <Text style={styles.hours}>
                  {item.price}x{hours[item.id]} hrs
                </Text>
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 25, color: "white" }}>></Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderParkings() {
    return (
      <FlatList
        horizontal
        scrollEnabled
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottl={16}
        snapToAlignment="center"
        style={styles.parkings}
        data={this.props.parkings}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => this.renderParking(item)}
      />

      //  <ScrollView
      //    horizontal
      //    scrollEnabled
      //    pagingEnabled

      //    showsHorizontalScrollIndicator={false}
      //    scrollEventThrottl={16}
      //    snapToAlignment='center'
      //    style={styles.parkings}
      //  >
      //    {parkings.map((parking) => this.renderParking(parking))}
      //  </ScrollView>
    );
  }

  render() {
    const { currentPositon, parkings } = this.props;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView initialRegion={currentPositon} style={styles.map}>
          {parkings.map((parking) => (
            <Marker
              key={`marker-${parking.id}`}
              coordinate={parking.coordinate}
            >
              <TouchableWithoutFeedback
                onPress={() => this.setState({ active: parking.id })}
              >
                <View
                  style={[
                    styles.marker,
                    this.state.active === parking.id ? styles.active : null,
                  ]}
                >
                  <Text style={styles.parkingPrice}>${parking.price}</Text>
                  <Text style={{ color: theme.COLORS.gray }}>
                    ($ {parking.free}/{parking.spots})
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Marker>
          ))}
        </MapView>
        {this.renderParkings()}
        {this.renderModal()}
      </View>
    );
  }
}
ParkingMap.defaultProps = {
  currentPositon: {
    latitude: 37.78825,
    longitude: -122.43235,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  parkings: parkingsSpots,
};

export default ParkingMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,

    // alignItems:'center'
  },
  headerTitle: {
    color: theme.COLORS.gray,
    marginTop: 25,
  },
  headerLocation: {
    fontSize: 20,
    fontWeight: "500",
  },
  map: {
    flex: 3,
    // width:100,
    // height:100
  },
  parkings: {
    position: "absolute",

    right: 0,
    left: 0,
    bottom: 24,
  },
  parking: {
    flexDirection: "row",
    backgroundColor: theme.COLORS.white,
    borderRadius: 6,
    padding: 12,
    marginHorizontal: 24,
    width: width - 24 * 2,
  },
  buy: {
    flex: 1.25,
    padding: 10,
    flexDirection: "row",
    backgroundColor: theme.COLORS.red,
    borderRadius: 6,
  },
  btnBuy: {
    flex: 0.75,
    paddingBottom: 20,
    paddingTop:13,
    alignItems:'center',
    flexDirection: "row",
    backgroundColor: theme.COLORS.red,
    borderRadius: 6,
  },
  marker: {
    flexDirection: "row",
    backgroundColor: theme.COLORS.white,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    borderWidth: 1,
    borderColor: theme.COLORS.white,
  },
  active: {
    borderColor: theme.COLORS.red,
  },

  hours: { fontSize: 15, color: "white" },
  parkingPrice: { color: theme.COLORS.red, fontWeight: "bold" },

  hoursView: {
    width: 100,
    flex: 0,
    fontSize: 16,
    borderRadius: 6,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 10,
  },
  modal:{
    backgroundColor:'white',
    bottom:0,
    height:400,
    padding: 26,
    
  
  }, 
  modalContaner:{
  margin:0,
  justifyContent:'flex-end'  
  }
});
