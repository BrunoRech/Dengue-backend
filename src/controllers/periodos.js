const moment = require('moment');

const getChave = (unidade, subtrair) => {
  switch (unidade) {
    case 'month':
      return !subtrair
        ? moment().month()
        : moment().subtract(subtrair, 'month').month();
    case 'year':
      return !subtrair
        ? moment().year()
        : moment().subtract(subtrair, 'month').year();
    default:
      return null;
  }
};

const getInicioFimMes = subtrair =>
  !subtrair
    ? {
        mes: getChave('month') + 1,
        ano: getChave('year'),
        dataInicial: moment().startOf('month'),
        dataFinal: moment().endOf('month'),
      }
    : {
        mes: getChave('month', subtrair) + 1,
        ano: getChave('year', subtrair),
        dataInicial: moment().subtract(subtrair, 'month').startOf('month'),
        dataFinal: moment().subtract(subtrair, 'month').endOf('month'),
      };

const geUltimosDias = (subtrair, tipo) => {
  const diaInicio = moment().subtract(subtrair, tipo).format('MM/DD/YYYY');
  const arr = [];
  let soma = 0;
  while (
    !moment(diaInicio).add(soma, 'day').isAfter(moment().format('MM/DD/YYYY'))
  ) {
    const data = moment(diaInicio, 'MM/DD/YYYY').add(soma, 'day');
    arr.push({
      dia: data.date(),
      mes: data.month() + 1,
      ano: data.year(),
      dataInicial: data.startOf('day').toString(),
      dataFinal: data.endOf('day').toString(),
    });
    soma += 1;
    if (moment(data).add(1, 'day').day() === 6) {
      soma += 2;
    }
  }
  return arr;
};

const getPeriodo = periodo => {
  switch (periodo) {
    case 'Semanal':
      return geUltimosDias(7, 'days');
    case 'Mensal':
      return geUltimosDias(1, 'month');
    case 'Trimestral':
      return [getInicioFimMes(2), getInicioFimMes(1), getInicioFimMes()];
    case 'Semestral':
      return [
        getInicioFimMes(5),
        getInicioFimMes(4),
        getInicioFimMes(3),
        ...getPeriodo('Trimestral'),
      ];
    case 'Anual':
      return [
        getInicioFimMes(12),
        getInicioFimMes(11),
        getInicioFimMes(10),
        getInicioFimMes(9),
        getInicioFimMes(8),
        getInicioFimMes(7),
        getInicioFimMes(6),
        ...getPeriodo('Semestral'),
      ];
    default:
      return null;
  }
};

module.exports = {
  getPeriodo,
};
