export const consoleError = (error) => {
	console.log(`Возникла ошибка.\nНазвание ошибки: ${error.name}\nТекст ошибки: ${error.message}\n${error}`)
}