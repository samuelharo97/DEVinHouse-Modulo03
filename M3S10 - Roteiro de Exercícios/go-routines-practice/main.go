package main

import (
	"fmt"
)

// Ex 06 - Go Routines!
// Ex 07 - Channels

func main() {

	c := make(chan int, 10)

	go func() {
		for i := 1; i <= 10; i++ {
			c <- i
		}
		close(c)
	}()

	for {
		nums, isOpen := <-c
		if !isOpen {
			break
		}
		fmt.Println(nums)

	}

	fmt.Println("All done")
}
