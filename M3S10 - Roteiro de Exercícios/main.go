package main

import "fmt"

type Book struct {
	title         string
	author        string
	publishedYear int
	pages         int
}

func main() {
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
}
