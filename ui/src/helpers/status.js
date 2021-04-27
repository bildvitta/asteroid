const setStatusLabel = (status, value) => {
  const statusList = {
    active: { label: 'Ativo', color: 'primary' },
    inactive: { label: 'Inativo', color: 'negative' },
    inQueue: { label: 'Em aprovação', color: 'warning' },
    reproved: { label: 'Reprovado', color: 'negative' },
    blocked: { label: 'Bloqueado', color: 'primary' },
    sold: { label: 'Vendido', color: 'positive' },
    inAnalysis: { label: 'Em análise', color: 'warning' },
    availableForSale: { label: 'Disponível para venda', color: 'positive' },
    passedOn: { label: 'Repassado', color: 'primary-color' },
    unavailable: { label: 'Indisponível', color: 'negative' },
    inCommercialization: { label: 'Em comercialização', color: 'positive' },
    readyToCommercializate: { label: 'Pronto para comercialização', color: 'primary' },
    inTransfer: { label: 'Em repasse', color: 'positive' },
    holding: { label: 'Aguardando', color: 'warning' }
  }

  return statusList[status]?.[value]
}

const showStatus = (status, hideStatus) => {
  return status && !isActive(status) && !hideStatus
}

const isActive = status => {
  return status === 'active'
}

export {
  setStatusLabel,
  showStatus
}
