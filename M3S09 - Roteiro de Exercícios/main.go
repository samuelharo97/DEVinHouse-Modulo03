package main

import "fmt"

// Ex 1 - Soma dos elementos de um array

func arraySum(arr []int) int {

	result := 0

	for _, v := range arr {

		result += v

	}

	fmt.Println(result)

	return result

}

func main() {

	arr := []int{3, 5, 2}

	arraySum(arr)

}
