// cotação de moedas do dia
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g

  amount.value = amount.value.replace(hasCharactersRegex, "")
})

// capturando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
  event.preventDefault()

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$")
      break

    case "EUR":
      convertCurrency(amount.value, EUR, "€")
      break

    case "GBP":
      convertCurrency(amount.value, GBP, "£")
      break
  }
}

//função para converter a moeda
function convertCurrency(amount, price, symbol) {
  try {
    //exibindo a cotação da moeda
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    //calcula o total
    let total = amount * price
    //formata o valor total
    total = formatCurrencyBRL(total).replace("R$", "")

    //exibe o resultado total
    result.textContent = `${total} Reais`

    //aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result")

  } catch (error) {
    console.log(error)

    //remove a classe do footer ocultando ele
    footer.classList.remove("show-result")
    alert("Não foi possível converter. Tente novamente mais tarde")
  }
}

//formata a moeda em real brasileiro
function formatCurrencyBRL(value) {

  //converte para número para utilizar o toLocaleString para formatar no padrão BRL
  return Number(value).toLocaleString("pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  )
}