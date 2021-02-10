const moment = require('moment');

const getChave = (unidade, subtrair) => {
  switch (unidade) {
    case 'month':
      return !subtrair
        ? moment().month()
        : moment().subtract(subtrair, unidade).month();
    default:
      return null;
  }
};

const getInicioFimMes = subtrair =>
  !subtrair
    ? {
        mes: getChave('month'),
        dataInicial: moment().startOf('month'),
        dataFinal: moment().endOf('month'),
      }
    : {
        mes: getChave('month', subtrair),
        dataInicial: moment().subtract(subtrair, 'month').startOf('month'),
        dataFinal: moment().subtract(subtrair, 'month').endOf('month'),
      };

const geUltimosDias = (subtrair, tipo) => {
  const diaInicio = moment().subtract(subtrair, tipo);
  const arr = [];
  while (diaInicio.format('DD/MM/YYYY') !== moment().format('DD/MM/YYYY')) {
    arr.push({
      dia: diaInicio.date(),
      mes: diaInicio.month(),
      dataInicial: diaInicio,
      dataFinal: diaInicio,
    });
    diaInicio.add(1, 'day');
    if (diaInicio.day() === 6) {
      diaInicio.add(2, 'day');
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
      return [getInicioFimMes(), getInicioFimMes(1), getInicioFimMes(2)];
    case 'Semestral':
      return [
        ...getPeriodo('Trimestral'),
        getInicioFimMes(3),
        getInicioFimMes(4),
        getInicioFimMes(5),
      ];
    case 'Anual':
      return [
        ...getPeriodo('Semestral'),
        getInicioFimMes(6),
        getInicioFimMes(7),
        getInicioFimMes(8),
        getInicioFimMes(9),
        getInicioFimMes(10),
        getInicioFimMes(11),
        getInicioFimMes(12),
      ];
    default:
      return null;
  }
};

module.exports = {
  getPeriodo,
};
