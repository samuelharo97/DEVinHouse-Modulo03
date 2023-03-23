package main

import (
	"fmt"
	"strings"
)

// Exercício 01 - Escreva um programa em Go que receba dois inteiros como entrada e mostra no console sua soma e sua diferença.
func sumAndDiff(num1 int, num2 int) {

	sum := num1 + num2
	diff := (num1 - num2)

	if diff < 0 {
		diff = diff * -1
	}

	fmt.Printf("Sum is %d and difference is %d", sum, diff)
}

// Exercício 02 - Escreva um programa em Go que recebe uma string como input e mostra no console o tamanho da string.

func stringLen(str string) {

	fmt.Println(len(str))

}

// Exercício 03 - Escreva um programa em Go que recebe um integer como input e mostra no console todos os números primos até chegar integer do input.

func isPrime(num int) bool {
	if num <= 1 {
		return false
	}
	if num == 2 {
		return true
	}
	if num%2 == 0 {
		return false
	}
	for i := 3; i*i <= num; i++ {
		if num%i == 0 {
			return false
		}
	}
	return true
}

func printPrimeNum(num int) {

	for i := 0; i < num; i++ {

		res := isPrime(i)

		if res {
			fmt.Println(i, "é um número primo")
		}

	}

}

// Exercício 04 - Escreva um programa em Go que recebe uma frase/sentença como input e mostra no console a quantidade de palavras que tem naquela sentença.

func wordCounter(input string) {
	fmt.Println(len(strings.Split(input, " ")))

}

// Exercício 05 - Escreva um programa em Go que recebe uma frase/sentença como input e mostra no console a sentença com todas as palavras capitalizadas.

func toUppercase(input string) {

	fmt.Println(strings.ToUpper(input))

}

func main() {

	toUppercase("this should work")

}
