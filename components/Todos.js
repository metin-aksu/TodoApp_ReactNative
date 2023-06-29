import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Todo from './Todo';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todoss = await AsyncStorage.getItem('todos');
        if (todoss !== null) {
          setTodos(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();

    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem(todos, JSON.stringify(todos));
      } catch (error) {
        console.log(error);
      }
    };

    return () => saveTodos;
  }, [todos]);

  const addTodo = () => {
    if (newTodo !== '') {
      let newId;
      let lenTodo = todos.length;

      if (lenTodo !== 0) {
        let lastTodo = todos[lenTodo - 1];
        let lastId = lastTodo.id;
        newId = Number(lastId) + 1;
      } else {
        newId = 1;
      }
      const newTodoItem = {id: newId, todo: newTodo, is_completed: false};
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const renderTodos = item => (
    <Todo todo={item} onComplete={handleComplete} onDelete={handleDelete} />
  );

  const onChange = text => setNewTodo(text);

  const handleComplete = (todo, isCompleted) => {
    const updatedTodos = todos.map(item => {
      if (item.id === todo.id) {
        return {...item, is_completed: isCompleted};
      }
      return item;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = todo => {
    const updatedTodos = todos.filter(item => item.id !== todo?.id);
    setTodos(updatedTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Things to do</Text>
      </View>
      <FlatList
        keyExtractor={item => item.id}
        data={todos}
        renderItem={renderTodos}
      />
      <View style={styles.newTodoContainer}>
        <TextInput
          onChangeText={onChange}
          value={newTodo}
          style={styles.newTodoInput}
          placeholder="Write todo"
        />
        <TouchableOpacity onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    backgroundColor: '#dedede',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  newTodoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  newTodoInput: {
    backgroundColor: '#EDEDED',
    padding: 10,
    height: 50,
    flex: 1,
    marginRight: 8,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#DEDEDE',
    height: 50,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
