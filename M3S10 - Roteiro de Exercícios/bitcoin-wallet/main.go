package main

// Ex 4 - Carteira de Bitcoins
// Ex 5 - Minerador de bitcoins

import (
	"errors"
	"fmt"
	"math/rand"
)

type Wallet interface {
	Balance() float64
	SendBitcoin(value float64, destination string) error
	ReceiveBitcoin(value float64) error
}

type Miner interface {
	Mine() float64
}

type BitcoinMiner struct {
	rig string
}

func (m *BitcoinMiner) Mine() float64 {
	return rand.Float64() * 2
}

func mineBitcoin(m Miner) float64 {
	return m.Mine()
}

type Address struct {
	publicKey  string
	privateKey string
	balance    float64
}

func (e *Address) Balance() float64 {
	return e.balance
}

func (e *Address) SendBitcoin(value float64, destination string) error {
	if value > e.balance {
		return errors.New("saldo insuficiente")
	}
	fmt.Printf("Enviando %f bitcoins para o endereço %s\n", value, destination)
	e.balance -= value
	return nil
}

func (e *Address) ReceiveBitcoin(value float64) error {
	fmt.Printf("Recebendo %f bitcoins\n", value)
	e.balance += value
	return nil
}

func SendBitcoin(c Wallet, value float64, destination string) error {
	return c.SendBitcoin(value, destination)
}

func main() {
	endereco := &Address{
		publicKey:  "abc123",
		privateKey: "123456",
		balance:    10.0,
	}

	err := SendBitcoin(endereco, 2.0, "def456")
	if err != nil {
		fmt.Println(err)
	}

	fmt.Printf("Saldo atual: %f bitcoins\n", endereco.Balance())

	miner := &BitcoinMiner{rig: "X10-2023"}

	value := mineBitcoin(miner)

	fmt.Printf("O rig %s acaba de minerar BTC. Valor minerado: %f BTC\n", miner.rig, value)
}
