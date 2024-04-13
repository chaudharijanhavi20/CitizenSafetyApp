import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../redux/constants/colors';
import {Image} from 'react-native-animatable';
import axios from 'axios';
import {Button, Overlay} from '@rneui/themed';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import firestore from '@react-native-firebase/firestore';
const K_OPTIONS = [
  {
    item: 'OTP Fraud',
    id: 'otp',
  },
  {
    item: 'Fraud using Remote Access mobile app',
    id: 'ramp',
  },
  {
    item: 'UPI Fraud',
    id: 'upi',
  },
  {
    item: 'Refund Fraud',
    id: 'ref',
  },
  {
    item: 'OLX Fraud using digital document of men in uniform',
    id: 'olx',
  },
  {
    item: 'Fraud using fake SMS',
    id: 'sms',
  },
  {
    item: 'QR Code Scam',
    id: 'qr',
  },
  {
    item: 'Fraud using Google Business sites',
    id: 'google',
  },
  {
    item: 'Payment fraud using facebook Ads and fake e commerce sites.',
    id: 'payment',
  },
];
const Blog = () => {
  const [blognews, setblognews] = useState([]);
  // const [selectedTeam, setSelectedTeam] = useState({})
  const [recentstories, setrecentstories] = useState([]);
  const [filterstory, setfilterstory] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [visible, setVisible] = useState(false);
  const [blogoverlaydata, setblogoverlaydata] = useState('');
  const [isstorysection, setisstorysection] = useState(true);
  useEffect(() => {
    axios
      .get(
        'https://newsapi.org/v2/everything?q=cyber&from=2024-02-20&sortBy=publishedAt&apiKey=e1d7c86abdf740cc83720c83e59eab6d',
      )
      .then(response => {
        setblognews(response.data.articles);
      });
    firestore()
      .collection('stories')
      .onSnapshot(snap => {
        const tempArray = [];
        snap.forEach(item => {
          tempArray.push({
            ...item.data(),
            id: item.id,
          });
        });
        // console.log(tempArray[0].posttime);
        setrecentstories(tempArray);
      });
  }, []);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const setdata = currentdata => {
    setblogoverlaydata(currentdata);
    setVisible(!visible);
  };
  function onMultiChange() {
    const dataelement = [];
    selectedTeams.map(data => {
      dataelement.push(data.id);
    });
    // console.log(dataelement)
    const filteredStories = recentstories.filter(story => {
      // console.log(story)
      return dataelement.includes(story.category);
    });
    console.log(filteredStories);
    return item => setSelectedTeams(xorBy(selectedTeams, [item], 'id'));
  }
  const formatDateTime = timestamp => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Format the date and time as per locale
  };
  return (
    <>
      <View
        style={{
          zIndex: 100,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 250,
            height: 40,
            borderRadius: 40,
            backgroundColor: colors.white,
            flexDirection: 'row',
            position: 'absolute',
            top: 20,
            zIndex: 100,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setisstorysection(true)}
            style={{
              height: '100%',
              backgroundColor: isstorysection ? colors.buttonbg : colors.white,
              width: '50%',
              borderRadius: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: isstorysection ? colors.white : colors.buttonbg}}>
              Story
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setisstorysection(false)}
            style={{
              height: '100%',
              backgroundColor: isstorysection ? colors.white : colors.buttonbg,
              width: '50%',
              borderRadius: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: isstorysection ? colors.buttonbg : colors.white}}>
              Blog
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isstorysection ? (
        <View style={styles.container}>
          <View style={{marginTop: 50, flex: 1, alignItems: 'center'}}>
            <View style={{width: 300, marginTop: 20}}>
              <SelectBox
                inputPlaceholder="select category you are interested in"
                arrowIconColor="#fff"
                searchIconColor="#fff"
                optionsLabelStyle={{color: '#fff'}}
                toggleIconColor={colors.buttonbg}
                selectedItemStyle={{backgroundColor: colors.buttonbg}}
                labelStyle={{color: '#fff'}}
                label="Select multiple"
                options={K_OPTIONS}
                selectedValues={selectedTeams}
                onMultiSelect={onMultiChange()}
                onTapClose={onMultiChange()}
                multiOptionsLabelStyle={{color: colors.white}}
                isMulti
              />
            </View>
            <ScrollView>
              {filterstory.length > 0
                ? filterstory &&
                  filterstory.map((data, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: colors.buttonbg,
                          marginVertical: 20,
                          marginHorizontal: 20,
                          borderRadius: 10,
                          padding: 20,
                        }}>
                        <View>
                          <Text style={{fontSize: 20}}>{data.storydesc}</Text>
                        </View>
                        <View>
                          <Text style={{color: colors.grayscreenbg}}>
                            {formatDateTime(data.posttime.seconds)}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                : recentstories &&
                  recentstories.map((data, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: colors.buttonbg,
                          marginVertical: 20,
                          marginHorizontal: 20,
                          borderRadius: 10,
                          padding: 20,
                        }}>
                        <View>
                          <Text style={{fontSize: 20}}>{data.storydesc}</Text>
                        </View>
                        <View>
                          <Text style={{color: colors.grayscreenbg}}>
                            {formatDateTime(data.posttime?.seconds)}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
            </ScrollView>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View style={styles.blogoverlay}>
              {/* <Text>Title section</Text> */}
              <ScrollView>
                <Image
                  source={{
                    uri: blogoverlaydata.urlToImage,
                    width: 300,
                    height: 220,
                  }}
                  style={{objectFit: 'contain'}}
                  // style={styles.blogimage}
                />
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '800',
                    color: colors.black,
                    marginHorizontal: 10,
                  }}>
                  {blogoverlaydata.title}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.black,
                    fontWeight: '400',
                    margin: 10,
                  }}>
                  {blogoverlaydata.description}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.black,
                    fontWeight: '400',
                    margin: 10,
                  }}>
                  Authors : {blogoverlaydata.author}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: colors.black,
                    fontWeight: '400',
                    marginHorizontal: 10,
                  }}>
                  Important Urls - {blogoverlaydata.url}
                </Text>
              </ScrollView>
            </View>
          </Overlay>
          <View style={{marginTop: 50}}>
            {blognews &&
              blognews.map((newsdata, index) => {
                return (
                  <TouchableOpacity
                    style={styles.blogcontainer}
                    key={index}
                    onPress={() => setdata(newsdata)}>
                    <View style={styles.blogimage}>
                      <Image
                        source={{
                          uri:
                            newsdata['urlToImage'] === null
                              ? 'https://plus.unsplash.com/premium_photo-1666997726532-33f671ca24c8?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                              : newsdata.urlToImage,
                          width: 120,
                          height: 120,
                        }}
                        style={styles.blogimage}
                      />
                    </View>
                    <View style={styles.blogtext}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#fff',
                          fontWeight: '800',
                          height: '80%',
                        }}>
                        {newsdata?.title}
                      </Text>
                      <Text style={styles.bloginnertext}>
                        {newsdata.publishedAt}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenbg,
  },
  text: {
    fontSize: 100,
    fontStyle: 'italic',
  },
  blogcontainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 120,
    width: 'auto',
    marginVertical: 20,
  },
  blogimage: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    objectFit: 'cover',
    borderRadius: 10,
  },
  blogtext: {
    flex: 3,
    justifyContent: 'space-between',
    // alignItems:"center",
    color: colors.white,
  },
  bloginnertext: {
    color: colors.white,
  },
  blogoverlay: {
    height: 600,
    width: 300,
  },
  blogoverlayimg: {
    width: '100%',
  },
});
export default Blog;
