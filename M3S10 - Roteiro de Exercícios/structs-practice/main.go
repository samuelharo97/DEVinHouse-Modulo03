package main

type Book struct {
	title         string
	author        string
	publishedYear int
	pages         int
}

type Address struct {
	street  string
	city    string
	state   string
	zipCode string
}

type Person struct {
	name    string
	age     int
	address Address
}

// Ex 01 - Book struct
/*  func main() {
 	livroExemplo := Book{
		title:         "O Senhor dos Anéis",
 		author:        "J.R.R. Tolkien",
 		publishedYear: 1954,
 		pages:         1178,
 	}

	fmt.Printf("Título: %s\n", livroExemplo.title)
 	fmt.Printf("Autor: %s\n", livroExemplo.author)
 	fmt.Printf("Ano de publicação: %d\n", livroExemplo.publishedYear)
 	fmt.Printf("Número de páginas: %d\n", livroExemplo.pages)
 } */

// Ex 02 - Composição de Structs
/* func main() {
	person := Person{"Samuel", 26, Address{
		"Rua 15", "Cidade 20", "SP", "18455-000",
	}}

	fmt.Printf("Nome: %s\n", person.name)
	fmt.Printf("Idade: %d\n", person.age)
	fmt.Printf("Cidade: %s\n", person.address.city)
	fmt.Printf("Rua: %s\n", person.address.street)
	fmt.Printf("Estado: %s\n", person.address.state)
	fmt.Printf("CEP: %s\n", person.address.zipCode)
} */

// Ex 03 - 
