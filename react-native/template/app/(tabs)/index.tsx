// rn 调用硬件功能
import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions
} from 'expo-camera';
import {
  Image
} from 'expo-image';
import {
  useRef,
  useState
} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Button,
  Text
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { FontAwesome6 } from '@expo/vector-icons';

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const ref = useRef<CameraView>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);

  if (!permission) {
    return null
  }

  const toggleMode = () => {
    setMode(mode === "picture" ? "video" : "picture");
  }
  const toggleFacing = () => {
    setFacing(facing === "back" ? "front" : "back");
  }
  const renderPicture = (uri:string) => {
    return (
      <View>
        <Image source={{uri}} style={{width:300, aspectRatio: 1}} contentFit="contain"/>
        <Button onPress={() => setUri(null)} title='take another picture'></Button>
      </View>
    )
  };
  const takePicture = async () => { 
    const photo = await ref.current?.takePictureAsync();
    if(photo?.uri){
      setUri(photo.uri);
    }
  }
  const recordVideo = () => {}
  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          ref={ref}
          mode={mode}
          facing={facing}
          mute={false}
          responsiveOrientationWhenOrientationLocked
        />
        <View style={styles.shutterContainer}>
          <Pressable onPress={toggleMode}>
            {
              mode === 'picture'?
              (<AntDesign name="picture" size={32} color="white"/>)
              :
              (
                <Feather name="video" size={32} color="white"/>
              )
            }

          </Pressable>
          <Pressable
            onPress={mode === 'picture' ? takePicture: recordVideo}
          >
            {
              ({pressed}) => (
                <View style={
                  [
                    styles.shutterBtn,
                    {
                      opacity: pressed ? 0.5 : 1
                    }
                  ]
                }>
                  <View style={
                    [
                      styles.shutterBtnInner,
                      {
                        backgroundColor: mode === 'picture'?'white':'red'
                      }
                    ]
                  }>

                  </View>
                </View>
              )
            }
          </Pressable>
         <Pressable onPress={toggleFacing}>
          <FontAwesome6 name="rotate-right" size={32} color="white"/>
         </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
    {uri ? renderPicture(uri):renderCamera() }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraContainer: StyleSheet.absoluteFillObject,
  camera: StyleSheet.absoluteFillObject,
  shutterContainer: {
    position: 'absolute',
    bottom: 44,
    left: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    width: '100%',

  },
  shutterBtn: {
      backgroundColor: 'transparent',
      borderWidth: 5,
      borderColor: 'white',
      width: 85,
      height: 85,
      borderRadius: 45,
      alignItems: 'center',
      justifyContent: 'center',
  },
  shutterBtnInner: {
      width: 70,
      height: 70,
      borderRadius: 50
  }
})
