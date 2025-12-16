import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Dashboard({ navigation }) {

  function abrirAdmin(){
    navigation.navigate("Admin"); 
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}> </Text>
      </View>

      <View style={styles.contentBox}>

        <TouchableOpacity onPress={abrirAdmin} activeOpacity={0.6}>
          <Image source={require("../assets/anonymus.png")} style={styles.avatar}/>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Formulario")}>
          <Text style={styles.btnText}>DENÚNCIA</Text>
        </TouchableOpacity>

       

       

      </View>

      <View style={styles.bottomBar}>

        <TouchableOpacity onPress={() => navigation.navigate("Formulario")}>
  <Image
    source={require('../assets/iconss/loudspeaker.png')}
    style={styles.icons}
  />
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
  <Image
    source={require('../assets/iconss/home.png')}
    style={styles.icons}
  />
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate("LoginUser")}>
  <Image
    source={require('../assets/iconss/engrenagem.png')}
    style={styles.icons}
  />
</TouchableOpacity>


      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{ flex:1, backgroundColor:"#000" },

  header:{
    backgroundColor:"#000",
    paddingTop:60,
    paddingBottom:25,
    borderBottomLeftRadius:55,
    borderBottomRightRadius:55,
    alignItems:"center"
  },

  title:{ fontSize:30, fontWeight:"bold", color:"#fff" },

  contentBox:{
    flex:1,
    backgroundColor:"#fff",
    marginTop:-35,
    borderTopLeftRadius:85,
    borderTopRightRadius:85,
    alignItems:"center",
    paddingTop:65
  },

  avatar:{
    width:120,
    height:120,
    borderRadius:80,
    marginBottom:35,
    borderColor:"#000",
    borderWidth:3
  },

  btn:{
    width:"78%",
    backgroundColor:"#111",
    padding:17,
    borderRadius:10,
    marginBottom:22
  },

  btnText:{
    color:"#fff",
    textAlign:"center",
    fontSize:21,
    fontWeight:"bold"
  },

  bottomBar:{
    backgroundColor:"#4d4d4dff",
    flexDirection:"row",
    justifyContent:"space-around",
    paddingVertical:1,
    borderTopLeftRadius:0,
    borderTopRightRadius:0
  },

  icon:{
    fontSize:26,
    color:"#000"
  },
  icons: {
  width: 30,
  height: 30,
  resizeMode: 'contain',
}


});
