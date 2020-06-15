import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
  Keyboard
} from 'react-native';
import Modal from 'react-native-modal';
import { black, blue, white_background } from './utils/Color';
import { NewDeck } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateNewDeck(props) {
  const [DeckTitle, setDeckTitle] = useState('');
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [deckImage, setdeckImage] = useState(
    'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
  );
  const [showModal, setShowModal] = useState(false);

  const handleChange = e => {
    setDeckTitle(e);
  };

  const handleQuery = e => {
    setQuery(e);
  };

  const handleImage = (e, desc) => {
    const description = desc || 'Unsplash image set';
    setdeckImage(e);
    setQuery(description);
    setShowModal(true);
    setImages([]);
  };

  const handleImageSearch = e => {
    Keyboard.dismiss();
    fetch(
      `https://api.unsplash.com/search/?query=${query}&page=1&client_id=GKRhhIrcD3mJBCQ5v_yuoEEEQTc_O6-D34VbWyah0TE`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        setImages(data.photos.results.slice(0, 5));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const dispatch = useDispatch();
  let cards = useSelector(state => state);
  const handleSubmit = async () => {
    const id = DeckTitle;
    let data = {
      ...cards,
      [id]: {
        title: DeckTitle,
        image: deckImage,
        questions: []
      }
    };

    await AsyncStorage.setItem('cards', JSON.stringify({ ...data }));
    dispatch(
      NewDeck({
        title: DeckTitle,
        image: deckImage,
        questions: []
      })
    );

    alert('Deck Created');

    props.navigation.navigate('Details', { id: DeckTitle });
  };
  return (
    <View style={style.container}>
      <View>
        <Modal isVisible={showModal}>
          <View style={style.modalView}>
            <Text>Image Added successfully..</Text>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Text style={style.btn}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <KeyboardAvoidingView>
          <TextInput
            style={{
              borderColor: black,
              borderStyle: 'solid',
              borderWidth: 1,
              height: 50,
              width: Dimensions.get('window').width - 40,
              marginBottom: 20,
              marginTop: 20,
              padding: 10
            }}
            value={DeckTitle}
            placeholder='Enter DeckTitle here'
            onChangeText={handleChange}
          />
          <TextInput
            returnKeyType='search'
            onSubmitEditing={query => handleImageSearch(query)}
            style={{
              borderColor: black,
              borderStyle: 'solid',
              borderWidth: 1,
              height: 50,
              width: Dimensions.get('window').width - 40,
              marginBottom: 20,
              padding: 10
            }}
            value={query}
            placeholder='Search For Image'
            onChangeText={handleQuery}
          />
          <Text style={{ fontSize: 10 }}>* Images powered by unsplash</Text>
          <TouchableOpacity onPress={query => handleImageSearch(query)}>
            <Text style={style.btn}>Search</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      {images.length > 0 && (
        <ScrollView>
          {images.map(item => {
            return (
              <View key={item.id}>
                <TouchableOpacity
                  onPress={() => handleImage(item.urls.small, item.description)}
                >
                  <Image
                    source={{ uri: item.urls.small }}
                    style={{
                      height: 300,
                      width: Dimensions.get('window').width - 20,
                      borderRadius: 20,
                      marginTop: 20
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}
      <View>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={style.btn}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    padding: 10,
    backgroundColor: blue,
    color: white_background,
    width: 100,
    marginHorizontal: 'auto',
    marginVertical: 5,
    textAlign: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center'
  }
});
