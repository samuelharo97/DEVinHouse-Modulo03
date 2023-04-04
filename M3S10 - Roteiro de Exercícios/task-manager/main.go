package main

import (
	"fmt"
	"time"
)
// Ex 09 - Task Manager pt1
// Ex 10 - Task Manager pt2

// Tasks can only have 1 word. Use apostrophe for more than 1 word - ex: "This-task-is-5-words"
type task struct {
	description string
}

type taskList struct {
	tasks []task
}

func (tl *taskList) addTask(t task) {
	tl.tasks = append(tl.tasks, t)
}

func (tl *taskList) removeTask(index int) {
	if index < 0 || index >= len(tl.tasks) {
		fmt.Println("Invalid task index")
		return
	}
	tl.tasks = append(tl.tasks[:index], tl.tasks[index+1:]...)
}

func (tl *taskList) listTasks() {
	if len(tl.tasks) == 0 {
		fmt.Println("No tasks")
		return
	}
	for i, t := range tl.tasks {
		fmt.Printf("%d. %s\n", i+1, t.description)
	}
}

func displayTaskCount(tl *taskList, quitChan chan bool) {
	for {
		select {
		case <-quitChan:
			fmt.Println("Stopping task count display...")
			return
		default:
			fmt.Printf("Current task count: %d\n", len(tl.tasks))
			time.Sleep(5 * time.Second)
		}
	}
}

func main() {
	tasks := taskList{}
	quitChan := make(chan bool)
	defer close(quitChan)
	go displayTaskCount(&tasks, quitChan)

	for {
		var command int
		fmt.Println("Enter command:")
		fmt.Println("1. Add task")
		fmt.Println("2. Remove task")
		fmt.Println("3. List tasks")
		fmt.Println("4. Quit")
		fmt.Scanln(&command)

		switch command {
		case 1:
			var description string
			fmt.Println("Enter task description:")
			fmt.Scanln(&description)
			task := task{description}
			tasks.addTask(task)
			tasks.listTasks()
		case 2:
			var index int
			fmt.Println("Enter task index:")
			fmt.Scanln(&index)
			tasks.removeTask(index - 1)
			tasks.listTasks()
		case 3:
			tasks.listTasks()
		case 4:
			fmt.Println("Exiting application...")
			quitChan <- true
			time.Sleep(1 * time.Second)
			return
		default:
			fmt.Println("Invalid command")
		}
	}
}
