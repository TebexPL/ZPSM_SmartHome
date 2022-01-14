import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  TextInput
} from 'react-native';

function DeviceBox(props){
  return (
    <View style={{width: '40%',
                  margin: '5%',
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  borderColor: 'black',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'}}>
      <Text style={{fontSize: 35, marginBottom: 5}}>{props.data.name}</Text>
      <Text style={{fontSize: 20}}>{props.data.place}</Text>
    </View>
  )
}
function DeviceAddBox(props){
  return (
    <TouchableOpacity style={{width: '40%',
                  margin: '5%',
                  aspectRatio: 1,
                  borderColor: 'grey',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'}}

                  onPress={props.onPress}>

      <Text style={{fontSize: 50}}>+</Text>
    </TouchableOpacity>
  )
}

function Devices(props) {
  const [renderScreen, setRenderScreen] = useState('devices');
  const [addingDevice, setAddingDevice] = useState(false);
  const [devices, setDevices] = useState([]);
  const [addName, setAddName] = useState('');
  const [addPlace, setAddPlace] = useState('');
  const [addCommand, setAddCommand] = useState('');
  const [addHint, setAddHint] =  useState(false);
  useEffect(() =>{
    async function loadDevices(){
          try {
            //await AsyncStorage.setItem('devices', '');
            const value = await AsyncStorage.getItem('devices');
            const valArr = JSON.parse(value);
            if(value !== null)
              setDevices(valArr);
            else
              setDevices([{}]);
          } catch (error) {
            setDevices([{}]);
          }
    }
    loadDevices();
    }  , []);

    useEffect(() => {
      if(addingDevice){
        props.navigation.setOptions({tabBarStyle: {display:'none'}, title: 'New device'});
        setAddName('');
        setAddPlace('');
        setAddCommand('');
        setAddHint(false);
        setRenderScreen('newDevice');

      }
      else{
        props.navigation.setOptions({tabBarStyle: {display:'flex'}, title: 'Devices'});

        setRenderScreen('devices');
      }



    }, [addingDevice]);




    async function save(){
      try{
        devices.unshift({name:addName, place: addPlace, command: addCommand})
        await AsyncStorage.setItem('devices',JSON.stringify(devices));
      } catch (error) {
        console.log(error);
      }finally{
        setAddingDevice(false);
      }
    }


  if(renderScreen == 'devices' ){
    return (
      <FlatList
        data={devices}
        numColumns={2}
        renderItem={({item}) => item.name!==undefined?<DeviceBox data={item}/>:<DeviceAddBox onPress={() => setAddingDevice(true)} />}
        />
    );
  }
  else{
    return (
        <View style={{height: '100%', alignItems:'center', justifyContent: 'space-around'}}>
          <Text style={[styles.hint, {display: addHint?'flex':'none'}]}>Please complete all fields before saving</Text>
          <TextInput style={styles.input} placeholder='Name' onChangeText={(text) => setAddName(text)}/>
          <TextInput style={styles.input} placeholder='Place' onChangeText={(text) => setAddPlace(text)}/>
          <TextInput style={styles.input} placeholder='Command' onChangeText={(text) => setAddCommand(text)}/>
        <View style={{width: '100%',flexDirection: 'row', flex: 1, alignItems:'flex-end', justifyContent:'space-around'}}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setAddingDevice(false);
                }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if(addName && addPlace && addCommand){
                    save();
                  }
                  else {
                    setAddHint(true);
                  }
                }}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  input:{
    textAlign: 'center',
    margin:'5%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    fontSize: 20,
    width: '80%',
  },
  hint:{
    textAlign: 'center',
    color: 'red',
    width: '100%',
    marginTop: 5,
  },
  button:{
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  }



})

export default Devices;
