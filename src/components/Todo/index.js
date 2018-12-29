import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import ToDoItem from '../TodoItem';
import AddItem from '../AddItem';
import '../../css/ToDo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  // handles the completed checkbox
  handleChange(id) {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        let updates = {};
        let uId = this.state.todos[id].id;
        let uText = this.state.todos[id].text;
        let uCompleted = !this.state.todos[id].completed;
        updates['/todosData/' + user.uid + '/' + id] = {
          id: uId,
          text: uText,
          completed: uCompleted,
        };
        this.props.firebase.db.ref().update(updates);
      }
    });
  }

  deleteItem(id) {
    this.props.firebase.auth.onAuthStateChanged(user => {
      this.props.firebase.db
        .ref('/todosData/' + user.uid + '/' + id)
        .remove();

      // decrement all by 1
      this.state.userDbRef.once('value').then(snap => {
        let updates = {};
        // iterate through the children of the snapshot
        snap.forEach(itemSnap => {
          if (itemSnap.child('id').val() > id) {
            let newId = itemSnap.child('id').val() - 1;
            // update the id
            updates[newId + '/id'] = newId;
            // write the new entry
            this.props.firebase.db
              .ref('/todosData/' + user.uid)
              .child(newId)
              .set(itemSnap.val());
            // del the old entry
            this.props.firebase.db
              .ref('/todosData/' + user.uid)
              .child(itemSnap.key)
              .remove();
          }
        });
        this.props.firebase.db
          .ref('/todosData/' + user.uid)
          .update(updates);
      });
    });
  }

  handleNewItem(value) {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user logged in ' + value);
        // query for last inserted id
        this.props.firebase.db
          .ref('todosData/' + user.uid)
          .orderByChild('id')
          .limitToLast(1)
          .once('value')
          .then(snap => {
            let newId = 0;
            if (snap.val() !== null) {
              // get the id for the next to be added item
              newId = parseInt(Object.keys(snap.val())[0]) + 1;
            }

            // add the new item
            this.props.firebase.db
              .ref('todosData/' + user.uid + '/' + newId)
              .set({
                id: newId,
                text: value,
                completed: false,
              });
          });
      }
    });
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        const dbRefObject = this.props.firebase.db.ref(
          '/todosData/' + user.uid,
        );

        dbRefObject.on('value', snap => {
          this.setState(() => {
            return { todos: snap.val(), userDbRef: dbRefObject };
          });
        });
      }
    });
  }

  componentWillUnmount() {
    this.state.userDbRef.off();
    this.setState(() => null);
  }

  render() {
    let todoItems = null;
    if (this.state.todos) {
      todoItems = this.state.todos
        .filter(item => !item.completed)
        .concat(this.state.todos.filter(item => item.completed))
        .map(item => (
          <ToDoItem
            key={item.id}
            item={item}
            handleChange={this.handleChange}
            deleteItem={this.deleteItem}
          />
        ));
    }

    return (
      <div className="todo-list">
        <AddItem handleNewItem={this.handleNewItem} />
        {todoItems}
      </div>
    );
  }
}

export default withFirebase(Todo);
