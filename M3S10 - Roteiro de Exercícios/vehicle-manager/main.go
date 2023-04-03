package main

import "fmt"

// Ex 3 - Pseudo-herança
type Veiculo struct {
	marca  string
	modelo string
}

type Carro struct {
	Veiculo
	numeroDePortas int
}

type Moto struct {
	Veiculo
	cilindradas int
}

func (c Carro) fazerRevisao() {
	fmt.Println("Revisão de carro realizada!")
}

func (m Moto) fazerRevisao() {
	fmt.Println("Revisão de moto realizada!")
}

type Revisao interface {
	fazerRevisao()
}

func agendarRevisao(r Revisao) {
	r.fazerRevisao()
}

func main() {
	carroExemplo := Carro{
		Veiculo: Veiculo{
			marca:  "Fiat",
			modelo: "Palio",
		},
		numeroDePortas: 4,
	}

	motoExemplo := Moto{
		Veiculo: Veiculo{
			marca:  "Honda",
			modelo: "CG Titan",
		},
		cilindradas: 160,
	}

	agendarRevisao(carroExemplo)
	agendarRevisao(motoExemplo)
}
