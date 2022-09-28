export const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$");
export const validCnpj = new RegExp("/^(\d{2})(\d{3}(\d{3})(\d{4})(\d{2}))/, '$1.$2.$3/$4-$5'");