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

func strConcat() {

	var str1 string
	var str2 string

	fmt.Println("Digite a primeira palavra: ")
	fmt.Scan(&str1)

	fmt.Println("Digite a segunda palavra: ")
	fmt.Scan(&str2)

	concat := str1 + str2

	fmt.Println(concat)

}

func main() {

	strConcat()
}
