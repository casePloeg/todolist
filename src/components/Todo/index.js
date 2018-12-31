import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import ToDoItem from '../TodoItem';
import AddItem from '../AddItem';
import Footer from '../Footer';
import Header from '../Header';
import '../../css/ToDo.css';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleFiter = this.handleFilter.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleFilter() {}

  handleSort() {}

  getNumToday(key) {
    let numToday = 0;
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.props.firebase.db
          .ref('/todosData/' + user.uid)
          .once('value')
          .then(snap => {
            snap.forEach(itemSnap => {
              let d = new Date();
              let today =
                d.getFullYear() +
                '-' +
                (d.getMonth() + 1) +
                '-' +
                d.getDate();
              if (itemSnap.val()[key] === today) {
                numToday++;
              }
            });
            // set state needs to be placed in the callback function because otherwise set state will be execute before promise is realized
            this.setState(
              prevState => (prevState[key + 'Today'] = numToday),
            );
          });
      }
    });
  }

  getCreatedToday() {
    this.getNumToday('created');
  }

  getCompletedToday() {
    this.getNumToday('completed');
  }

  getDueToday() {
    this.getNumToday('due');
  }

  // determines how many items on the list are overdue.
  // overdue means that the item is not completed and the due date was before the current date
  getOverdue() {
    let numOverdue = 0;
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.props.firebase.db
          .ref('/todosData/' + user.uid)
          .once('value')
          .then(snap => {
            snap.forEach(itemSnap => {
              let d = new Date(this.state.today);
              let dueD = null;
              if (itemSnap.val()['due']) {
                dueD = new Date(itemSnap.val()['due']);
              }
              let compD = null;
              if (itemSnap.val()['completed']) {
                compD = new Date(itemSnap.val()['completed']);
              }

              if (dueD && dueD < d && !compD) {
                numOverdue++;
              }
            });
            // set state needs to be placed in the callback function because otherwise set state will be execute before promise is realized
            this.setState(
              prevState => (prevState['overdue'] = numOverdue),
            );
          });
      }
    });
  }

  runAllGetTodays() {
    this.getDueToday();
    this.getCompletedToday();
    this.getCreatedToday();
    this.getOverdue();
  }

  // handles the completed checkbox
  handleChange(id, itemClass) {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        let uCompleted = '';
        let uText = '';
        if (itemClass === 'show') {
          uText = this.state.todos[id].text.replace(
            'x: ' + this.state.todos[id].completed,
            '',
          );
          uCompleted = '';
        } else {
          const todayObj = new Date();
          const todayStr =
            todayObj.getFullYear() +
            '-' +
            (todayObj.getMonth() + 1) +
            '-' +
            todayObj.getDate();

          uCompleted = todayStr;
          uText =
            'x: ' + uCompleted + ' ' + this.state.todos[id].text;
        }
        let updates = {};

        updates[
          '/todosData/' + user.uid + '/' + id + '/text'
        ] = uText;
        updates[
          '/todosData/' + user.uid + '/' + id + '/completed'
        ] = uCompleted;

        this.props.firebase.db.ref().update(updates);
      }
      // update the totals
      this.runAllGetTodays();
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

        // update the totals
        this.runAllGetTodays();
        console.log('delete finshed');
      });
    });
  }

  // today - today's date in yyyy-mm-dd format
  // value - the text entered by the user
  handleNewItem(today, value) {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
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

            // check for priority
            const priRegex = /^\(([A-Z])\)\s/;
            const priMatches = value.match(priRegex);
            let pri = '';

            if (priMatches) {
              pri = priMatches[1];
            }

            // check for context
            const contextRegex = /(\s@)(.*?)((?=\s@)|$|\s)/g;
            let context = [];
            let contextMatches;
            // iterate through matches, use exec instead of //value.match(contextRegex);
            while ((contextMatches = contextRegex.exec(value))) {
              if (contextMatches) {
                context.push(contextMatches[2]);
              }
            }

            // check for project -> same as context
            const projectRegex = /(\s\+)(.*?)((?=\s\+)|$|\s)/g;
            let project = [];
            let projectMatches;
            // iterate through matches, use exec instead of //value.match(contextRegex);
            while ((projectMatches = projectRegex.exec(value))) {
              if (projectMatches) {
                project.push(projectMatches[2]);
              }
            }
            console.log(project);

            // could rewrite this to allow for any custom metadata to be input as long as it follows the : format

            // check for a due date
            // required to be in yyyy-mm-dd or a keyword day
            const dateRegex = /(due:)((\d){4}-(\d){2}-(\d){2}|friday|monday|tuesday|thursday|wednesday|saturday|sunday|today|tomorrow)(\s)*/;
            const dueMatches = value.match(dateRegex);
            let due = '';
            let conv_due = '';
            // if there is a due date specified
            if (dueMatches) {
              // init array that converts day to number
              const days = [
                'sunday',
                'monday',
                'tuesday',
                'wednesday',
                'thursday',
                'friday',
                'saturday',
              ];
              // convert keywords to yyyy-mm-dd format
              const todayDate = new Date();
              due = dueMatches[2];
              conv_due = due;
              const dayOfWeek = todayDate.getDay();
              const dueDayofWeek = days.indexOf(due);

              if (due === 'today') {
                conv_due = today;
              } else if (due === 'tomorrow') {
                conv_due = new Date(
                  todayDate.getFullYear(),
                  todayDate.getMonth(),
                  todayDate.getDate() + 1,
                );
                conv_due =
                  conv_due.getFullYear() +
                  '-' +
                  (conv_due.getMonth() + 1) +
                  '-' +
                  conv_due.getDate();
              } else if (days.includes(due)) {
                let deltaDays = (7 + (dueDayofWeek - dayOfWeek)) % 7;
                // assume that the user means the next occurence of the day that isn't today
                deltaDays = deltaDays === 0 ? 7 : deltaDays;
                conv_due = new Date(
                  todayDate.getFullYear(),
                  todayDate.getMonth(),
                  todayDate.getDate() + deltaDays,
                );
                conv_due =
                  conv_due.getFullYear() +
                  '-' +
                  (conv_due.getMonth() + 1) +
                  '-' +
                  conv_due.getDate();
              }
              // end of conversion to yyyy-mm-dd

              // convert the text to yyyy-mm-dd as well
              value = value.replace(due, conv_due);
            }
            // add the new item
            this.props.firebase.db
              .ref('todosData/' + user.uid + '/' + newId)
              .set({
                id: newId,
                text: value + ' ' + today,
                completed: '',
                created: today,
                due: conv_due,
                pri: pri,
                context: context,
                project: project,
              });

            // update the totals
            this.runAllGetTodays();
          });
      }
    });
  }

  componentWillMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        const dbRefObject = this.props.firebase.db.ref(
          '/todosData/' + user.uid,
        );
        const todayDate = new Date();
        const today =
          todayDate.getFullYear() +
          '-' +
          (todayDate.getMonth() + 1) +
          '-' +
          todayDate.getDate();

        dbRefObject.on('value', snap => {
          this.setState(() => {
            return {
              todos: snap.val(),
              userDbRef: dbRefObject,
              uid: user.id,
              today: today,
            };
          });
        });
      }
    });

    // update the totals
    this.runAllGetTodays();
  }

  sortByPriority(item1, item2) {
    let res = 0;
    if (!item2.pri && item1.pri) {
      res = -1;
    } else if (!item1.pri && item2.pri) {
      res = 1;
    } else if (item1.pri < item2.pri) {
      res = -1;
    } else if (item2.pri < item1.pri) {
      res = 1;
    } else {
      res = 0;
    }
    return res;
  }

  sortByContext(item1, item2) {}

  /*
  filterBy(tag, items) {
    //context
    if (tag.startsWith('@')) {
    }
    //project
    else if (tag.startsWith('+')) {
    }
    return items.filter(item => item.text.includes(tag));
  }
  */
  filterBy(item, tag) {
    return item.text.includes(tag);
  }

  componentWillUnmount() {
    this.state.userDbRef.off();
    this.setState(() => null);
  }

  render() {
    // currently set to also sort by priortiy, next step is to setup sort options / add more stuff
    let todoItems = null;
    if (this.state.todos) {
      todoItems = this.state.todos
        .filter(item => !item.completed)
        .sort((a, b) => this.sortByPriority(a, b))
        .concat(this.state.todos.filter(item => item.completed))
        //.filter(item => this.filterBy(item, '@small'))
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
        <Header
          handleFilter={this.handleFilter}
          handleChange={this.handleChange}
        />
        <AddItem handleNewItem={this.handleNewItem} />
        {todoItems}

        <Footer
          uid={this.state.uid}
          createdToday={this.state.createdToday}
          completedToday={this.state.completedToday}
          dueToday={this.state.dueToday}
          overdue={this.state.overdue}
        />
      </div>
    );
  }
}

export default withFirebase(Todo);
