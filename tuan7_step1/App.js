import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Button,FlatList,ActivityIndicator } from 'react-native';
import {useState} from 'react'
export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Khởi tạo loading là false
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    try{
      const response = await fetch('https://66fc9835c3a184a84d176ec7.mockapi.io/data');
      const json = await response.json();
      setData(json);
    }
    catch(err){
      setError(err.message);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style = {styles.button}>
        <Text style = {{color: "white"}}>Thêm</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.button}>
        <Text style = {{color: "white"}}>Sửa</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.button}>
        <Text style = {{color: "white"}}>Xóa</Text>
      </TouchableOpacity>

      <View style={styles.container}>
      <Button title="Tải Dữ Liệu" onPress={fetchData} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },
});
