package main

import "fmt"

// Exercício 01 - Escreva um programa em Go que receba dois inteiros como entrada e mostra no console sua soma e sua diferença.
func sumAndDiff(num1 int, num2 int) {

	sum := num1 + num2

	diff := (num1 - num2) * -1

	fmt.Printf("Sum is %d and difference is %d", sum, diff)
}

func main() {
}
