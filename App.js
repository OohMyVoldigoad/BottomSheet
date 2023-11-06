import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DataLapangan, JadwalHarga } from './constants';

export default function App() {
  const [selectedItem, setSelectedItem] = useState([]);
  
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["25%", "48%", "75%"];

  function handlePresentModal(Lap) {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
    setSelectedItem(Lap);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View
          style={[
            styles.container,
            { backgroundColor: isOpen ? "gray" : "white" },
          ]}
        >
          {DataLapangan.map((Lap,index) => {
            return(
              <TouchableOpacity key={index} style={styles.touch} onPress={() => handlePresentModal(Lap)}>
                <View style={styles.content}>
                  <Text style={styles.title}>{Lap.Nama}</Text>
                  <Text style={styles.subtitle}>{Lap.Jenis}</Text>
                  <Text style={styles.venue}>{Lap.Penyedia}</Text>
                  <Text style={{ fontWeight: 'bold', color: Lap.Status === 'Berhasil' ? 'green' : 'red' }}>
                    {Lap.Status}
                  </Text>
                  {JadwalHarga.map((harga, index1) => {
                    return (
                      <View key={index1} style={styles.timePriceWrapper}>
                        <Text style={styles.price}>Rp. {harga.Harga}</Text>
                      </View>
                    )
                  })}
                </View>
              </TouchableOpacity>
            )
          })}
          <StatusBar style="auto" />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 50 }}
            onDismiss={() => {
              setIsOpen(false);
              setSelectedItem(null); // Clear the selected item when dismissing the sheet
            }}
          >
            {/* Only show the details if there is a selected item */}
            {selectedItem && (
              <View style={styles.contentContainer}>
                <View style={styles.header}>
                  <Text style={styles.headerText}>DETAIL PESANAN</Text>
                </View>

                {/* Show the details of the selected item */}
                <View style={styles.section}>
                  <Text style={styles.title}>{selectedItem.Nama}</Text>
                  <Text style={styles.subtitle}>{selectedItem.Penyedia}</Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Status Pemesanan</Text>
                  <Text style={{ fontWeight: 'bold', color: selectedItem.Status === 'Berhasil' ? 'green' : 'red' }}>
                    {selectedItem.Status}
                  </Text>
                </View>

                {/* ... More details here ... */}
              </View>
            )}
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    width: "100%"
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  scroll: {
    flex: 1 ,
    backgroundColor: '#FFF9E8',
    borderRadius: 50
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30
  },
  section: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
  badmintonText: {
    fontSize: 18,
  },
  timePriceSection: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  time: {
    fontSize: 18,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  commentSection: {
    padding: 20,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  comment: {
    fontSize: 16,
  },
  admin: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
