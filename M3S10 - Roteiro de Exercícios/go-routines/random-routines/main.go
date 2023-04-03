package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// Ex 8 - Go Routines "Aleatórias"

func main() {
	rand.Seed(time.Now().UnixNano())

	var wg sync.WaitGroup
	ch := make(chan int)

	for i := 1; i <= 10; i++ {
		wg.Add(1)
		go func(num int) {
			defer wg.Done()
			time.Sleep(time.Duration(rand.Intn(1000)) * time.Millisecond)
			ch <- num
		}(i)
	}

	go func() {
		wg.Wait()
		close(ch)
	}()

	for num := range ch {
		fmt.Println(num)
	}
}
