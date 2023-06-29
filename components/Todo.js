import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Todo({todo, onComplete, onDelete}) {
  const [isCompleted, setIsCompleted] = useState(todo?.item?.is_completed);

  const toggleCompleted = () => {
    onComplete(todo?.item, !isCompleted);
    setIsCompleted(!isCompleted);
  };

  const handleDelete = () => {
    onDelete(todo?.item);
  };

  return (
    <View style={[styles.todoContainer, isCompleted && styles.completedTodo]}>
      <TouchableOpacity onPress={toggleCompleted} style={styles.todoView}>
        <Text style={[styles.todoText, isCompleted && styles.completedText]}>
          {todo?.item?.todo}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDelete} style={styles.todoDeleteView}>
        <Text style={styles.todoDelete}>x</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoContainer: {
    backgroundColor: '#7da552',
    marginTop: 3,
    marginLeft: 3,
    marginRight: 3,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 5,
  },
  completedTodo: {
    backgroundColor: '#C0C0C0',
  },
  todoView: {flex: 1, paddingRight: 5},
  todoText: {
    color: 'white',
    fontSize: 20,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  todoDeleteView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  todoDelete: {
    color: '#648c4c',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
