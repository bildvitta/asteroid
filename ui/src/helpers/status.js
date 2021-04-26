const setStatusLabel = (status, value) => {
  const statusList = {
    active: { label: 'Ativo', color: 'primary' },
    inactive: { label: 'Inativo', color: 'negative' },
    in_queue: { label: 'Em aprovação', color: 'warning' },
    reproved: { label: 'Reprovado', color: 'negative' },
    blocked: { label: 'Bloqueado', color: 'primary' },
    sold: { label: 'Vendido', color: 'positive' },
    in_analysis: { label: 'Em análise', color: 'warning' },
    available_for_sale: { label: 'Disponível para venda', color: 'positive' },
    passed_on: { label: 'Repassado', color: 'primary-color' },
    unavailable: { label: 'Indisponível', color: 'negative' },
    in_commercialization: { label: 'Em comercialização', color: 'positive' },
    ready_to_commercializate: { label: 'Pronto para comercialização', color: 'primary' },
    in_transfer: { label: 'Em repasse', color: 'positive' },
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
