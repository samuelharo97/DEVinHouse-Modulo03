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

// Ex 2 - Encontre o maior valor em um array de inteiros

func highestNum(arr []int) int {

	highest := 0

	for _, v := range arr {

		if highest < v {
			highest = v
		}

	}

	fmt.Println(highest)

	return highest

}

func main() {

	arr := []int{10, 5, 20, 15, 30}

	highestNum(arr)

}
