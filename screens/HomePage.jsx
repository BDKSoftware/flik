import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { logout } from "../firebase";
import Carousel from "react-native-snap-carousel";

//Component Import
import TopBar from "../components/TopBar";
import { LinearGradient } from "expo-linear-gradient";

// Icon Imports
import CarouselCardItem from "../components/CarouselCardItem";

// API
import { useAuth } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomePage = ({ navigation }) => {
  const { isLoggedIn } = useAuth();
  const [userName, setUserName] = React.useState("Username");
  const [profilePic, setProfilePic] = React.useState(null);
  const [balance, setBalance] = React.useState(0);
  const [carouselItems, setCarouselItems] = React.useState([]);

  const getUserInfo = async () => {
    const userToken = await AsyncStorage.getItem("@user_token");
    await fetch(
      "http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.username) {
          setUserName(json.username);
        }

        if (json.profilePicUrl) {
          setProfilePic(json.profilePicUrl);
        }

        if (json.walletBalance) {
          setBalance(json.walletBalance);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserNFTs = async () => {
    setCarouselItems([]);
    const userToken = await AsyncStorage.getItem("@user_token");
    await fetch(
      "http://flikserver-env.eba-7ebfzi3t.us-east-1.elasticbeanstalk.com/nft/published",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        json.map((nft) => {
          setCarouselItems((carouselItems) => [
            ...carouselItems,
            {
              nft,
            },
          ]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("LandingPage");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserInfo();
      getUserNFTs();
      console.log("I RAN");
    });

    return unsubscribe;
  }, [navigation]);

  const isCarousel = React.useRef(null);
  // TEST DATA
  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl:
        "https://media.istockphoto.com/photos/colorful-panoramic-mountain-view-at-sunrise-picture-id1129473522?k=20&m=1129473522&s=612x612&w=0&h=hkdf6tP6u_qETGVjHZXZ_6GLydngH88D2KesGtzJZJU=",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl:
        "https://images.unsplash.com/photo-1579106131295-dfab63d39847?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl:
        "https://images.unsplash.com/photo-1548661651-9adb0e0ccc98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topbarContainer}>
        <TopBar image={profilePic} />
      </View>
      <View style={styles.userInfoContainer}>
        {/* PLACEHOLDER FOR USER INFO */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={
              profilePic == null
                ? require("../assets/defaultImage.png")
                : { uri: profilePic }
            }
            style={styles.profilePicture}
            defaultSource={require("../assets/defaultImage.png")}
          />
        </View>
        <Text style={styles.profileName}>{userName}</Text>
      </View>

      <View style={styles.cryptoContainer}>
        <Text style={styles.walletText}>your wallet</Text>
        <LinearGradient
          colors={["#a400ff", "#FFFFFF"]}
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          style={{
            width: "80%",
            height: "80%",
            borderRadius: 20,
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            padding: 10,
          }}
        >
          <Text style={styles.cryptoText}>{balance} FLIKC</Text>
          <TouchableOpacity style={styles.cryptoButton}>
            <Text style={styles.cryptoButtonText}>Connect</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.imagesContainer}>
        <Text style={styles.walletText}>your nft collection</Text>
        <View style={styles.images}>
          {carouselItems.length > 0 ? (
            <Carousel
              layout="default"
              layoutCardOffset={9}
              ref={isCarousel}
              data={carouselItems}
              renderItem={CarouselCardItem}
              itemWidth={200}
              sliderWidth={300}
              inactiveSlideShift={0}
              useScrollView={true}
            />
          ) : (
            <Text>{`You have no NFTs :(`}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topbarContainer: {
    width: "100%",
    height: "10%",
  },

  userInfoContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  profilePictureContainer: {
    width: 150,
    height: 150,
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },

  profilePicture: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },

  profileName: {
    fontSize: 48,
    fontWeight: "200",
    color: "#a400ff",
  },

  cryptoContainer: {
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  walletText: {
    fontSize: 16,
    fontWeight: "500",
  },

  cryptoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  cryptoButton: {
    width: "30%",
    height: "20%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.1,
  },

  cryptoButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8155D7",
  },

  imagesContainer: {
    width: "85%",
    height: "35%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },

  images: {
    width: "100%",
    height: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
