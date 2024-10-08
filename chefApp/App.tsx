import { SetStateAction, useState } from 'react';
import { Text, View, Button, StyleSheet, FlatList, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScreenProps } from 'react-native-screens';

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Menu: undefined;
  AddDish: undefined;
};
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;


const MENU = [
  {
    id: '1',
    name: '3 Course Meal',
    price: 'R420',
    meals: ['Appetizer', 'Main Course', 'Dessert'],
  },
  {
    id: '2',
    name: '4 Course Meal',
    price: 'R1050',
    meals: ['hors d oeuvre', 'Appetizer', 'Main Course', 'Dessert'],
  },
  {
    id: '3',
    name: '5 Course Meal',
    price: 'R2350',
    meals: ['hors d oeuvre', 'Appetizer', 'Salad',  'Main Course', 'Dessert'],
  },
];

// Login Screen
function LoginScreen({ navigation }: { navigation: LoginScreenNavigationProp }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef App Login</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Menu')}
      />
    </View>
  );
}

type MenuScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Menu'
>;

// Menu Screen with 
function MenuScreen({ navigation }: { navigation: MenuScreenNavigationProp}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Chef App</Text>
      </View>
      <Text style={styles.subheader}>Menu</Text>
      <FlatList
        data={MENU}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItemContainer}>
            <Text style={styles.menuItem}>{item.name} - {item.price}</Text>
            <View style={styles.mealsContainer}>
              <Text style={styles.mealsHeader}>Meals:</Text>
              {item.meals.map((meal, index) => (
                <Text key={index} style={styles.mealItem}>{meal}</Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

type AddDishScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddDish'
>;

// Prepared Menu Screen
function AddDishScreen({ navigation }: { navigation: AddDishScreenNavigationProp}) {
  const [dishName, setDishName] = useState('');
  const [dishDescription, setDishDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [price, setPrice] = useState('');

  const saveDish = () => {
    // Here you could handle saving the dish,
    console.log({
      dishName,
      dishDescription,
      selectedCourse,
      price
    });
    // After saving, navigate back to the menu 
    navigation.navigate('Menu');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Dish</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Dish Description"
        value={dishDescription}
        onChangeText={setDishDescription}
        multiline
      />
      
      <Text style={styles.label}>Select Course:</Text>
      <Picker
        selectedValue={selectedCourse}
        style={styles.picker}
        onValueChange={(itemValue: SetStateAction<string>) => setSelectedCourse(itemValue)}
      >
        <Picker.Item label="Select a Course" value="" />
        <Picker.Item label="3 Course Meal" value="3 Course Meal" />
        <Picker.Item label="4 Course Meal" value="4 Course Meal" />
        <Picker.Item label="5 Course Meal" value="5 Course Meal" />
      </Picker>
      
      <TextInput
        style={styles.input}
        placeholder="Price (e.g., R200)"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      
      <Button title="Save Dish" onPress={saveDish} />
    </ScrollView>
  );
}

// Stack Navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MenuStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="AddDish" component={AddDishScreen} />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="  " component={MenuStack} />
        <Tab.Screen name="Add Dish" component={AddDishScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'grey',
  },
  headerContainer: {
    borderWidth: 2,  
    borderColor: '#000',  
    padding: 10,
    borderRadius: 8,  
    marginBottom: 20,  
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    marginVertical: 16,
  },
  menuItemContainer: {
    marginBottom: 20,
  },
  menuItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealsContainer: {
    marginTop: 8,
    paddingLeft: 16,
  },
  mealsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealItem: {
    fontSize: 14,
    marginVertical: 2,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: '100%',
  },
  descriptionInput: {
    height: 80,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
});
