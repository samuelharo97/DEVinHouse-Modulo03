package main

import (
	"fmt"
	"lab/labmath"
)

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

// Ex 3 - Crie um dicionário de frutas

// func main() {

// 	frutas := map[string]string{
// 		"maca":     "é uma fruta que cresce em arvore",
// 		"banana":   "é uma fruta amarela",
// 		"morango":  "O morango é uma fruta vermelha, cuja origem é a Europa",
// 		"melancia": "A melancia é uma fruta rasteira, originária da África",
// 	}

// 	fmt.Println(frutas)
// }

// Ex 4 - Procurando no dicionário de frutas

// func main() {

// 	frutas := map[string]string{
// 		"maca":     "é uma fruta que cresce em arvore",
// 		"banana":   "é uma fruta amarela",
// 		"morango":  "O morango é uma fruta vermelha, cuja origem é a Europa",
// 		"melancia": "A melancia é uma fruta rasteira, originária da África",
// 	}

// 	for i, v := range frutas {

// 		if i == "morango" {
// 			fmt.Println(v)
// 		}
// 	}

// }

// Ex 5 - Concatenando Strings

func strConcat() string {

	var str1 string
	var str2 string

	fmt.Println("Digite a primeira palavra: ")
	fmt.Scan(&str1)

	fmt.Println("Digite a segunda palavra: ")
	fmt.Scan(&str2)

	concat := str1 + str2

	fmt.Println(concat)

	return concat

}

// Ex 6 - Imprimindo os dias da semana

func weekDay(num int) {
	switch num {
	case 1:
		fmt.Println("Domingo")
	case 2:
		fmt.Println("Segunda-Feira")
	case 3:
		fmt.Println("Terça-Feira")
	case 4:
		fmt.Println("Quarta-Feira")
	case 5:
		fmt.Println("Quinta-Feira")
	case 6:
		fmt.Println("Sexta-Feira")
	case 7:
		fmt.Println("Domingo")
	default:
		fmt.Println("Número Inválido")
	}
}

// Ex 7 - Encontre todos os números primos no array

func returnPrimeNums() []int {

	arr := [100]int{}

	for i := 0; i < 100; i++ {
		arr[i] = i
	}

	primes := []int{}

	for _, num := range arr {

		if labmath.IsPrime(num) {
			primes = append(primes, num)
		}

	}

	fmt.Println(primes)
	return primes
}

func main() {

	returnPrimeNums()

}
