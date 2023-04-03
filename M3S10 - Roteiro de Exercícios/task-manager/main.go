package main

import (
	"fmt"
)

// Ex 9 - Task Manager pt1

type Task struct {
	name string // Tasks can only have 1 word. Use apostrophe for more than 1 word - ex: "This-task-is-5-words"
}

type TaskList interface {
	addTask(task Task)
	removeTask(index int)
	listTasks()
}

type TaskSlice struct {
	tasks []Task
}

func (t *TaskSlice) addTask(task Task) {
	t.tasks = append(t.tasks, task)
	t.listTasks()
}

func (t *TaskSlice) removeTask(index int) {
	t.tasks = append(t.tasks[:index], t.tasks[index+1:]...)
	t.listTasks()
}

func (t *TaskSlice) listTasks() {
	fmt.Println("Current tasks:")
	for i, task := range t.tasks {
		fmt.Printf("%d. %s\n", i+1, task.name)
	}
	fmt.Println()
}

func main() {
	tasks := TaskSlice{}
	var input string
	var index int
	for {
		fmt.Print("Enter command (add, remove, list, or quit): ")
		fmt.Scanln(&input)
		switch input {
		case "add":
			fmt.Print("Enter task name: ")
			fmt.Scanln(&input)
			task := Task{name: input}
			tasks.addTask(task)
		case "remove":
			tasks.listTasks()
			fmt.Print("Enter task number to remove: ")
			fmt.Scanln(&index)
			index--
			if index >= 0 && index < len(tasks.tasks) {
				tasks.removeTask(index)
			} else {
				fmt.Println("Invalid task number")
			}
		case "list":
			tasks.listTasks()
		case "quit":
			fmt.Println("Quitting...")
			return
		default:
			fmt.Println("Invalid command")
		}
	}
}
