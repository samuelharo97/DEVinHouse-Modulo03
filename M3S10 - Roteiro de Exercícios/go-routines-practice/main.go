package main

import (
	"fmt"
	"sync"
)

func main() {

	var waitGroup sync.WaitGroup

	waitGroup.Add(1)

	go func() {
		for i := 1; i < 11; i++ {
			fmt.Println(i)
		}
		waitGroup.Done()
	}()

	waitGroup.Wait()
	fmt.Println("All done")
}
